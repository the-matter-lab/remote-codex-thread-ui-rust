import assert from 'node:assert/strict';
import {mkdir, writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const output = path.resolve(process.env.COPY_OUTPUT || './copy-evidence');
await mkdir(output, {recursive:true});
const browser = await chromium.launch();
const records = [];
const errors = [];
const expected = 'const water = "H2O";';

async function probe(button) {
  return button.evaluate(node => {
    const rect = node.getBoundingClientRect();
    const block = node.closest('.thread-graph-code-block');
    const hit = document.elementFromPoint(rect.x+rect.width/2, rect.y+rect.height/2);
    return {
      fine:matchMedia('(pointer:fine)').matches, hover:matchMedia('(hover:hover)').matches,
      touch:block.dataset.touchActions, hovered:block.matches(':hover'),
      focused:block.matches(':focus-within'), pointer:getComputedStyle(node).pointerEvents,
      opacity:getComputedStyle(node).opacity,
      rect:{x:rect.x, y:rect.y, width:rect.width, height:rect.height},
      hit:hit?.outerHTML.slice(0,160), hitsButton:hit === node || node.contains(hit),
    };
  });
}
async function assertClipboard(page) {
  assert.equal((await page.evaluate(() => navigator.clipboard.readText())).trim(), expected);
}

try {
  for (const scenario of [
    {name:'desktop', width:1440, touch:false},
    {name:'narrow-mouse', width:390, touch:false},
    {name:'touch', width:390, touch:true},
  ]) {
    const context = await browser.newContext({
      viewport:{width:scenario.width, height:scenario.width === 390 ? 844 : 900},
      hasTouch:scenario.touch, isMobile:scenario.touch,
      permissions:['clipboard-read','clipboard-write'],
    });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${process.env.LAYOUT_URL || 'http://127.0.0.1:5183'}/?copyCode`);
    const block = page.locator('.thread-graph-code-block').first();
    const button = block.getByRole('button', {name:'Copy code', exact:true});
    // Wait for the async highlighter to replace the provisional code DOM.
    await block.locator('pre.shiki').waitFor();
    await page.waitForTimeout(250);
    await block.scrollIntoViewIfNeeded();
    await page.mouse.move(0,0);
    await page.waitForTimeout(180);
    const before = await probe(button);
    assert.equal(before.fine, !scenario.touch);
    assert.equal(before.hover, !scenario.touch);
    assert.equal(before.opacity, '0');
    assert.equal(before.pointer, scenario.touch ? 'none' : 'auto');
    if (!scenario.touch) {
      // A normal click must succeed without force or a prior hover workaround.
      await button.click({timeout:4000});
      await assertClipboard(page);
    }

    // Keep the reveal target clear of the floating composer/jump controls.
    await block.evaluate(node => node.scrollIntoView({block:'center'}));
    await page.waitForTimeout(180);
    await page.mouse.move(0,0);
    if (scenario.touch) {
      const rect = await block.boundingBox();
      await page.touchscreen.tap(rect.x+12, rect.y+rect.height/2);
    } else {
      await block.hover();
    }
    await page.waitForTimeout(180);
    const revealed = await probe(button);
    assert.equal(revealed.pointer, 'auto');
    assert.ok(Number(revealed.opacity) > 0);
    assert.equal(revealed.hitsButton, true, `${scenario.name}: copy target obstructed`);
    if (scenario.touch) assert.equal(revealed.touch, 'true');
    await page.evaluate(() => navigator.clipboard.writeText(''));
    if (scenario.touch) await button.tap();
    else await button.click();
    await assertClipboard(page);
    await page.screenshot({path:path.join(output, `${scenario.name}.png`)});

    await page.evaluate(() => navigator.clipboard.writeText(''));
    await button.focus();
    await page.keyboard.press('Enter');
    await assertClipboard(page);
    records.push({scenario:scenario.name, before, revealed, clipboardMatches:true, keyboardClipboardMatches:true});
    await context.close();
  }
  assert.deepEqual(errors, []);
  await writeFile(path.join(output, 'results.json'), JSON.stringify(records,null,2));
  console.log('Copy code passes desktop, narrow mouse, and touch reveal; clipboard and keyboard checked.');
} finally {
  await browser.close();
}
