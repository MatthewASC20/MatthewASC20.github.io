/* Hero: name, cycling role typewriter, tagline, CTA, headshot. */

import { $, esc, prefersReduced } from "../lib/dom.js";

export function renderHero({ profile = {} }) {
  document.title = `${profile.name} — ${profile.title ?? "Portfolio"}`;
  $("#heroName").textContent = profile.name ?? "";
  $("#heroTagline").textContent = profile.tagline ?? "";
  if (profile.links?.resume) $("#heroResume").href = profile.links.resume;

  renderPortrait(profile);
  initTypewriter(profile.roles?.length ? profile.roles : [profile.title ?? ""]);
}

/* Headshot beside the intro; click to open the lightbox. Hides itself if the image is missing. */
function renderPortrait(profile) {
  const box = $("#heroPortrait");
  if (!box || !profile.photo) return;
  const src = esc(profile.photo);
  const alt = `Portrait of ${esc(profile.name ?? "")}`;
  box.hidden = false;
  box.innerHTML = `<button type="button" class="hero__portrait-btn" data-lightbox="${src}" aria-label="View full-size photo"><img src="${src}" alt="${alt}"></button>`;
  box.querySelector("img").addEventListener("error", () => { box.hidden = true; });
}

/* ----- Cycling role typewriter ----- */
function initTypewriter(roles) {
  const host = $("#heroRole");
  if (!host) return;
  if (prefersReduced() || roles.length <= 1) {
    host.textContent = roles[0] ?? "";
    return;
  }

  host.innerHTML = '<span class="type-text"></span><span class="type-cursor" aria-hidden="true"></span>';
  const span = host.querySelector(".type-text");
  let ri = 0, ci = 0, deleting = false;

  const tick = () => {
    const word = roles[ri];
    if (!deleting) {
      span.textContent = word.slice(0, ++ci);
      if (ci >= word.length) { deleting = true; setTimeout(tick, 1700); }
      else setTimeout(tick, 65 + Math.random() * 45);
    } else {
      span.textContent = word.slice(0, --ci);
      if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 380); }
      else setTimeout(tick, 35);
    }
  };
  setTimeout(tick, 600);
}
