const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

// Let's find the ellipses and orbit paths
const ellipses = [...content.matchAll(/<ellipse[^>]+>/g)].map(m => m[0]);
console.log('Ellipses:', ellipses);

// Let's find circles
const circles = [...content.matchAll(/<circle[^>]+>/g)].map(m => m[0]);
console.log('Total circles:', circles.length);
circles.forEach((c, idx) => {
  if (idx < 5 || idx > circles.length - 5) console.log(`Circle ${idx}:`, c);
});

// Let's find radialGradient (sphere)
const radGradients = [...content.matchAll(/<radialGradient[\s\S]*?<\/radialGradient>/g)].map(m => m[0]);
console.log('Radial gradients:', radGradients);

// Let's find linearGradients paint19 and paint20
['paint19', 'paint20', 'paint0', 'paint1', 'paint21'].forEach(id => {
  const g = content.match(new RegExp(`<linearGradient[^>]+id="${id}[^"]*"[\\s\\S]*?<\\/linearGradient>`));
  if (g) console.log(`Gradient ${id}:`, g[0]);
});
