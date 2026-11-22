const fs = require('fs');
const content = fs.readFileSync('Hero section.svg', 'utf8');

console.log('SVG Length:', content.length);

// Let's find patterns, gradients, clips
const patterns = [...content.matchAll(/<pattern[^>]*id="([^"]+)"[\s\S]*?<\/pattern>/g)].map(m => m[1]);
console.log('Patterns:', patterns);

const clipPaths = [...content.matchAll(/<clipPath[^>]*id="([^"]+)"[\s\S]*?<\/clipPath>/g)].map(m => m[1]);
console.log('ClipPaths:', clipPaths);

const linearGradients = [...content.matchAll(/<linearGradient[^>]*id="([^"]+)"[\s\S]*?<\/linearGradient>/g)].map(m => m[1]);
console.log('LinearGradients count:', linearGradients.length);

const radialGradients = [...content.matchAll(/<radialGradient[^>]*id="([^"]+)"[\s\S]*?<\/radialGradient>/g)].map(m => m[1]);
console.log('RadialGradients count:', radialGradients.length);

const images = [...content.matchAll(/<image[^>]*id="([^"]+)"[^>]*width="([^"]+)"[^>]*height="([^"]+)"/g)].map(m => ({ id: m[1], width: m[2], height: m[3] }));
console.log('Images:', images);

// Find elements with opacity, fill colors
const colors = new Set([...content.matchAll(/fill="(#(?:[0-9a-fA-F]{3,8}))"/g)].map(m => m[1]));
console.log('Colors:', [...colors]);
