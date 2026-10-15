const { launchBrowser } = require('./browser-launcher');
const path = require('path');
const fs = require('fs');

async function verifyPhase3() {
  const browser = await launchBrowser();

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
    await new Promise(r => setTimeout(r, 1400));
  }

  // Set Desktop 1440x900
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Chapter 4: Personalise & Send - Body Typed with Highlights (p = 0.50)
  await scrollToProgress(0.50);
  const ch4TypedPath = path.join(__dirname, '..', 'phase3-ch4-composer-typing.png');
  await page.screenshot({ path: ch4TypedPath });
  console.log('Saved Phase 3 Chapter 4 Composer Typing screenshot:', ch4TypedPath);

  // 2. Chapter 4: Send Button & Dispatched Flight (p = 0.58)
  await scrollToProgress(0.58);
  const ch4SendPath = path.join(__dirname, '..', 'phase3-ch4-send-dispatch.png');
  await page.screenshot({ path: ch4SendPath });
  console.log('Saved Phase 3 Chapter 4 Send & Dispatch screenshot:', ch4SendPath);

  // 3. Chapter 5: 4-Day Follow-ups - Precision Chronometer Sweeping (p = 0.67)
  await scrollToProgress(0.67);
  const ch5ChronometerPath = path.join(__dirname, '..', 'phase3-ch5-chronometer.png');
  await page.screenshot({ path: ch5ChronometerPath });
  console.log('Saved Phase 3 Chapter 5 Chronometer screenshot:', ch5ChronometerPath);

  // 4. Chapter 6: Bounce Shield - Parabolic Gold Coin Flight (p = 0.78)
  await scrollToProgress(0.78);
  const ch6CoinPath = path.join(__dirname, '..', 'phase3-ch6-bounce-coin.png');
  await page.screenshot({ path: ch6CoinPath });
  console.log('Saved Phase 3 Chapter 6 Bounce Coin screenshot:', ch6CoinPath);

  // 5. Chapter 6: Executive Vault Refund Deposit (p = 0.85)
  await scrollToProgress(0.85);
  const ch6VaultPath = path.join(__dirname, '..', 'phase3-ch6-vault-deposit.png');
  await page.screenshot({ path: ch6VaultPath });
  console.log('Saved Phase 3 Chapter 6 Vault Deposit screenshot:', ch6VaultPath);

  // 6. Chapter 7: Settle Plinth & Ready-to-Launch Plane (p = 0.94)
  await scrollToProgress(0.94);
  const ch7SettlePath = path.join(__dirname, '..', 'phase3-ch7-settle-plinth.png');
  await page.screenshot({ path: ch7SettlePath });
  console.log('Saved Phase 3 Chapter 7 Settle Plinth screenshot:', ch7SettlePath);

  // 7. Mobile 390x844 Chapter 4
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await scrollToProgress(0.50);
  const mobileCh4Path = path.join(__dirname, '..', 'phase3-mobile-ch4.png');
  await page.screenshot({ path: mobileCh4Path });
  console.log('Saved Phase 3 Mobile Chapter 4 screenshot:', mobileCh4Path);

  // 8. Mobile Chapter 5 (p = 0.67)
  await scrollToProgress(0.67);
  const mobileCh5Path = path.join(__dirname, '..', 'phase3-mobile-ch5.png');
  await page.screenshot({ path: mobileCh5Path });
  console.log('Saved Phase 3 Mobile Chapter 5 screenshot:', mobileCh5Path);

  // 9. Mobile Chapter 6 (p = 0.82)
  await scrollToProgress(0.82);
  const mobileCh6Path = path.join(__dirname, '..', 'phase3-mobile-ch6.png');
  await page.screenshot({ path: mobileCh6Path });
  console.log('Saved Phase 3 Mobile Chapter 6 screenshot:', mobileCh6Path);

  await browser.close();
  console.log('Phase 3 verification captures completed successfully.');
}

verifyPhase3().catch(err => {
  console.error('Phase 3 verification failed:', err);
  process.exit(1);
});
