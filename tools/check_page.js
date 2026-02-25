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
    await page.screenshot({ path: 'page_screenshot.png', fullPage: true });
    const html = await page.content();
    fs.writeFileSync('page_source.html', html);
    fs.writeFileSync('page_console.log', logs.join('\n') || 'no logs');
    console.log('OK');
  } catch (e) {
    console.error('ERROR', e);
  } finally {
    await browser.close();
  }
})();
