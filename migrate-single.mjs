import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const url = process.argv[2];
const slug = process.argv[3];

if (!url || !slug) {
  console.error('Usage: node migrate-single.mjs <url> <slug>');
  process.exit(1);
}

const imgDir = `/Users/bvanderb/Documents/GitHub/benvanderberg.com/public/blog/${slug}`;
mkdirSync(imgDir, { recursive: true });

console.log(`Starting: ${slug}`);

const browser = await chromium.launch({ headless: false, args: ['--no-sandbox'] });
const ctx = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
await page.waitForTimeout(5000);
for (let i = 0; i < 25; i++) {
  await page.evaluate((s) => window.scrollTo(0, s * 600), i);
  await page.waitForTimeout(300);
}
await page.waitForTimeout(2000);

// Check if we hit a bot wall
const title = await page.title();
console.log('Page title:', title);
if (title.includes('security') || title.includes('Cloudflare') || title.includes('Just a moment')) {
  console.error('BOT WALL DETECTED - aborting');
  await browser.close();
  process.exit(1);
}

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
    const safeExt = (ext.length > 4 || !ext.match(/^[a-z]+$/i)) ? 'png' : ext;
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
const articleTitle = titleEl ? titleEl.text.replace(/"/g, "'") : slug;

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
title: "${articleTitle}"
description: "${description}"
pubDate: ${pubDate}${heroImage ? `\nheroImage: ${heroImage}` : ''}
canonicalUrl: "${url}"
---

`;

writeFileSync(`/Users/bvanderb/Documents/GitHub/benvanderberg.com/src/content/blog/${slug}.md`, frontmatter + body.trim() + '\n');
console.log(`DONE ${slug} | images: ${imgIdx - 1} | date: ${pubDate} | elements: ${data.elements.length}`);
await browser.close();
