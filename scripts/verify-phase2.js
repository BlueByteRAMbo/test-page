const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function verifyPhase2() {
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

  // Helper to scroll smoothly to a normalized progress in #how-it-works
  async function scrollToProgress(progress) {
    await page.evaluate((p) => {
      const el = document.getElementById('how-it-works');
      if (el) {
        const stageHeight = el.offsetHeight - window.innerHeight;
        window.scrollTo({ top: stageHeight * p, behavior: 'instant' });
      }
    }, progress);
    await new Promise(r => setTimeout(r, 1200));
  }

  // 1. Desktop 1440x900 Chapter 1: Hero Envelope
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  const ch1Path = path.join(__dirname, '..', 'phase2-ch1-hero.png');
  await page.screenshot({ path: ch1Path });
  console.log('Saved Phase 2 Chapter 1 Hero screenshot:', ch1Path);

  // 2. Desktop Chapter 2: Letter Emerged & Unfolded (p = 0.23)
  await scrollToProgress(0.23);
  const ch2Path = path.join(__dirname, '..', 'phase2-ch2-letter-unfolded.png');
  await page.screenshot({ path: ch2Path });
  console.log('Saved Phase 2 Chapter 2 Letter screenshot:', ch2Path);

  // 3. Desktop Chapter 2: Milestones & Verified Stamp (p = 0.27)
  await scrollToProgress(0.27);
  const ch2StampPath = path.join(__dirname, '..', 'phase2-ch2-verified-stamp.png');
  await page.screenshot({ path: ch2StampPath });
  console.log('Saved Phase 2 Chapter 2 Verified Stamp screenshot:', ch2StampPath);

  // 4. Desktop Chapter 3: Origami Plane Flight (p = 0.37)
  await scrollToProgress(0.37);
  const ch3FlightPath = path.join(__dirname, '..', 'phase2-ch3-flight.png');
  await page.screenshot({ path: ch3FlightPath });
  console.log('Saved Phase 2 Chapter 3 Flight screenshot:', ch3FlightPath);

  // 5. Desktop Chapter 3: Laser Target Lock on Sarah Chen (p = 0.42)
  await scrollToProgress(0.42);
  const ch3LockPath = path.join(__dirname, '..', 'phase2-ch3-laser-lock.png');
  await page.screenshot({ path: ch3LockPath });
  console.log('Saved Phase 2 Chapter 3 Laser Lock screenshot:', ch3LockPath);

  // 6. Mobile 390x844 Chapter 1
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  const mobileCh1Path = path.join(__dirname, '..', 'phase2-mobile-ch1.png');
  await page.screenshot({ path: mobileCh1Path });
  console.log('Saved Phase 2 Mobile Chapter 1 screenshot:', mobileCh1Path);

  // 7. Mobile Chapter 2 (p = 0.25)
  await scrollToProgress(0.25);
  const mobileCh2Path = path.join(__dirname, '..', 'phase2-mobile-ch2.png');
  await page.screenshot({ path: mobileCh2Path });
  console.log('Saved Phase 2 Mobile Chapter 2 screenshot:', mobileCh2Path);

  await browser.close();
  console.log('Phase 2 verification captures completed successfully.');
}

verifyPhase2().catch(err => {
  console.error('Phase 2 verification failed:', err);
  process.exit(1);
});
