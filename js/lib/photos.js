/* Folder-based card photos: drop numbered photos (1.jpg, 2.jpg, …) into a card's folder and
   they're discovered at load time; an optional `cover.*` is shown on the card. Works on any
   static host — discovery probes by image load, so no directory listing or build step needed. */

import { esc } from "./dom.js";

export const GALLERY_ICON =
  '<svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="3" width="13" height="13" rx="2"/><path d="M8 21h11a2 2 0 0 0 2-2V8"/></svg>';

const PHOTO_EXTS = ["jpg", "jpeg", "png", "webp", "svg"];
const MAX_PHOTOS = 40;

/** Resolve to true if a file exists at `url` — uses a HEAD request so large photos
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
  for (const ext of PHOTO_EXTS) {
    if (await probe(`${base}.${ext}`)) return `${base}.${ext}`;
  }
  return null;
}

/** Discover a card's photos by probing `<dir>/cover.*` then `<dir>/1.*`, `2.*`, … until a gap.
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

/** Cover-banner markup for a card. opts.tag: "button" (an interactive trigger, Beyond) or
    "div" (a static banner, Projects). `count` drives the photo-count badge. */
export function coverHTML(coverSrc, count, { tag = "div", alt = "", label = "" } = {}) {
  if (!coverSrc) return "";
  const badge = count > 1
    ? `<span class="card-cover__count" aria-hidden="true">${GALLERY_ICON}${count}</span>`
    : "";
  const inner = `<img class="card-cover__img" src="${esc(coverSrc)}" alt="${esc(alt)}" loading="lazy">${badge}`;
  return tag === "button"
    ? `<button class="card-cover" type="button"${label ? ` aria-label="${esc(label)}"` : ""}>${inner}</button>`
    : `<div class="card-cover" aria-hidden="true">${inner}</div>`;
}
