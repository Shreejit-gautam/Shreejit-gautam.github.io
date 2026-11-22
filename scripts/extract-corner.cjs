const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find path with mask="url(#path-43-inside-1_6_3)"
const arcMatch = content.match(/<path[^>]+mask="url\(#path-43-inside-1_6_3\)"[^>]*>/);
console.log('Arc match:', arcMatch?.[0]);

// Let's create corner-arc.svg
const cornerArcSvg = `<svg width="240" height="170" viewBox="1194 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1199 -1C1199 89.5747 1272.87 163 1364 163C1455.13 163 1529 89.5747 1529 -1" stroke="#C5BCB0" stroke-width="1"/>
</svg>`;
fs.writeFileSync('public/figma-hero/corner-arc.svg', cornerArcSvg);
console.log('Saved corner-arc.svg');
