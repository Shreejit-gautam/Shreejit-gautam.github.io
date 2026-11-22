const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');
const defsIndex = content.indexOf('<defs>');
const elementsPart = content.slice(0, defsIndex);

// Let's write a simple XML tree or regex parser to inspect all child nodes
// Let's find all top-level groups or direct tags
const gMatches = [...elementsPart.matchAll(/<g[\s\S]*?<\/g>/g)];
console.log('Total <g> matches at root level?');

// Let's inspect the hierarchy
const rootMatches = [...elementsPart.matchAll(/<(g|path|rect|circle|ellipse)([\s\S]*?)>/g)];
console.log('Total tags:', rootMatches.length);

// Let's inspect all non-grid elements (anything after the grid rects)
const afterGrid = elementsPart.slice(elementsPart.lastIndexOf('rect x="1429.19"'));
console.log('After grid length:', afterGrid.length);

fs.writeFileSync('scripts/after-grid.xml', afterGrid);
console.log('Wrote after-grid.xml');
