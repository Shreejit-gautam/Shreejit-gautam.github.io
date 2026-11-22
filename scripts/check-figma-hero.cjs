const fs = require('fs');
const path = require('path');

const dir = 'public/figma-hero';
const files = fs.readdirSync(dir);
files.forEach(f => {
  const filePath = path.join(dir, f);
  const stat = fs.statSync(filePath);
  if (f.endsWith('.svg')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const width = content.match(/width="([^"]+)"/)?.[1];
    const height = content.match(/height="([^"]+)"/)?.[1];
    const viewBox = content.match(/viewBox="([^"]+)"/)?.[1];
    console.log(`${f}: size=${stat.size} w=${width} h=${height} vb=${viewBox}`);
  } else {
    console.log(`${f}: size=${stat.size}`);
  }
});
