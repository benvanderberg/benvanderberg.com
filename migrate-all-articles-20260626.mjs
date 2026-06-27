import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const ARTICLES = [
  {
    url: 'https://medium.com/adobetech/july-release-of-adobe-document-services-pdf-embed-and-pdf-tools-17211bf7776d',
    slug: 'july-release-of-adobe-document-services-pdf-embed-and-pdf-tools'
  },
  {
    url: 'https://medium.com/adobetech/pdf-analytics-get-insights-on-embedded-pdfs-on-your-website-44e6a314fb1f',
    slug: 'pdf-analytics-get-insights-on-embedded-pdfs-on-your-website'
  },
  {
    url: 'https://medium.com/adobetech/add-pdf-documents-and-forms-into-your-webpages-using-adobe-document-cloud-632cc9524321',
    slug: 'add-pdf-documents-and-forms-into-your-webpages-using-adobe-document-cloud'
  },
  {
    url: 'https://medium.com/adobetech/unpacking-march-release-adobe-document-cloud-sdk-7cccf910e941',
    slug: 'unpacking-march-release-adobe-document-cloud-sdk'
  },
  {
    url: 'https://medium.com/adobetech/easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk-3a40094f27b6',
    slug: 'easily-embed-pdf-into-your-website-using-adobe-document-cloud-view-sdk'
  },
  {
    url: 'https://medium.com/adobetech/creating-microsoft-powerapps-with-adobe-sign-3fbed7e5707d',
    slug: 'creating-microsoft-powerapps-with-adobe-sign'
  },
  {
    url: 'https://medium.com/adobetech/use-bots-to-get-adobe-sign-updates-with-microsoft-flow-ee29e0f58e7f',
    slug: 'use-bots-to-get-adobe-sign-updates-with-microsoft-flow'
  },
  {
    url: 'https://medium.com/adobetech/no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure-a4b864c5b8c',
    slug: 'no-code-integration-send-adobe-sign-agreements-using-logic-apps-in-microsoft-azure'
  },
  {
    url: 'https://medium.com/adobetech/push-adobe-sign-pdf-agreements-to-microsoft-sharepoint-automatically-c5313d500901',
    slug: 'push-adobe-sign-pdf-agreements-to-microsoft-sharepoint-automatically'
  },
  {
    url: 'https://medium.com/adobetech/use-adobe-indesign-and-adobe-sign-to-streamline-your-forms-71c6a84c9d81',
    slug: 'use-adobe-indesign-and-adobe-sign-to-streamline-your-forms'
  }
];

async function migrateArticle(page, url, slug) {
  const imgDir = `/Users/bvanderb/Documents/GitHub/benvanderberg.com/public/blog/${slug}`;
  mkdirSync(imgDir, { recursive: true });

  console.log(`\n--- Starting: ${slug} ---`);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(5000);
  for (let i = 0; i < 25; i++) {
    await page.evaluate((s) => window.scrollTo(0, s * 600), i);
    await page.waitForTimeout(300);
  }
  await page.waitForTimeout(2000);

  const data = await page.evaluate(() => {
    const timeEl = document.querySelector('time[datetime]');
    const pubDate = timeEl ? timeEl.getAttribute('datetime') : null;
    const article = document.querySelector('article') || document.body;
    const seen = new Set();
    const elements = [];
    for (const node of article.querySelectorAll('h1,h2,h3,h4,p,figure,ul,ol')) {
      if (node.tagName === 'FIGURE') {
        const img = node.querySelector('img');
        if (!img || img.naturalWidth < 300) continue;
        if (seen.has(img.src)) continue;
        seen.add(img.src);
        const cap = node.querySelector('figcaption');
        elements.push({ type: 'img', src: img.src, alt: img.alt || '', caption: cap?.textContent?.trim() || '' });
      } else if (node.tagName === 'UL' || node.tagName === 'OL') {
        const items = [...node.querySelectorAll('li')].map(li => li.textContent.trim()).filter(Boolean);
        if (items.length) elements.push({ type: node.tagName.toLowerCase(), items });
      } else {
        const text = node.textContent.trim();
        if (text && text.length > 3 && !['9','Listen','Share'].includes(text)) {
          elements.push({ type: node.tagName.toLowerCase(), text });
        }
      }
    }
    return { pubDate, elements };
  });

  let imgIdx = 1;
  for (const el of data.elements) {
    if (el.type === 'img') {
      const ext = el.src.split('.').pop().split('?')[0] || 'png';
      const safeExt = ext.length > 4 ? 'png' : ext;
      const fname = `${String(imgIdx).padStart(2,'0')}.${safeExt}`;
      try {
        const resp = await page.request.get(el.src);
        writeFileSync(`${imgDir}/${fname}`, await resp.body());
        el.localSrc = `/blog/${slug}/${fname}`;
        imgIdx++;
      } catch(e) { console.error('img fail', el.src, e.message); }
    }
  }

  const firstImg = data.elements.find(e => e.type === 'img');
  const heroImage = firstImg ? firstImg.localSrc : '';
  const firstP = data.elements.find(e => e.type === 'p');
  const description = firstP ? firstP.text.slice(0, 160).replace(/"/g, "'") : '';
  const titleEl = data.elements.find(e => e.type === 'h1');
  const title = titleEl ? titleEl.text.replace(/"/g, "'") : slug;

  let pubDate = '2021-01-01';
  if (data.pubDate) {
    const d = new Date(data.pubDate);
    if (!isNaN(d)) pubDate = d.toISOString().slice(0,10);
  }

  let body = '';
  let skipFirst = true;
  for (const el of data.elements) {
    if (el.type === 'h1') { if (skipFirst) { skipFirst = false; continue; } body += `# ${el.text}\n\n`; continue; }
    if (el.type === 'h2') { body += `## ${el.text}\n\n`; continue; }
    if (el.type === 'h3') { body += `### ${el.text}\n\n`; continue; }
    if (el.type === 'h4') { body += `#### ${el.text}\n\n`; continue; }
    if (el.type === 'p') { body += `${el.text}\n\n`; continue; }
    if (el.type === 'ul') { body += el.items.map(i => `- ${i}`).join('\n') + '\n\n'; continue; }
    if (el.type === 'ol') { body += el.items.map((i,n) => `${n+1}. ${i}`).join('\n') + '\n\n'; continue; }
    if (el.type === 'img') {
      const alt = el.caption || el.alt || '';
      body += `![${alt}](${el.localSrc})\n\n`;
    }
  }

  const frontmatter = `---
title: "${title}"
description: "${description}"
pubDate: ${pubDate}${heroImage ? `\nheroImage: ${heroImage}` : ''}
canonicalUrl: "${url}"
---

`;

  writeFileSync(`/Users/bvanderb/Documents/GitHub/benvanderberg.com/src/content/blog/${slug}.md`, frontmatter + body.trim() + '\n');
  console.log(`DONE ${slug} | images: ${imgIdx - 1} | date: ${pubDate}`);
}

const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();

const results = [];
for (const { url, slug } of ARTICLES) {
  try {
    await migrateArticle(page, url, slug);
    results.push({ slug, status: 'OK' });
  } catch(e) {
    console.error(`FAILED ${slug}:`, e.message);
    results.push({ slug, status: 'FAILED', error: e.message });
  }
}

await browser.close();

console.log('\n\n=== SUMMARY ===');
for (const r of results) {
  console.log(`${r.status === 'OK' ? 'OK  ' : 'FAIL'} ${r.slug}${r.error ? ' - ' + r.error : ''}`);
}
