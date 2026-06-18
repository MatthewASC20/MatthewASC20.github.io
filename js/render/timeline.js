/* Experience/education timeline with type filters. */

import { $, $$, esc } from "../lib/dom.js";

export function renderTimeline(items = []) {
  $("#timelineList").innerHTML = items.map((it, i) => {
    const highlights = (it.highlights ?? []).map((h) => `<li>${esc(h)}</li>`).join("");
    const tags = (it.tags ?? []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const type = it.type ?? "experience";
    const logo = it.logo ?? "";
    // Optional per-logo sizing from the data file: "logoHeight" (px) and, for wide
    // wordmarks, "logoMaxW" (px). Both fall back to the CSS defaults when omitted.
    const logoStyle = [
      it.logoHeight ? `--tl-logo-h:${Number(it.logoHeight)}px` : "",
      it.logoMaxW ? `--tl-logo-maxw:${Number(it.logoMaxW)}px` : "",
    ].filter(Boolean).join(";");
    return `
      <li class="tl-item reveal-item" data-type="${esc(type)}" style="--i:${i}">
        <div class="tl-card">
          ${logo ? `<img class="tl-logo" src="${esc(logo)}" alt="${esc(it.org)} logo" loading="lazy"${logoStyle ? ` style="${logoStyle}"` : ""}>` : ""}
          <div class="tl-meta">
            <span class="tl-date">${esc(it.start)} — ${esc(it.end)}</span>
            <span class="tl-type">${esc(type)}</span>
          </div>
          <h3 class="tl-role">${esc(it.role)}</h3>
          <div><span class="tl-org">${esc(it.org)}</span>${it.location ? ` <span class="tl-loc">· ${esc(it.location)}</span>` : ""}</div>
          ${it.summary ? `<p class="tl-summary">${esc(it.summary)}</p>` : ""}
          ${highlights ? `<ul class="tl-highlights">${highlights}</ul>` : ""}
          ${tags ? `<div class="tags">${tags}</div>` : ""}
        </div>
      </li>`;
  }).join("");

  // Drop any logo that fails to load so no broken-image icon is left behind.
  $$(".tl-logo", $("#timelineList")).forEach((img) =>
    img.addEventListener("error", () => img.remove()));

  initTimelineFilter();
}

function initTimelineFilter() {
  const filters = $$("#timelineFilters .filter");
  filters.forEach((btn) => {
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$("#timelineList .tl-item").forEach((item) => {
        item.style.display = f === "all" || item.dataset.type === f ? "" : "none";
      });
    });
  });
}
