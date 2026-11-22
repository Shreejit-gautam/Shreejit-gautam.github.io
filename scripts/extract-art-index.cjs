const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find Path 11, 12, 13
const xml = fs.readFileSync('scripts/after-grid.xml', 'utf8');
const paths = [...xml.matchAll(/<path([^>]+)>/g)].map(m => m[0]);

console.log('Path 11:', paths[11]);
console.log('Path 12:', paths[12]);
console.log('Path 13:', paths[13]);

// Let's create art-index.svg
const artIndexSvg = `<svg width="10" height="175" viewBox="1213 692 10 175" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${paths[11]}
  ${paths[12]}
  ${paths[13]}
</svg>`;

fs.writeFileSync('public/figma-hero/art-index.svg', artIndexSvg);
console.log('Saved art-index.svg');
