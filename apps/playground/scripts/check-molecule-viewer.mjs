import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PLAYWRIGHT_MODULE || '@playwright/test',
);
const output =
  process.env.MOLECULE_OUTPUT || '/tmp/matter-molecule-viewer-evidence';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--single-process',
    '--no-zygote',
    '--disable-dev-shm-usage',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
  ],
});
const records = [],
  errors = [];
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  page.on('pageerror', (error) => errors.push(error.message));
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(
      `${process.env.MOLECULE_URL || 'http://127.0.0.1:5174'}/molecule-viewer.html`,
    );
    await page.waitForFunction(
      () =>
        document.querySelectorAll('[data-testid="molecule-viewer"] canvas')
          .length === 2,
    );
    const card = page.locator('.molecule-figure-frame').first();
    const canvas = card.locator('canvas');
    const canvasHandle = await canvas.elementHandle();
    const before = await canvas.evaluate((canvas) =>
      canvas._3dmol_viewer.getView(),
    );
    assert.equal(
      await card
        .locator('[data-testid="molecule-viewer"]')
        .evaluate((node) => node.clientHeight),
      300,
    );
    await card
      .getByRole('button', { name: 'Open full view', exact: true })
      .click();
    await page.waitForFunction(() => document.querySelector('dialog').open);
    assert.equal(
      await canvas.evaluate(
        (canvas, original) => canvas === original,
        canvasHandle,
      ),
      true,
    );
    assert.deepEqual(
      await canvas.evaluate((canvas) => canvas._3dmol_viewer.getView()),
      before,
    );
    await page.keyboard.press('d');
    assert.equal(
      await card
        .getByRole('button', { name: 'Measure distance', exact: true })
        .getAttribute('aria-pressed'),
      'true',
    );
    // Real model picks exercise 3Dmol's native raycast, not a mocked callback.
    const points = await canvas.evaluate((canvas) => {
      const viewer = canvas._3dmol_viewer;
      return viewer.modelToScreen(viewer.getModel().selectedAtoms({}));
    });
    const scroll = await page.evaluate(() => ({ x: scrollX, y: scrollY }));
    for (const point of points.slice(0, 2))
      await page.mouse.click(point.x - scroll.x, point.y - scroll.y);
    await card
      .getByLabel('Measurements', { exact: true })
      .getByText('1.057 Å', { exact: true })
      .waitFor();
    await card
      .getByRole('button', { name: 'Clear measurements', exact: true })
      .click();
    await card
      .getByRole('button', { name: 'Undo measurement change', exact: true })
      .click();
    assert.match(
      await card.getByLabel('Measurements', { exact: true }).textContent(),
      /1\.057 Å/,
    );
    const geometry = await card.locator('dialog').evaluate((dialog) => {
      const toolbar = dialog.querySelector('.molecule-toolbar');
      const rect = dialog.getBoundingClientRect();
      return {
        width: innerWidth,
        height: innerHeight,
        dialog: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        },
        toolbarWidth: toolbar.clientWidth,
        toolbarScrollWidth: toolbar.scrollWidth,
        pageWidth: document.documentElement.scrollWidth,
      };
    });
    assert.ok(
      geometry.toolbarScrollWidth <= geometry.toolbarWidth,
      JSON.stringify(geometry),
    );
    assert.ok(geometry.pageWidth <= viewport.width, JSON.stringify(geometry));
    await page.screenshot({
      path: path.join(output, `${viewport.width}-full-light.png`),
    });
    await card
      .getByRole('button', { name: 'Close full view', exact: true })
      .click();
    assert.equal(
      await card
        .getByRole('button', { name: 'Open full view', exact: true })
        .evaluate((button) => button === document.activeElement),
      true,
    );
    assert.deepEqual(
      await canvas.evaluate((canvas) => canvas._3dmol_viewer.getView()),
      before,
    );
    await page
      .getByRole('button', { name: 'Capture inspected viewer', exact: true })
      .click();
    await page
      .getByRole('status')
      .getByText(/Captured .*PNG/)
      .waitFor();
    await page
      .getByRole('button', { name: 'Switch to dark theme', exact: true })
      .click();
    await card
      .getByRole('button', { name: 'Open full view', exact: true })
      .click();
    await card.getByRole('button', { name: 'Sticks', exact: true }).click();
    await page.screenshot({
      path: path.join(output, `${viewport.width}-full-dark.png`),
    });
    await card
      .getByRole('button', { name: 'Close full view', exact: true })
      .click();
    records.push({
      viewport,
      geometry,
      capture: await page.getByRole('status').textContent(),
    });
  }
  assert.deepEqual(errors, []);
  await writeFile(
    path.join(output, 'results.json'),
    JSON.stringify({ records, errors }, null, 2),
  );
  console.log(JSON.stringify({ passed: true, output, records }, null, 2));
} finally {
  await browser.close();
}
