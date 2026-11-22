const fs = require('fs');

// 1. ground.svg
const groundSvg = `<svg width="1077" height="358" viewBox="140.235 817.16 1076.365 357.15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M140.235 995.733C140.235 897.108 381.189 817.16 678.418 817.16C975.646 817.16 1216.6 897.108 1216.6 995.733C1216.6 1094.36 975.646 1174.31 678.418 1174.31C381.189 1174.31 140.235 1094.36 140.235 995.733Z" fill="#262626"/>
</svg>`;
fs.writeFileSync('public/figma-hero/ground.svg', groundSvg);

// 2. sphere-3d.svg
const sphereSvg = `<svg width="98" height="98" viewBox="1059 461 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sphereFilter" x="1059" y="461" width="98" height="98" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="6" dy="12"/>
      <feGaussianBlur stdDeviation="10"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.439216 0 0 0 0 0.121569 0 0 0 0 0.133333 0 0 0 0.18 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_3"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_3" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-4" dy="-4"/>
      <feGaussianBlur stdDeviation="5"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.176471 0 0 0 0 0 0 0 0 0 0.0313726 0 0 0 0.35 0"/>
      <feBlend mode="normal" in2="shape" result="effect2_innerShadow_6_3"/>
    </filter>
    <radialGradient id="sphereGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1090.4 483.5) rotate(-90) scale(59.503)">
      <stop stop-color="#FFD0C0"/>
      <stop offset="0.12" stop-color="#FA6A6E"/>
      <stop offset="0.39" stop-color="#B51429"/>
      <stop offset="0.73" stop-color="#650B1A"/>
      <stop offset="1" stop-color="#D84650"/>
    </radialGradient>
  </defs>
  <g filter="url(#sphereFilter)">
    <path d="M1102 527C1118.02 527 1131 514.016 1131 498C1131 481.984 1118.02 469 1102 469C1085.98 469 1073 481.984 1073 498C1073 514.016 1085.98 527 1102 527Z" fill="url(#sphereGrad)"/>
  </g>
</svg>`;
fs.writeFileSync('public/figma-hero/sphere-3d.svg', sphereSvg);

// 3. dot-grid.svg
const content = fs.readFileSync('Hero section.svg', 'utf8');
const dotCircles = [...content.matchAll(/<circle[^>]+fill="#8D3436"[^>]*>/g)].map(m => m[0]);
const dotGridSvg = `<svg width="55" height="42" viewBox="1177 611 55 42" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${dotCircles.join('\n  ')}
</svg>`;
fs.writeFileSync('public/figma-hero/dot-grid.svg', dotGridSvg);

console.log('Saved ground.svg, sphere-3d.svg, dot-grid.svg');
