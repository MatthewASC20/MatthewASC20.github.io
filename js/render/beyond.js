/* "Beyond the Lab" — non-academic cards (events, activities).
   Photos live in assets/photos/<id>/ — discovered at load time (see lib/photos.js).
   The cover (cover.* or 1.*) shows on the card; clicking the card opens a detail modal
   with the photo carousel + full info. */

import { $, $$, esc } from "../lib/dom.js";
import { openBeyond } from "../ui/modal.js";
import { discoverPhotos, coverHTML } from "../lib/photos.js";

const photoDir = (id) => `assets/photos/${id}/`;

export function renderBeyond(items = []) {
  const grid = $("#beyondGrid");
  if (!grid) return;

  grid.innerHTML = items.map((it, i) => {
    const meta = [
      it.kind ? `<span class="beyond-card__kind">${esc(it.kind)}</span>` : "",
      it.role ? `<span class="beyond-card__role">${esc(it.role)}</span>` : "",
      it.date ? `<span class="beyond-card__date">${esc(it.date)}</span>` : "",
    ].join("");
    const tags = (it.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");

    return `
      <article class="beyond-card reveal-item" data-id="${esc(it.id ?? "")}"
        tabindex="0" role="button" aria-label="More about ${esc(it.title ?? "")}" style="--i:${i}">
        <div class="beyond-card__body">
          ${meta ? `<div class="beyond-card__meta">${meta}</div>` : ""}
          <h3 class="beyond-card__title">${esc(it.title ?? "")}</h3>
          ${it.blurb ? `<p class="beyond-card__blurb">${esc(it.blurb)}</p>` : ""}
          ${tags ? `<div class="tags">${tags}</div>` : ""}
        </div>
      </article>`;
  }).join("");

  $$(".beyond-card", grid).forEach((card, idx) => {
    const it = items[idx];
    const open = () => openBeyond(it);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    // Discover photos in this item's folder → cover on the card + carousel in the modal.
    if (!it.id) return;
    discoverPhotos(photoDir(it.id)).then((photos) => {
      it.photos = photos;                      // consumed by the modal carousel
      if (!photos.length) return;
      card.insertAdjacentHTML("afterbegin", coverHTML(photos[0], photos.length, { tag: "div", alt: it.title }));
      const img = card.querySelector(".card-cover__img");
      if (img) img.addEventListener("error", () => img.remove());
    });
  });
}
