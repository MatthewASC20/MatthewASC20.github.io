/* Skills grid, grouped by category. */

import { $, esc } from "../lib/dom.js";
import { tagsHTML } from "../lib/markup.js";

export function renderSkills(skills = []) {
  $("#skillsGrid").innerHTML = skills.map((group) => {
    const items = tagsHTML(group.items);
    return `
      <div class="skill-group reveal-item">
        <h3>${esc(group.category)}</h3>
        <div class="skill-list">${items}</div>
      </div>`;
  }).join("");
}
