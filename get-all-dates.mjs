import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';

const ARTICLES = [
  { url: 'https://medium.com/adobetech/july-release-of-adobe-document-services-pdf-embed-and-pdf-tools-17211bf7776d', slug: 'july-release-of-adobe-document-services-pdf-embed-and-pdf-tools' },
  { url: 'https://medium.com/adobetech/pdf-analytics-get-insights-on-embedded-pdfs-on-your-website-44e6a314fb1f', slug: 'pdf-analytics-get-insights-on-embedded-pdfs-on-your-website' },
  { url: 'https://medium.com/adobetech/add-pdf-documents-and-forms-into-your-webpages-using-adobe-document-cloud-632cc9524321', slug: 'add-pdf-documents-and-forms-into-your-webpages-using-adobe-document-cloud' },
  { url: 'https://medium.com/adobetech/unpacking-march-release-adobe-document-cloud-sdk-7cccf910e941', slug: 'unpacking-march-release-adobe-document-cloud-sdk' },
  { url: 'https://medium.com/adobetech/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk-3a40094f27b6', slug: 'easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk' },
  { url: 'https://medium.com/adobetech/creating-microsoft-powerapps-with-adobe-sign-3fbed7e5707d', slug: 'creating-microsoft-powerapps-with-adobe-sign' },
  { url: 'https://medium.com/adobetech/use-bots-to-get-adobe-sign-updates-with-microsoft-flow-ee29e0f58e7f', slug: 'use-bots-to-get-adobe-sign-updates-with-microsoft-flow' },
  { url: 'https://medium.com/adobetech/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure-a4b864c5b8c', slug: 'no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure' },
  { url: 'https://medium.com/adobetech/push-adobe-sign-pdf-agreements-to-microsoft-sharepoint-automatically-c5313d500901', slug: 'push-adobe-sign-pdf-agreements-to-microsoft-sharepoint-automatically' },
  { url: 'https://medium.com/adobetech/use-adobe-indesign-and-adobe-sign-to-streamline-your-forms-71c6a84c9d81', slug: 'use-adobe-indesign-and-adobe-sign-to-streamline-your-forms' },
];

async function getDate(url) {
  const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] });
  const ctx = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  
  const dateInfo = await page.evaluate(() => {
    const metaDate = document.querySelector('meta[property="article:published_time"]');
    const scripts = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => {
      try { return JSON.parse(s.textContent); } catch { return null; }
    }).filter(Boolean);
    const ldDate = scripts.map(s => s.datePublished || s.dateCreated).find(d => d);
    return {
      metaDate: metaDate ? metaDate.getAttribute('content') : null,
      ldDate,
    };
  });
  
  await browser.close();
  return dateInfo.ldDate || dateInfo.metaDate || null;
}

const results = {};
for (const { url, slug } of ARTICLES) {
  try {
    const dateStr = await getDate(url);
    if (dateStr) {
      const d = new Date(dateStr);
      const formatted = isNaN(d) ? null : d.toISOString().slice(0, 10);
      results[slug] = formatted;
      console.log(`${slug}: ${formatted}`);
    } else {
      results[slug] = null;
      console.log(`${slug}: NO DATE FOUND`);
    }
  } catch(e) {
    results[slug] = null;
    console.error(`${slug}: ERROR - ${e.message}`);
  }
  await new Promise(r => setTimeout(r, 3000));
}

// Now patch the markdown files
for (const { slug } of ARTICLES) {
  const date = results[slug];
  if (!date) { console.log(`Skipping ${slug} - no date`); continue; }
  const filePath = `/Users/bvanderb/Documents/GitHub/benvanderberg.com/src/content/blog/${slug}.md`;
  let content = readFileSync(filePath, 'utf8');
  content = content.replace(/^pubDate: 2021-01-01$/m, `pubDate: ${date}`);
  writeFileSync(filePath, content);
  console.log(`Patched ${slug} -> ${date}`);
}

console.log('\nAll done!');
writeFileSync('/Users/bvanderb/Documents/GitHub/benvanderberg.com/dates-result.json', JSON.stringify(results, null, 2));
