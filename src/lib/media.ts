/**
 * Maps a video URL to its pre-generated poster image (a real frame extracted
 * from the video at build time). Posters live in /public/videos/posters/ and
 * are keyed by the video's base filename.
 *
 *   "/videos/V01.MP4" -> "/videos/posters/V01.jpg"
 *
 * Using a static poster image (instead of loading a <video> tag for the
 * preview) means zero video decoding and zero connection saturation when
 * many thumbnails are on screen — the gallery stays perfectly fluid.
 */
export function posterFor(videoSrc: string): string {
  const file = videoSrc.split("/").pop() ?? "";
  const base = file.replace(/\.[^.]+$/, "");
  return `/videos/posters/${base}.jpg`;
}
