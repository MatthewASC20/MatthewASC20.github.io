/* Fullscreen media viewer / gallery (images and videos).
   - Single image: any [data-lightbox] element (e.g. the hero portrait).
   - Gallery: call openLightbox(items, startIndex) — shows ‹ › arrows + a counter,
     navigable with the arrows or the ← / → keys.
   Close via backdrop / × / Esc. Mirrors the project modal's open/close pattern. */

import { $ } from "../lib/dom.js";
import { mediaEl } from "../lib/photos.js";

let box, mediaWrap, counterEl;
let gallery = [];
let index = 0;
let alt = "";
let lastFocused = null;

export function initLightbox() {
  box = $("#heroLightbox");
  if (!box) return;
  mediaWrap = $("#lightboxMedia");
  counterEl = $("#lightboxCounter");

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-lightbox]");
    if (trigger) { e.preventDefault(); openFromTrigger(trigger); return; }
    if (e.target.closest("[data-lightbox-prev]")) { e.preventDefault(); step(-1); return; }
    if (e.target.closest("[data-lightbox-next]")) { e.preventDefault(); step(1); return; }
    if (e.target.closest("[data-lightbox-close]")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });
}

/** Open one or more media items full-size. items: array of src strings (images or videos). */
export function openLightbox(items, startIndex = 0, altText = "", trigger = null) {
  gallery = (items ?? []).filter(Boolean);
  if (!gallery.length || !box) return;
  alt = altText;
  lastFocused = trigger ?? document.activeElement;
  box.classList.add("is-open");
  box.classList.toggle("is-gallery", gallery.length > 1);
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  show(startIndex);
  $(".lightbox__close", box).focus();
}

function openFromTrigger(trigger) {
  const innerImg = trigger.querySelector("img");
  const src = trigger.getAttribute("data-lightbox") || innerImg?.getAttribute("src");
  openLightbox(src ? [src] : [], 0, innerImg?.getAttribute("alt") ?? "", trigger);
}

function show(i) {
  index = ((i % gallery.length) + gallery.length) % gallery.length;
  if (mediaWrap) mediaWrap.innerHTML = mediaEl(gallery[index], { className: "lightbox__media-el", alt, fullscreen: true });
  if (counterEl) counterEl.textContent = gallery.length > 1 ? `${index + 1} / ${gallery.length}` : "";
}

function step(delta) {
  if (gallery.length > 1) show(index + delta);
}

function close() {
  box.classList.remove("is-open", "is-gallery");
  box.setAttribute("aria-hidden", "true");
  // keep scroll locked if a project/Beyond modal is still open behind the viewer
  document.body.style.overflow = $("#projectModal")?.classList.contains("is-open") ? "hidden" : "";
  if (mediaWrap) mediaWrap.innerHTML = "";   // also stops any playing video
  gallery = [];
  lastFocused?.focus?.();
}
