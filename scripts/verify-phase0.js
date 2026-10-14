const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function verifyPhase0() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();

  // 1. Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));
  const desktopPath = path.join(__dirname, '..', 'phase0-desktop.png');
  await page.screenshot({ path: desktopPath });
  console.log('Saved desktop verification screenshot:', desktopPath);

  // 2. Mobile 390x844 (iPhone 14 standard)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1500));
  const mobilePath = path.join(__dirname, '..', 'phase0-mobile.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved mobile verification screenshot:', mobilePath);

  await browser.close();
  console.log('Phase 0 browser verification completed.');
}

verifyPhase0().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
