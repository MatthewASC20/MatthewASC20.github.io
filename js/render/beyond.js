/* "Beyond the Lab" — non-academic cards (events, activities).
   Photos live in assets/photos/<id>/ — discovered at load time (see lib/photos.js).
   The cover (cover.* or 1.*) shows on the card; clicking the card opens a detail modal
   with the photo carousel + full info. */

import { $, $$, esc, onActivate } from "../lib/dom.js";
import { tagsHTML } from "../lib/markup.js";
import { openBeyond } from "../ui/modal.js";
import { wireCardMedia } from "../lib/photos.js";

export function renderBeyond(items = []) {
  const grid = $("#beyondGrid");
  if (!grid) return;

  grid.innerHTML = items.map((it, i) => {
    const meta = [
      it.kind ? `<span class="beyond-card__kind">${esc(it.kind)}</span>` : "",
      it.role ? `<span class="beyond-card__role">${esc(it.role)}</span>` : "",
      it.date ? `<span class="beyond-card__date">${esc(it.date)}</span>` : "",
    ].join("");
    const tags = tagsHTML(it.tags);

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
    onActivate(card, () => openBeyond(it));
    wireCardMedia(card, it);   // cover on the card + carousel photos for the modal
  });
}
