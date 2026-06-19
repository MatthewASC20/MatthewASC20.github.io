/* Folder-based card media: drop numbered files (1.jpg, 2.mp4, …) into a card's folder and
   they're discovered at load time; an optional `cover.*` is shown on the card. Both images
   and short videos (mp4/webm) are supported. Works on any static host — discovery probes by
   HEAD request, so no directory listing or build step needed. */

import { esc } from "./dom.js";

export const GALLERY_ICON =
  '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="13" height="13" rx="2"/><path d="M8 21h11a2 2 0 0 0 2-2V8"/></svg>';

const IMG_EXTS = ["jpg", "jpeg", "png", "webp", "svg", "gif"];
const VIDEO_EXTS = ["mp4", "webm"];
const PROBE_EXTS = [...IMG_EXTS, ...VIDEO_EXTS];
const MAX_PHOTOS = 40;

export const isVideo = (src) =>
  VIDEO_EXTS.includes((src || "").split("?")[0].split(".").pop().toLowerCase());

/** Resolve to true if a file exists at `url` — uses a HEAD request so large media
    aren't downloaded just to detect them. */
async function probe(url) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

/** First existing `<base>.<ext>` across the supported extensions, or null. */
async function firstExisting(base) {
  for (const ext of PROBE_EXTS) {
    if (await probe(`${base}.${ext}`)) return `${base}.${ext}`;
  }
  return null;
}

/** Discover a card's media by probing `<dir>/cover.*` then `<dir>/1.*`, `2.*`, … until a gap.
    Returns an ordered list of src strings — the cover (if any) is first. */
export async function discoverPhotos(dir) {
  if (!dir) return [];
  const base = dir.replace(/\/?$/, "/");
  const cover = await firstExisting(`${base}cover`);
  const numbered = [];
  for (let i = 1; i <= MAX_PHOTOS; i++) {
    const found = await firstExisting(`${base}${i}`);
    if (!found) break;
    numbered.push(found);
  }
  return cover ? [cover, ...numbered] : numbered;
}

/** Build an <img>, or an autoplaying muted <video> for video sources.
    fullscreen=true → full preload + playback controls (used in the lightbox). */
export function mediaEl(src, { className = "", alt = "", fullscreen = false } = {}) {
  if (isVideo(src)) {
    return `<video class="${className}" src="${esc(src)}" muted loop autoplay playsinline ` +
      `preload="${fullscreen ? "auto" : "metadata"}"${fullscreen ? " controls" : ""}></video>`;
  }
  return `<img class="${className}" src="${esc(src)}" alt="${esc(alt)}"${fullscreen ? "" : ' loading="lazy"'}>`;
}

/** Cover-banner markup for a card. opts.tag: "button" (an interactive trigger, Beyond) or
    "div" (a static banner, Projects). `count` drives the media-count badge. */
export function coverHTML(coverSrc, count, { tag = "div", alt = "", label = "" } = {}) {
  if (!coverSrc) return "";
  const badge = count > 1
    ? `<span class="card-cover__count" aria-hidden="true">${GALLERY_ICON}${count}</span>`
    : "";
  const inner = `${mediaEl(coverSrc, { className: "card-cover__img", alt })}${badge}`;
  return tag === "button"
    ? `<button class="card-cover" type="button"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</button>`
    : `<div class="card-cover" aria-hidden="true">${inner}</div>`;
}
