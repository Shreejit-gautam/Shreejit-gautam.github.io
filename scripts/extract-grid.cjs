const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// The grid group is <g clip-path="url(#clip1_6_3)"> ... </g>
const gridMatch = content.match(/<g clip-path="url\(#clip1_6_3\)">([\s\S]*?)<\/g>/);

// The linear gradients for the grid are paint0 to paint18
const defs = [];
for (let i = 0; i <= 18; i++) {
  const g = content.match(new RegExp(`<linearGradient id="paint${i}_linear_6_3"[\\s\\S]*?<\\/linearGradient>`));
  if (g) defs.push(g[0]);
}

const gridSvg = `<svg width="1434" height="900" viewBox="0 0 1434 900" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    ${defs.join('\n    ')}
  </defs>
  <g opacity="0.6">
    ${gridMatch[1].trim()}
  </g>
</svg>`;

fs.writeFileSync('public/figma-hero/hero-grid.svg', gridSvg);
console.log('Saved hero-grid.svg');
