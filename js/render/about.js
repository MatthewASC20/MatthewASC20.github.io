/* About bio paragraphs (rendered into the combined hero intro). */

import { $, esc } from "../lib/dom.js";

export function renderAbout({ profile = {} }) {
  $("#aboutBody").innerHTML = (profile.about ?? []).map((para) => `<p>${esc(para)}</p>`).join("");
}
