/* Skills grid, grouped by category. */

import { $, esc } from "../lib/dom.js";

export function renderSkills(skills = []) {
  $("#skillsGrid").innerHTML = skills.map((group) => {
    const items = (group.items ?? []).map((s) => `<span class="tag">${esc(s)}</span>`).join("");
    return `
      <div class="skill-group reveal-item">
        <h3>${esc(group.category)}</h3>
        <div class="skill-list">${items}</div>
      </div>`;
  }).join("");
}
