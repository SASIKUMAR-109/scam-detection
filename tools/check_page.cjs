const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const url = process.argv[2] || 'http://localhost:5174/';
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const logs = [];
  page.on('console', msg => logs.push(`${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => logs.push(`pageerror: ${err.message}`));

  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    // wait a bit for client JS to run
    await page.waitForTimeout(1500);
      // try dynamic import to surface any module execution errors
      const importResult = await page.evaluate(async () => {
        try {
          await import('/src/main.tsx');
          return { ok: true };
        } catch (e) {
          return { ok: false, error: String(e) };
        }
      });
      fs.writeFileSync('page_dynamic_import.json', JSON.stringify(importResult, null, 2));
      // test DOM mutation to ensure scripts can modify the page
      await page.evaluate(() => {
        const root = document.getElementById('root');
        if (root) root.innerHTML = '<div id="debug-marker">DOM_OK</div>';
      });
    await page.screenshot({ path: 'page_screenshot.png', fullPage: true });
    const html = await page.evaluate(() => document.documentElement.innerHTML);
    fs.writeFileSync('page_source.html', html);
    fs.writeFileSync('page_console.log', logs.join('\n') || 'no logs');
    console.log('OK');
  } catch (e) {
    console.error('ERROR', e);
  } finally {
    await browser.close();
  }
})();
