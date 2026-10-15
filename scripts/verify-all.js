const path = require('path');
const fs = require('fs');
const { launchBrowser } = require('./browser-launcher');

async function verifyAll() {
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await launchBrowser();
  const page = await browser.newPage();

  async function scrollToProgress(progress) {
    await page.evaluate((p) => {
      const el = document.getElementById('how-it-works');
      if (el) {
        const stageHeight = el.offsetHeight - window.innerHeight;
        window.scrollTo({ top: stageHeight * p, behavior: 'instant' });
      }
    }, progress);
    await new Promise((r) => setTimeout(r, 1200));
  }

  async function scrollToSelector(selector) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' });
      }
    }, selector);
    await new Promise((r) => setTimeout(r, 1200));
  }

  const stops = [
    { name: '0', progress: 0.00 },
    { name: '1', progress: 0.07 },
    { name: '2', progress: 0.21 },
    { name: '3', progress: 0.36 },
    { name: '4', progress: 0.52 },
    { name: '5', progress: 0.67 },
    { name: '6', progress: 0.81 },
    { name: '7', progress: 0.94 },
    { name: '8_pricing', selector: '#pricing' },
    { name: '9_footer', selector: 'footer' },
  ];

  const viewports = [
    { label: '1440x900', width: 1440, height: 900, isMobile: false },
    { label: '390x844', width: 390, height: 844, isMobile: true },
  ];

  for (const vp of viewports) {
    console.log(`\nCapturing viewport: ${vp.label}...`);
    await page.setViewport({
      width: vp.width,
      height: vp.height,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
      deviceScaleFactor: vp.isMobile ? 2 : 1,
    });

    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    for (const s of stops) {
      if (s.selector) {
        await scrollToSelector(s.selector);
      } else {
        await scrollToProgress(s.progress);
      }
      const filename = `${vp.label}_${s.name}.png`;
      const fullPath = path.join(screenshotsDir, filename);
      await page.screenshot({ path: fullPath });
      console.log(`Saved screenshot: ${filename}`);
    }
  }

  await browser.close();
  console.log('\nAll captures completed successfully.');
}

verifyAll().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
