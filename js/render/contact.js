/* Contact section: lead line + link chips. */

import { $, esc } from "../lib/dom.js";
import { svg } from "../lib/icons.js";

export function renderContact({ profile = {} }) {
  const links = profile.links ?? {};
  $("#contactLead").textContent = profile.available
    ? `${profile.available}. The fastest way to reach me is email — let's talk.`
    : "Let's talk.";

  const chip = (href, icon, label, blank = true) =>
    `<a class="link-chip" href="${esc(href)}"${blank ? ' target="_blank" rel="noopener"' : ""}>${svg(icon, 18)}${esc(label)}</a>`;

  $("#contactLinks").innerHTML = [
    links.email && chip(`mailto:${links.email}`, "mail", links.email, false),
    links.linkedin && chip(links.linkedin, "linkedin", "LinkedIn"),
    links.github && chip(links.github, "github", "GitHub"),
    links.resume && chip(links.resume, "pdf", "Résumé"),
  ].filter(Boolean).join("");
}
