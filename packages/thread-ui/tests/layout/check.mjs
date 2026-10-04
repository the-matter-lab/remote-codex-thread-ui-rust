import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const output = path.resolve(process.env.LAYOUT_OUTPUT || './layout-evidence');
await mkdir(output, {recursive:true});
const browser = await chromium.launch({headless:true});
const records = [];
const errors = [];
async function screenshot(page, name) { await page.screenshot({path:path.join(output, `${name}.png`)}); }
async function bounded(page, name) {
  const geometry = await page.evaluate(() => ({width:innerWidth, height:innerHeight, scrollWidth:document.documentElement.scrollWidth, scrollHeight:document.documentElement.scrollHeight, bodyWidth:document.body.scrollWidth}));
  assert.ok(geometry.scrollWidth <= geometry.width && geometry.bodyWidth <= geometry.width, `${name}: horizontal overflow ${JSON.stringify(geometry)}`);
  assert.ok(geometry.scrollHeight <= geometry.height, `${name}: page scroll traps pane scroll`);
  records.push({name, ...geometry});
}
async function visibleControl(page, selector, bottom) {
  const rect = await page.locator(selector).boundingBox();
  assert.ok(rect && rect.x >= 0 && rect.y >= 0 && rect.x+rect.width <= (await page.evaluate(() => innerWidth)) && rect.y+rect.height <= bottom+1, `Control outside usable viewport: ${selector} ${JSON.stringify(rect)}`);
}
try {
  for (const viewport of [{width:1440,height:900}, {width:390,height:844}, {width:900,height:700}]) {
    for (const theme of ['light','dark']) {
      const context = await browser.newContext({viewport});
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      const label = `${viewport.width}-${theme}`;
      await page.goto(`${process.env.LAYOUT_URL || 'http://127.0.0.1:5183'}/?theme=${theme}`);
      await page.locator('.thread-graph-composer-input [contenteditable]').waitFor();
      await page.locator('.thread-graph-composer-input [contenteditable]').fill('Inspect this workspace');
      if (viewport.width === 1440) await page.locator('span[title="inspection-result-0.txt"]').waitFor();
      await bounded(page, label);
      await visibleControl(page, '.thread-graph-composer-send-button', viewport.height);
      await visibleControl(page, '.thread-graph-composer-stop-button', viewport.height);
      await screenshot(page, `${label}-chat`);
      if (viewport.width === 1440) {
        const handle = page.getByRole('separator', {name:'Resize Explorer',exact:true});
        await handle.focus();
        await page.keyboard.press('Home');
        assert.equal(await handle.getAttribute('aria-valuenow'), '260');
        await page.keyboard.press('ArrowLeft');
        assert.equal(await handle.getAttribute('aria-valuenow'), '284');
        await page.reload();
        await handle.waitFor();
        assert.equal(await handle.getAttribute('aria-valuenow'), '284');
        await handle.focus();
        await page.keyboard.press('End');
        await bounded(page, `${label}-resized`);
        // Pointer resizing also persists, without allowing a narrow chat pane.
        const rect = await handle.boundingBox();
        await page.mouse.move(rect.x+rect.width/2, rect.y+100);
        await page.mouse.down(); await page.mouse.move(rect.x+80,rect.y+100); await page.mouse.up();
        const width = Number(await handle.getAttribute('aria-valuenow'));
        assert.ok(width >=260 && width<=Number(await handle.getAttribute('aria-valuemax')));
        await page.setViewportSize({width:1100,height:900});
        await page.waitForFunction(() => Number(document.querySelector('[aria-label="Resize Explorer"]').getAttribute('aria-valuemax')) <= 510);
        assert.ok(Number(await handle.getAttribute('aria-valuenow')) <= Number(await handle.getAttribute('aria-valuemax')));
        await bounded(page, `${label}-narrow-desktop`);
        await page.setViewportSize(viewport);
        await page.waitForFunction(expected => Number(document.querySelector('[aria-label="Resize Explorer"]').getAttribute('aria-valuenow')) === expected, width);
        await screenshot(page, `${label}-workspace-resized`);
        const before = await page.locator('[aria-label="Explorer"]').evaluate(node => {node.dataset.retained='yes';return node.dataset.retained;});
        await page.getByRole('button', {name:'Toggle Explorer',exact:true}).click();
        assert.equal(await page.locator('[aria-label="Explorer"]').getAttribute('data-retained'),before);
        await page.getByRole('button', {name:'Toggle Explorer',exact:true}).click();
      } else {
        await page.getByRole('button', {name:'Show workspace',exact:true}).click();
        await page.locator('span[title="inspection-result-0.txt"]').waitFor();
        const treeScroll = page.locator('.thread-graph-workspace-tree-scroll');
        await treeScroll.hover();
        await page.mouse.wheel(0, 2200);
        await page.waitForFunction(() => document.querySelector('.thread-graph-workspace-tree-scroll').scrollTop > 500);
        await treeScroll.evaluate(node => {node.scrollTop=0;});
        await page.locator('span[title="inspection-result-0.txt"]').click();
        await page.getByText('Persistent inspection fixture', {exact:false}).waitFor();
        await bounded(page, `${label}-workspace`);
        await screenshot(page, `${label}-workspace`);
        await page.locator('[aria-label="Explorer"]').evaluate(node => node.dataset.retained='yes');
        await page.getByRole('button', {name:'Show chat',exact:true}).click();
        assert.equal(await page.locator('[aria-label="Explorer"]').getAttribute('data-retained'),'yes');
        await page.getByRole('button', {name:'Show workspace',exact:true}).click();
        await page.getByText('Persistent inspection fixture', {exact:false}).waitFor();
        assert.equal(await page.locator('[aria-label="Explorer"]').getAttribute('data-retained'),'yes');
        await page.getByRole('button', {name:'Close Explorer',exact:true}).click();
      }
      if (viewport.width === 390) {
        const opener=page.getByRole('button', {name:'Toggle navigation sidebar',exact:true});
        await opener.click();
        await page.getByRole('dialog', {name:'Thread navigation'}).waitFor();
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),'Close sidebar');
        await page.keyboard.press('Shift+Tab');
        assert.ok(await page.locator('.matter-sidebar').evaluate(node => node.contains(document.activeElement)));
        await screenshot(page, `${label}-navigation`);
        await page.keyboard.press('Escape');
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),'Toggle navigation sidebar');
        await opener.click();
        await page.getByRole('button', {name:'Agent Beta',exact:true}).click();
        assert.equal(await opener.getAttribute('aria-expanded'),'false');
        assert.equal(await page.evaluate(() => document.activeElement?.getAttribute('aria-label')),'Toggle navigation sidebar');
        // A deterministic visualViewport resize exercises the keyboard-inset path.
        await page.locator('.thread-graph-composer-input [contenteditable]').focus();
        await page.evaluate(() => { Object.defineProperty(window.visualViewport,'height',{configurable:true,value:500}); window.visualViewport.dispatchEvent(new Event('resize')); });
        await page.waitForFunction(() => parseFloat(getComputedStyle(document.querySelector('.thread-graph-composer-host')).bottom) > 300);
        await visibleControl(page,'.thread-graph-composer-send-button',500);
        await visibleControl(page,'.thread-graph-composer-stop-button',500);
        await screenshot(page, `${label}-keyboard-inset`);
        await page.reload();
        await page.setViewportSize({width:390,height:500});
        await page.locator('.thread-graph-composer-input [contenteditable]').fill('Keyboard resize fixture');
        await visibleControl(page,'.thread-graph-composer-send-button',500);
        await visibleControl(page,'.thread-graph-composer-stop-button',500);
        await bounded(page,`${label}-keyboard-resized`);
        await screenshot(page, `${label}-keyboard-resized`);
        await page.setViewportSize(viewport);
      }
      // Unavailable and connected shells share theme tokens and agent selection.
      const themeTokens=await page.locator('.matter-workbench').evaluate(node=>({fg:getComputedStyle(node).getPropertyValue('--theme-fg'), bg:getComputedStyle(node).getPropertyValue('--theme-bg')}));
      await page.goto(`${process.env.LAYOUT_URL || 'http://127.0.0.1:5183'}/?theme=${theme}&unavailable=1`);
      await page.locator('.fixture-unavailable').waitFor();
      const unavailableTokens=await page.locator('.matter-workbench').evaluate(node=>({fg:getComputedStyle(node).getPropertyValue('--theme-fg'), bg:getComputedStyle(node).getPropertyValue('--theme-bg')}));
      assert.deepEqual(unavailableTokens,themeTokens);
      if(viewport.width===390) await page.getByRole('button',{name:'Toggle navigation sidebar',exact:true}).click();
      await page.getByRole('button',{name:'Agent Beta',exact:true}).click();
      assert.equal(await page.locator('.matter-sidebar button').filter({hasText:'Agent Beta'}).getAttribute('aria-pressed'),'true');
      await bounded(page,`${label}-unavailable`);
      await screenshot(page, `${label}-unavailable`);
      await context.close();
    }
  }
  assert.deepEqual(errors,[]);
  await writeFile(path.join(output,'results.json'),JSON.stringify({passed:true,records,errors,keyboard:'Chromium viewport + synthetic visualViewport; physical mobile IME remains W11 acceptance'},null,2));
  console.log(`Passed ${records.length} layout geometry checks; screenshots in ${output}`);
} finally { await browser.close(); }
