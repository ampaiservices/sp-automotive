// Manifest for the hero scroll-scrub frame sequence.
// 377 frames extracted at 10fps from the cinematic video, served as WebP for canvas rendering.
const FRAME_COUNT_SEQ = 377;
export const FRAMES = Array.from({ length: FRAME_COUNT_SEQ }, (_, i) =>
  `/hero-clips/frames/frame_${String(i + 1).padStart(4, "0")}.webp`
);

export const BEAT_COUNT = 6;
export const FRAMES_PER_BEAT = Math.max(1, Math.floor(FRAMES.length / BEAT_COUNT));
