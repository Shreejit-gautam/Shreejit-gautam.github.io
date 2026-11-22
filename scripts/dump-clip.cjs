const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Find all top-level elements inside the clip0_6_3 group
const clipMatch = content.match(/<g clip-path="url\(#clip0_6_3\)">([\s\S]*?)<\/defs>/);
if (!clipMatch) {
  console.log('Clip not matched');
} else {
  console.log('Matched clip, length:', clipMatch[1].length);
  fs.writeFileSync('scripts/clip-inner.xml', clipMatch[1]);
}
