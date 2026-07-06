/* Small shared HTML builders used by several render modules. */

import { esc } from "./dom.js";
import { svg, linkIcon } from "./icons.js";

/** `.tag` chips from a list of strings. */
export const tagsHTML = (tags = []) =>
  tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("");

/** One `.link-chip` anchor. `blank` defaults to new-tab for external (http/https) URLs. */
export const linkChip = (href, icon, label, { blank = /^https?:/.test(href), size = 16 } = {}) =>
  `<a class="link-chip" href="${esc(href)}"${blank ? ' target="_blank" rel="noopener"' : ""}>${svg(linkIcon(icon), size)}${esc(label)}</a>`;

/** `.link-chip`s from a data-file links array: [{ url, icon, label }]. */
export const linkChips = (links = [], opts) =>
  links.map((l) => linkChip(l.url, l.icon, l.label, opts)).join("");
