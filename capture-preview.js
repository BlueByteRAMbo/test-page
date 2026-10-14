const puppeteer = require('puppeteer-core');
const path = require('path');

async function capture() {
  console.log('Launching Edge...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Scene 01 - Hero Floating Envelope (0px)
  await page.screenshot({ path: path.join(__dirname, 'preview-01-hero.png') });

  // 2. Scene 02 - Highlights Paper with Ticks (750px)
  await page.evaluate(() => window.scrollTo(0, 750));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-02-highlights.png') });

  // 3. Scene 03 - Envelope on Airplane in Flight (1950px)
  await page.evaluate(() => window.scrollTo(0, 1950));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-03-airplane.png') });

  // 4. Scene 04 - Zoom Out 3 Monitors (2300px)
  await page.evaluate(() => window.scrollTo(0, 2300));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-04-3monitors.png') });

  // 5. Scene 05 - Zoom In Confirmed Recruiter & Highlight (2950px)
  await page.evaluate(() => window.scrollTo(0, 2950));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-05-highlight.png') });

  // 6. Scene 06 - Personalised Email Typing & Send (3900px)
  await page.evaluate(() => window.scrollTo(0, 3900));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-06-typing.png') });

  // 7. Scene 07 - Recruiter Monitors with Red Badges (4800px)
  await page.evaluate(() => window.scrollTo(0, 4800));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-07-badges.png') });

  // 8. Scene 08 - Rotating Clock & 4-Day Timeline (5700px)
  await page.evaluate(() => window.scrollTo(0, 5700));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-08-clock.png') });

  // 9. Scene 09 - Bounced Cross & Coin Return to Cartoon User (6450px)
  await page.evaluate(() => window.scrollTo(0, 6450));
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, 'preview-09-coin.png') });

  // 10. Pricing & Footer Section (7800px)
  await page.evaluate(() => window.scrollTo(0, 7800));
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(__dirname, 'preview-10-pricing.png') });

  await browser.close();
  console.log('All 10 screenplay scenes captured successfully.');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
