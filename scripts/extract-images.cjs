const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

function extractBase64(id) {
  const re = new RegExp(`<image[^>]+id="${id}"[^>]+xlink:href="data:image/png;base64,([^"]+)"`);
  const match = content.match(re);
  if (!match) return null;
  return Buffer.from(match[1], 'base64');
}

['image0_6_3', 'image1_6_3', 'image2_6_3'].forEach(id => {
  const buf = extractBase64(id);
  if (buf) {
    console.log(`Extracted ${id}: bytes=${buf.length}`);
    fs.writeFileSync(`scripts/extracted-${id}.png`, buf);
  }
});
