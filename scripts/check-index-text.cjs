const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find all paths with y between 690 and 870 and x between 1210 and 1225
const paths = [...content.matchAll(/<path([^>]+)>/g)].map(m => m[1]);
paths.forEach((p, idx) => {
  if (p.includes('1215') || p.includes('1217') || p.includes('1220')) {
    console.log(`Path ${idx}:`, p.slice(0, 150));
  }
});
