const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1434, height: 900 } });
  
  // Create an HTML page loading Anton and measuring "SHREEJIT"
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="file:///${path.resolve('node_modules/@fontsource/anton/400.css').replace(/\\/g, '/')}">
      <style>
        body { margin: 0; background: #f5f2e9; }
        .test { font-family: 'Anton', sans-serif; font-size: 165px; line-height: 0.95; letter-spacing: -0.01em; display: inline-block; }
      </style>
    </head>
    <body>
      <div id="shreejit" class="test">SHREEJIT</div>
      <div id="gautam" class="test">GAUTAM</div>
      <script>
        const s = document.getElementById('shreejit').getBoundingClientRect();
        const g = document.getElementById('gautam').getBoundingClientRect();
        window.results = {
          shreejit: { width: s.width, height: s.height },
          gautam: { width: g.width, height: g.height }
        };
      </script>
    </body>
    </html>
  `);
  await page.waitForTimeout(500);
  const res = await page.evaluate(() => window.results);
  console.log('Results at 165px:', res);
  await browser.close();
})();
