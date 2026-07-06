/* Contact section: lead line + link chips. */

import { $ } from "../lib/dom.js";
import { linkChip } from "../lib/markup.js";

export function renderContact({ profile = {} }) {
  const links = profile.links ?? {};
  $("#contactLead").textContent = profile.available
    ? `${profile.available}. The fastest way to reach me is email — let's talk.`
    : "Let's talk.";

  $("#contactLinks").innerHTML = [
    links.email && linkChip(`mailto:${links.email}`, "mail", links.email, { blank: false, size: 18 }),
    links.linkedin && linkChip(links.linkedin, "linkedin", "LinkedIn", { size: 18 }),
    links.github && linkChip(links.github, "github", "GitHub", { size: 18 }),
    links.resume && linkChip(links.resume, "pdf", "Résumé", { blank: true, size: 18 }),
  ].filter(Boolean).join("");
}
