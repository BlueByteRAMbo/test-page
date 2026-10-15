const { launchBrowser } = require('./browser-launcher');
const path = require('path');
const fs = require('fs');

async function verifyPhase1() {
  const browser = await launchBrowser();

  const page = await browser.newPage();

  // 1. Desktop 1440x900 Hero (Chapter 1)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  const heroPath = path.join(__dirname, '..', 'phase1-desktop-hero.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved Phase 1 desktop hero screenshot:', heroPath);

  // 2. Desktop Scroll to Chapter 3 (~35% through stage)
  await page.evaluate(() => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const stageHeight = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: stageHeight * 0.35, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const ch3Path = path.join(__dirname, '..', 'phase1-desktop-chapter3.png');
  await page.screenshot({ path: ch3Path });
  console.log('Saved Phase 1 desktop Chapter 3 screenshot:', ch3Path);

  // 3. Desktop Scroll to Chapter 5 (~68% through stage)
  await page.evaluate(() => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const stageHeight = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: stageHeight * 0.68, behavior: 'instant' });
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  const ch5Path = path.join(__dirname, '..', 'phase1-desktop-chapter5.png');
  await page.screenshot({ path: ch5Path });
  console.log('Saved Phase 1 desktop Chapter 5 screenshot:', ch5Path);

  // 4. Mobile 390x844 (iPhone 14)
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const mobilePath = path.join(__dirname, '..', 'phase1-mobile.png');
  await page.screenshot({ path: mobilePath });
  console.log('Saved Phase 1 mobile screenshot:', mobilePath);

  await browser.close();
  console.log('Phase 1 browser verification completed successfully.');
}

verifyPhase1().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
