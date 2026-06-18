/* Publications list; the site owner's name is auto-bolded among authors. */

import { $, esc } from "../lib/dom.js";
import { svg, linkIcon } from "../lib/icons.js";

export function renderPublications(pubs = [], ownerName = "") {
  $("#pubList").innerHTML = pubs.map((pub) => {
    const authors = (pub.authors ?? [])
      .map((a) => (a === ownerName ? `<b>${esc(a)}</b>` : esc(a)))
      .join(", ");
    const links = (pub.links ?? [])
      .map((l) => `<a class="link-chip" href="${esc(l.url)}" target="_blank" rel="noopener">${svg(linkIcon(l.icon), 16)}${esc(l.label)}</a>`)
      .join("");
    return `
      <article class="pub reveal-item">
        ${pub.status ? `<span class="pub__status">${svg("wave", 14)}${esc(pub.status)}</span>` : ""}
        <h3 class="pub__title">${esc(pub.title)}</h3>
        <p class="pub__authors">${authors}</p>
        <p class="pub__venue">${esc(pub.venue)}${pub.affiliation ? ` · ${esc(pub.affiliation)}` : ""}</p>
        ${pub.abstract ? `<p class="pub__abstract">${esc(pub.abstract)}</p>` : ""}
        ${links ? `<div class="pub__links">${links}</div>` : ""}
      </article>`;
  }).join("");
}
