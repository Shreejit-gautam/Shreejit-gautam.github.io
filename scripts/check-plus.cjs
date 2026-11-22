const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find elements with minX ~ 1192 or y ~ 296 or y ~ 335
const matches = [...content.matchAll(/<path[^>]+d="[^"]*119[0-9][^"]*"[^>]*>/g)].map(m => m[0]);
console.log('Matches:', matches);

// Let's print all paths near x: 1150-1250, y: 280-360
const paths = [...content.matchAll(/<path([^>]+)>/g)].map(m => m[1]);
paths.forEach((p, idx) => {
  if (p.includes('1192') || p.includes('1199') || p.includes('1200') || p.includes('1203')) {
    console.log(`Path near 1200 (${idx}):`, p);
  }
});
