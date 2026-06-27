import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';

const ARTICLES = [
  { archiveUrl: 'https://web.archive.org/web/20210507000000/https://medium.com/adobetech/variable-number-of-recipients-for-adobe-sign-for-microsoft-power-automate-594a4ea90da9', slug: 'variable-number-of-recipients-for-adobe-sign-for-microsoft-power-automate' },
  { archiveUrl: 'https://web.archive.org/web/20201218000000/https://medium.com/adobetech/adobe-acrobat-for-teams-making-collaboration-effortless-5c2fb3acc5f0', slug: 'adobe-acrobat-for-teams-making-collaboration-effortless' },
  { archiveUrl: 'https://web.archive.org/web/20210531000000/https://medium.com/adobetech/adding-annotations-to-a-pdf-using-adobe-pdf-embed-api-fb6f85da4c02', slug: 'adding-annotations-to-a-pdf-using-adobe-pdf-embed-api' },
];

const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();

for (const { archiveUrl, slug } of ARTICLES) {
  try {
    await page.goto(archiveUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(8000);
    
    const info = await page.evaluate(() => {
      const preview = document.body.innerText.slice(0, 500);
      const timeEl = document.querySelector('time[datetime]');
      const timeStr = timeEl ? timeEl.getAttribute('datetime') : null;
      return { preview, timeStr };
    });
    
    console.log(`${slug}`);
    console.log('  preview:', info.preview.slice(0, 200));
    console.log('  time:', info.timeStr);
  } catch(e) {
    console.error(`FAILED ${slug}: ${e.message}`);
  }
}

await browser.close();
