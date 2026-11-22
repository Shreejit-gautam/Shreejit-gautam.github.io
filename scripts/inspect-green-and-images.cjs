const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Let's inspect rect elements
const rects = [...content.matchAll(/<rect[^>]+>/g)].map(m => m[0]);
rects.forEach((r, idx) => {
  if (r.includes('pattern') || r.includes('#C6F567') || r.includes('#A6F507') || idx > 20) {
    console.log(`Rect ${idx}:`, r);
  }
});

// Let's inspect images in defs
const images = [...content.matchAll(/<image[^>]+id="([^"]+)"[^>]+width="([^"]+)"[^>]+height="([^"]+)"/g)];
images.forEach(img => console.log('Image:', img[1], img[2], img[3]));

// Let's check the lime green under the Explore button
// Find all occurrences of #C6F567 or #A6F507
const greenOccurrences = [...content.matchAll(/<[^>]+(?:#C6F567|#A6F507)[^>]*>/g)].map(m => m[0]);
console.log('Green occurrences:', greenOccurrences);
