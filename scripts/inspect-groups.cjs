const fs = require('fs');
const xml = fs.readFileSync('scripts/after-grid.xml', 'utf8');

// Let's print tags from 50 to the end
const tags = [...xml.matchAll(/<([a-zA-Z0-9]+)([^>]*?)(\/?>)/g)];

const summary = [];
tags.forEach((t, i) => {
  const type = t[1];
  const attrs = t[2];
  const id = attrs.match(/id="([^"]+)"/)?.[1] || '';
  const fill = attrs.match(/fill="([^"]+)"/)?.[1] || '';
  const stroke = attrs.match(/stroke="([^"]+)"/)?.[1] || '';
  const transform = attrs.match(/transform="([^"]+)"/)?.[1] || '';
  const dLen = attrs.match(/d="([^"]+)"/)?.[1]?.length || 0;
  const isClose = t[3] === '/>';
  const width = attrs.match(/width="([^"]+)"/)?.[1] || '';
  const height = attrs.match(/height="([^"]+)"/)?.[1] || '';
  const x = attrs.match(/x="([^"]+)"/)?.[1] || '';
  const y = attrs.match(/y="([^"]+)"/)?.[1] || '';
  summary.push({ i, type, id, fill, stroke, transform, dLen, width, height, x, y, isClose });
});

console.log(JSON.stringify(summary.slice(50), null, 2));
