const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Let's parse all elements inside the main clip <g clip-path="url(#clip0_6_3)">
// We want to know every direct child or group, its bounding box, coordinates, text, paths
// Let's create an HTML file that renders each group isolated or with labels so we can inspect them!
console.log('SVG viewBox:', content.match(/viewBox="([^"]+)"/)?.[1]);
console.log('SVG width/height:', content.match(/width="([^"]+)" height="([^"]+)"/)?.[0]);

// Let's find all path elements and calculate their approximate bounding boxes from their d attributes!
function getBBoxFromPath(d) {
  const nums = d.match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g);
  if (!nums || nums.length < 2) return null;
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  // This is a rough estimate from all coordinates in d
  // Commands in path like M, L, C, etc.
  // Let's parse commands
  const commands = d.match(/[a-df-z][^a-df-z]*/gi);
  let curX = 0, curY = 0;
  if (!commands) return null;
  for (const cmdStr of commands) {
    const cmd = cmdStr[0];
    const args = cmdStr.slice(1).trim().match(/[-+]?[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/g)?.map(Number) || [];
    const isRel = cmd === cmd.toLowerCase();
    const type = cmd.toUpperCase();
    if (type === 'M' || type === 'L' || type === 'T') {
      for (let i = 0; i < args.length; i += 2) {
        curX = isRel ? curX + args[i] : args[i];
        curY = isRel ? curY + args[i+1] : args[i+1];
        minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
        minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
      }
    } else if (type === 'H') {
      for (const val of args) {
        curX = isRel ? curX + val : val;
        minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
      }
    } else if (type === 'V') {
      for (const val of args) {
        curY = isRel ? curY + val : val;
        minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
      }
    } else if (type === 'C') {
      for (let i = 0; i < args.length; i += 6) {
        const x = isRel ? curX + args[i+4] : args[i+4];
        const y = isRel ? curY + args[i+5] : args[i+5];
        curX = x; curY = y;
        minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
        minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
      }
    } else if (type === 'S' || type === 'Q') {
      for (let i = 0; i < args.length; i += 4) {
        const x = isRel ? curX + args[i+2] : args[i+2];
        const y = isRel ? curY + args[i+3] : args[i+3];
        curX = x; curY = y;
        minX = Math.min(minX, curX); maxX = Math.max(maxX, curX);
        minY = Math.min(minY, curY); maxY = Math.max(maxY, curY);
      }
    }
  }
  return { minX: Math.round(minX), maxX: Math.round(maxX), minY: Math.round(minY), maxY: Math.round(maxY), w: Math.round(maxX - minX), h: Math.round(maxY - minY) };
}

// Let's test on paths in after-grid
const xml = fs.readFileSync('scripts/after-grid.xml', 'utf8');
const paths = [...xml.matchAll(/<path([^>]+)>/g)];
console.log('Total paths in after-grid:', paths.length);
paths.forEach((p, idx) => {
  const attrs = p[1];
  const fill = attrs.match(/fill="([^"]+)"/)?.[1] || '';
  const stroke = attrs.match(/stroke="([^"]+)"/)?.[1] || '';
  const d = attrs.match(/d="([^"]+)"/)?.[1] || '';
  const bbox = getBBoxFromPath(d);
  if (bbox && (bbox.w > 5 || bbox.h > 5)) {
    console.log(`Path ${idx}: fill=${fill} stroke=${stroke} bbox=${JSON.stringify(bbox)}`);
  }
});
