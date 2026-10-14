const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureAllFrames() {
  const framesDir = path.join(__dirname, 'animation-frames');
  if (!fs.existsSync(framesDir)) {
    fs.mkdirSync(framesDir, { recursive: true });
  }

  console.log('Launching browser to inspect every frame from 1st to last...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

  console.log('Connecting to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // Determine total scrollable height of the pinned animation container
  const storyContainerInfo = await page.evaluate(() => {
    const el = document.querySelector('[data-story-stage]') || document.querySelector('.min-h-\\[7000px\\]') || document.body;
    return {
      scrollHeight: document.documentElement.scrollHeight,
      viewportHeight: window.innerHeight,
    };
  });
  console.log('Page scroll metrics:', storyContainerInfo);

  // We want to sample across the entire 7000px scroll range in finely-spaced intervals
  // Total distance: 7000px. Stepping by 140px gives 51 high-resolution sequential frames!
  const step = 140;
  const maxScroll = 7000;
  const scrollPoints = [];
  for (let y = 0; y <= maxScroll; y += step) {
    scrollPoints.push(y);
  }
  if (scrollPoints[scrollPoints.length - 1] !== maxScroll) {
    scrollPoints.push(maxScroll);
  }

  console.log(`Sampling ${scrollPoints.length} sequential frames from scroll 0px to ${maxScroll}px...`);

  const frameAudit = [];

  for (let i = 0; i < scrollPoints.length; i++) {
    const targetY = scrollPoints[i];
    
    // Smoothly scroll and allow GSAP scrub to settle
    await page.evaluate((y) => {
      window.scrollTo(0, y);
    }, targetY);

    // Give scrub time to interpolate smoothly
    await new Promise(r => setTimeout(r, 120));

    // Capture telemetry of what is physically active on screen at this exact frame
    const telemetry = await page.evaluate((frameIdx, currentY) => {
      const activeBadge = document.querySelector('[data-narrative-badge]')?.textContent || '';
      const activeTitle = document.querySelector('[data-narrative-title]')?.textContent || '';
      
      // Check visible actor components
      const actors = {
        envelope: !!document.querySelector('[data-actor="envelope"]'),
        paper: !!document.querySelector('[data-actor="paper"]'),
        airplane: !!document.querySelector('[data-actor="airplane"]'),
        monitors: !!document.querySelector('[data-actor="monitors"]'),
        composer: !!document.querySelector('[data-actor="composer"]'),
        clock: !!document.querySelector('[data-actor="clock"]'),
        bounce: !!document.querySelector('[data-actor="bounce"]'),
        coin: !!document.querySelector('[data-actor="coin"]'),
        vault: !!document.querySelector('[data-actor="vault"]'),
      };

      return {
        frameIdx,
        currentY,
        progress: (currentY / 7000).toFixed(3),
        actors,
      };
    }, i, targetY);

    const frameFilename = `frame_${String(i).padStart(3, '0')}_${String(targetY).padStart(4, '0')}px.png`;
    const framePath = path.join(framesDir, frameFilename);
    await page.screenshot({ path: framePath });

    telemetry.filename = frameFilename;
    frameAudit.push(telemetry);

    if (i % 5 === 0 || i === scrollPoints.length - 1) {
      console.log(`Captured frame [${i + 1}/${scrollPoints.length}] at ${targetY}px (progress ${(targetY/7000*100).toFixed(1)}%) -> ${frameFilename}`);
    }
  }

  fs.writeFileSync(
    path.join(__dirname, 'frame-audit.json'),
    JSON.stringify(frameAudit, null, 2),
    'utf-8'
  );

  console.log(`\nSuccessfully captured all ${scrollPoints.length} continuous frames into animation-frames/!`);
  await browser.close();
}

captureAllFrames().catch(err => {
  console.error('Frame capture process encountered an error:', err);
  process.exit(1);
});
