/* ============================================================
   Matthew De Jesus — Portfolio (entry point)
   Renders all content from data/*.json and wires interactions.
   To edit content, change the files in data/ — not the JS.
   ============================================================ */

import { loadData } from "./lib/data.js";
import { $, esc } from "./lib/dom.js";
import { initTheme } from "./ui/theme.js";
import { initNav, initScrollSpy } from "./ui/nav.js";
import { initProgressBar, initDividerPulses, initReveal } from "./ui/scroll.js";
import { initModal } from "./ui/modal.js";
import { initLightbox } from "./ui/lightbox.js";
import { renderHero } from "./render/hero.js";
import { renderAbout } from "./render/about.js";
import { renderTimeline } from "./render/timeline.js";
import { renderProjects } from "./render/projects.js";
import { renderPublications } from "./render/publications.js";
import { renderBeyond } from "./render/beyond.js";
import { renderSkills } from "./render/skills.js";
import { renderContact } from "./render/contact.js";

function showLoadError(err) {
  const box = $("#loadState");
  box.hidden = false;
  box.innerHTML = `
    <strong>Couldn't load content.</strong>
    If you opened this file directly, run a local server from this folder:<br>
    <code>python3 -m http.server 8000</code> then visit <code>localhost:8000</code>.
    <br><span class="mono-label">${esc(err.message)}</span>`;
}

async function boot() {
  initTheme();
  initNav();
  initProgressBar();
  initDividerPulses();
  initModal();
  initLightbox();
  $("#year").textContent = new Date().getFullYear();

  try {
    const data = await loadData();
    renderHero(data);
    renderAbout(data);
    renderTimeline(data.timeline);
    renderProjects(data.projects);
    renderPublications(data.publications, data.profile?.name);
    renderBeyond(data.beyond);
    renderSkills(data.skills);
    renderContact(data);
    initReveal();
    initScrollSpy();
  } catch (err) {
    showLoadError(err);
  }
}

document.addEventListener("DOMContentLoaded", boot);
