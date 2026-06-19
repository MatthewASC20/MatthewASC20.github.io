/* Detail modal for cards. Projects and "Beyond the Lab" items both open here: a photo
   carousel at the top (when the card has photos) followed by the card's details.
   Close via backdrop / × / Esc; browse photos with the ‹ › arrows or the ← / → keys. */

import { $, esc } from "../lib/dom.js";
import { svg, linkIcon } from "../lib/icons.js";
import { openLightbox } from "./lightbox.js";
import { mediaEl } from "../lib/photos.js";

let lastFocused = null;
let photos = [];
let index = 0;

function carouselMarkup(list) {
  if (!list.length) return "";
  const multi = list.length > 1;
  return `
    <div class="modal__carousel">
      <div class="modal__carousel-stage">
        <div class="modal__carousel-media"></div>
        ${multi ? `
        <button class="modal__carousel-nav prev" type="button" aria-label="Previous photo">&#8249;</button>
        <button class="modal__carousel-nav next" type="button" aria-label="Next photo">&#8250;</button>
        <div class="modal__carousel-counter" aria-live="polite"></div>` : ""}
      </div>
    </div>`;
}

function renderPhoto() {
  const root = $("#modalContent .modal__carousel");
  if (!root || !photos.length) return;
  const media = $(".modal__carousel-media", root);
  if (media) media.innerHTML = mediaEl(photos[index], { className: "modal__carousel-item" });
  const counter = $(".modal__carousel-counter", root);
  if (counter) counter.textContent = `${index + 1} / ${photos.length}`;
}

function step(delta) {
  if (photos.length > 1) {
    index = (index + delta + photos.length) % photos.length;
    renderPhoto();
  }
}

/** Open the modal with a carousel (from photoSrcs) plus arbitrary detail markup. */
function openModal(contentHTML, photoSrcs) {
  photos = photoSrcs ?? [];
  index = 0;
  $("#modalContent").innerHTML = `${carouselMarkup(photos)}${contentHTML}`;
  renderPhoto();

  const modal = $("#projectModal");
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $(".modal__close", modal).focus();
}

const linksMarkup = (links = []) =>
  links.map((l) => {
    const blank = /^https?:/.test(l.url) ? ' target="_blank" rel="noopener"' : "";
    return `<a class="link-chip" href="${esc(l.url)}"${blank}>${svg(linkIcon(l.icon), 16)}${esc(l.label)}</a>`;
  }).join("");

export function openProject(p) {
  if (!p) return;
  const metrics = (p.metrics ?? [])
    .map((m) => `<div><span class="m-val">${esc(m.value)}</span><br><span class="m-lab">${esc(m.label)}</span></div>`)
    .join("");
  const desc = (p.description ?? []).map((para) => `<p>${esc(para)}</p>`).join("");
  const highlights = (p.highlights ?? []).map((h) => `<li>${esc(h)}</li>`).join("");
  const tags = (p.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const links = linksMarkup(p.links);

  const content = `
    <span class="modal__icon">${svg(p.icon, 28)}</span>
    <p class="modal__sub">${esc(p.subtitle ?? "")} · ${esc(p.date)}</p>
    <h3 class="modal__title" id="modalTitle">${esc(p.title)}</h3>
    ${metrics ? `<div class="modal__metrics">${metrics}</div>` : ""}
    ${desc}
    ${highlights ? `<h4>Highlights</h4><ul class="modal__highlights">${highlights}</ul>` : ""}
    ${tags ? `<h4>Stack</h4><div class="tags">${tags}</div>` : ""}
    ${links ? `<div class="modal__links">${links}</div>` : ""}`;
  openModal(content, p.photos ?? []);
}

export function openBeyond(it) {
  if (!it) return;
  const sub = esc([it.kind, it.role, it.org, it.date].filter(Boolean).join(" · "));
  const paras = it.description?.length ? it.description : (it.blurb ? [it.blurb] : []);
  const desc = paras.map((para) => `<p>${esc(para)}</p>`).join("");
  const tags = (it.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
  const links = linksMarkup(it.links);

  const content = `
    ${sub ? `<p class="modal__sub">${sub}</p>` : ""}
    <h3 class="modal__title" id="modalTitle">${esc(it.title ?? "")}</h3>
    ${desc}
    ${tags ? `<h4>Tags</h4><div class="tags">${tags}</div>` : ""}
    ${links ? `<div class="modal__links">${links}</div>` : ""}`;
  openModal(content, it.photos ?? []);
}

export function closeProject() {
  const modal = $("#projectModal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  photos = [];
  lastFocused?.focus?.();
}

export function initModal() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { closeProject(); return; }
    const nav = e.target.closest(".modal__carousel-nav");
    if (nav) { step(nav.classList.contains("prev") ? -1 : 1); return; }
    // click a photo → open it in the fullscreen, max-size carousel at the same index
    if (e.target.closest(".modal__carousel-media") && photos.length) openLightbox(photos, index, "");
  });
  document.addEventListener("keydown", (e) => {
    if (!$("#projectModal").classList.contains("is-open")) return;
    if ($("#heroLightbox")?.classList.contains("is-open")) return; // fullscreen viewer handles its own keys
    if (e.key === "Escape") closeProject();
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
  });
}
