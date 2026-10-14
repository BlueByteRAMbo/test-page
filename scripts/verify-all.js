const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

/**
 * End-to-End Visual Verification for All 7 Chapters (Desktop & Mobile)
 */
async function verifyAll() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--enable-webgl',
      '--use-gl=angle',
      '--ignore-gpu-blocklist',
    ]
  });

  const page = await browser.newPage();

  async function scrollToProgress(progress) {
    await page.evaluate((p) => {
      const el = document.getElementById('how-it-works');
      if (el) {
        const stageHeight = el.offsetHeight - window.innerHeight;
        window.scrollTo({ top: stageHeight * p, behavior: 'instant' });
      }
    }, progress);
    await new Promise(r => setTimeout(r, 1400));
  }

  // 1. Desktop 1440x900
  console.log('Capturing Desktop 1440x900 full pipeline...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  const chapters = [
    { name: 'ch1-hero', progress: 0.05 },
    { name: 'ch2-highlights', progress: 0.22 },
    { name: 'ch3-discovery', progress: 0.38 },
    { name: 'ch4-personalize', progress: 0.52 },
    { name: 'ch5-followup', progress: 0.67 },
    { name: 'ch6-refund', progress: 0.82 },
    { name: 'ch7-settle', progress: 0.94 },
  ];

  for (const ch of chapters) {
    await scrollToProgress(ch.progress);
    const pth = path.join(__dirname, '..', `final-desktop-${ch.name}.png`);
    await page.screenshot({ path: pth });
    console.log(`Saved: ${pth}`);
  }

  // 2. Mobile 390x844
  console.log('Capturing Mobile 390x844 full pipeline...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));

  for (const ch of chapters) {
    await scrollToProgress(ch.progress);
    const pth = path.join(__dirname, '..', `final-mobile-${ch.name}.png`);
    await page.screenshot({ path: pth });
    console.log(`Saved: ${pth}`);
  }

  await browser.close();
  console.log('All 14 desktop and mobile captures finished successfully.');
}

verifyAll().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
