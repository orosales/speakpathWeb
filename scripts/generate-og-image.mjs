// Renders public/og-image.png (1200x630) for Open Graph / Twitter cards.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const WIDTH = 1200;
const HEIGHT = 630;
const MASCOT_SIZE = 560;

const background = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="violet" cx="0.12" cy="0.1" r="0.6">
      <stop offset="0" stop-color="#8b00ff" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#8b00ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="blue" cx="0.85" cy="0.9" r="0.6">
      <stop offset="0" stop-color="#4f73ff" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#4f73ff" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c56bff"/>
      <stop offset="0.55" stop-color="#6f8cff"/>
      <stop offset="1" stop-color="#3ee8d2"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#010e24"/>
  <rect width="100%" height="100%" fill="url(#violet)"/>
  <rect width="100%" height="100%" fill="url(#blue)"/>

  <g font-family="Plus Jakarta Sans, Manrope, Ubuntu, DejaVu Sans, sans-serif">
    <text x="72" y="118" font-size="40" font-weight="800" fill="#b47cff">SpeakPath</text>
    <text x="72" y="250" font-size="68" font-weight="800" fill="#dbe6ff">Practice real</text>
    <text x="72" y="330" font-size="68" font-weight="800" fill="url(#accent)">conversations</text>
    <text x="72" y="410" font-size="68" font-weight="800" fill="#dbe6ff">with AI.</text>
    <text x="72" y="480" font-size="28" font-weight="500" fill="#9eabc8">English · Spanish · French · German</text>
    <text x="72" y="560" font-size="26" font-weight="700" fill="#3ee8d2">speakpath.dev</text>
  </g>
</svg>`;

const mascot = await sharp(path.join(root, 'public/mascot-network-transparent.png'))
  .resize(MASCOT_SIZE, MASCOT_SIZE, { fit: 'inside' })
  .toBuffer();
const { height: mascotHeight = MASCOT_SIZE } = await sharp(mascot).metadata();

await sharp(Buffer.from(background))
  .composite([{ input: mascot, left: WIDTH - MASCOT_SIZE - 20, top: Math.round((HEIGHT - mascotHeight) / 2) }])
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, 'public/og-image.png'));

console.log('Wrote public/og-image.png');
