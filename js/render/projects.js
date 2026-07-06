/* Project cards grid, tag filters, and modal hookup.
   Photos live in assets/photos/<id>/ — discovered at load time (see lib/photos.js). */

import { $, $$, esc, onActivate, wireFilterPills } from "../lib/dom.js";
import { svg } from "../lib/icons.js";
import { tagsHTML } from "../lib/markup.js";
import { openProject } from "../ui/modal.js";
import { wireCardMedia } from "../lib/photos.js";

export function renderProjects(projects = []) {
  const grid = $("#projectGrid");
  const byId = new Map(projects.map((p) => [p.id, p]));

  grid.innerHTML = projects.map((p, i) => {
    const metrics = (p.metrics ?? []).slice(0, 3)
      .map((m) => `<div class="pc-metric"><span class="m-val">${esc(m.value)}</span><span class="m-lab">${esc(m.label)}</span></div>`)
      .join("");
    return `
      <article class="project-card reveal-item${p.featured ? " is-featured" : ""}"
        data-id="${esc(p.id)}" data-categories="${esc((p.categories ?? []).join("|"))}"
        tabindex="0" role="button" aria-label="Open details for ${esc(p.title)}" style="--i:${i}">
        <div class="pc-top"><span class="pc-icon">${svg(p.icon, 24)}</span><span class="pc-date">${esc(p.date)}</span></div>
        <h3 class="pc-title">${esc(p.title)}</h3>
        <p class="pc-sub">${esc(p.subtitle ?? "")}</p>
        <p class="pc-blurb">${esc(p.blurb)}</p>
        ${metrics ? `<div class="pc-metrics">${metrics}</div>` : ""}
        <div class="pc-foot">
          <div class="tags">${tagsHTML((p.tags ?? []).slice(0, 4))}</div>
          <span class="pc-more">Details ${svg("arrow", 14)}</span>
        </div>
      </article>`;
  }).join("");

  $$(".project-card", grid).forEach((card) => {
    const p = byId.get(card.dataset.id);
    onActivate(card, () => openProject(p));
    wireCardMedia(card, p);   // cover on the card + carousel photos for the modal
  });

  buildProjectFilters(projects);
}

function buildProjectFilters(projects) {
  // Filters use broad `categories` (a short, scannable row); the granular
  // per-project `tags` still appear as chips on each card and in the modal.
  const counts = new Map();
  projects.forEach((p) => (p.categories ?? []).forEach((c) => counts.set(c, (counts.get(c) ?? 0) + 1)));
  const cats = [...counts.keys()].sort((a, b) => counts.get(b) - counts.get(a) || a.localeCompare(b));

  const wrap = $("#projectFilters");
  wrap.innerHTML =
    '<button class="filter is-active" data-cat="all">All</button>' +
    cats.map((c) => `<button class="filter" data-cat="${esc(c)}">${esc(c)}</button>`).join("");

  wireFilterPills($$(".filter", wrap), (btn) => {
    const cat = btn.dataset.cat;
    $$("#projectGrid .project-card").forEach((card) => {
      const cardCats = (card.dataset.categories ?? "").split("|");
      card.style.display = cat === "all" || cardCats.includes(cat) ? "" : "none";
    });
  });
}
