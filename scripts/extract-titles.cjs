const fs = require('fs');
const xml = fs.readFileSync('scripts/after-grid.xml', 'utf8');
const paths = [...xml.matchAll(/<path([^>]+)>/g)].map(m => m[0]);

console.log('Path 5:', paths[5].slice(0, 200));
console.log('Path 6:', paths[6].slice(0, 200));
console.log('Path 8 (swoosh):', paths[8].slice(0, 200));

// Let's write them properly
fs.writeFileSync('public/figma-hero/shreejit-title.svg', `
<svg width="572" height="154" viewBox="113 177 572 154" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${paths[5]}
</svg>
`.trim());

fs.writeFileSync('public/figma-hero/gautam-title.svg', `
<svg width="522" height="154" viewBox="115 344 522 154" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${paths[6]}
</svg>
`.trim());

fs.writeFileSync('public/figma-hero/swoosh.svg', `
<svg width="229" height="51" viewBox="297 457 229 51" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${paths[8]}
</svg>
`.trim());

console.log('Successfully wrote exact titles and swoosh SVGs');
