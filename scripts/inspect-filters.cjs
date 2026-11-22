const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find any filters or elements around y: 650-730
const filters = [...content.matchAll(/<filter[^>]+id="([^"]+)"[\s\S]*?<\/filter>/g)];
filters.forEach(f => {
  console.log('Filter:', f[1], f[0]);
});

// Find elements with filter="url(#...)"
const filteredElems = [...content.matchAll(/<[^>]+filter="url\(#([^)]+)\)"[^>]*>/g)];
console.log('Filtered elements:', filteredElems.map(m => m[0]));
