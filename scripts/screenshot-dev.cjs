const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Go to dev server
  await page.goto('http://127.0.0.1:5174');
  await page.waitForTimeout(2000); // Wait for framer-motion animations
  
  await page.screenshot({ path: 'updated-hero-render.png' });
  await browser.close();
  console.log('Saved updated-hero-render.png');
})();
