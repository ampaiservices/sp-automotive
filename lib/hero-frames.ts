// Update FRAMES if real frames are added with different filenames or count.
export const FRAMES = [
  "/hero-frames/01-wreck.webp",
  "/hero-frames/02-explosion.webp",
  "/hero-frames/03-damaged-panel.webp",
  "/hero-frames/04-painted-panel.webp",
  "/hero-frames/05-reassembly.webp",
  "/hero-frames/06-reveal.webp",
];

export const BEAT_COUNT = 6;
export const FRAMES_PER_BEAT = Math.max(1, Math.floor(FRAMES.length / BEAT_COUNT));
