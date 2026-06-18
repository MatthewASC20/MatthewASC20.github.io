/* Scroll-driven effects: progress bar, divider pulses, reveal-on-scroll. */

import { $, $$, prefersReduced } from "../lib/dom.js";

/** Top "signal level" progress bar. */
export function initProgressBar() {
  const bar = $("#progressBar");
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = `${max > 0 ? (h.scrollTop / max) * 100 : 0}%`;
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener("resize", update, { passive: true });
  update();
}

/** Animated signal pulse on each section divider. */
export function initDividerPulses() {
  if (prefersReduced()) return;
  $$(".trace-divider").forEach((divider, i) => {
    const pulse = document.createElement("span");
    pulse.className = "trace-divider__pulse";
    pulse.style.animationDelay = `${i * 0.8}s`;
    divider.appendChild(pulse);
  });
}

/** Fade/slide-in elements as they enter the viewport. */
export function initReveal() {
  const els = $$(".reveal, .reveal-item");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      const i = parseInt(el.style.getPropertyValue("--i") || "0", 10);
      el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
      el.classList.add("in-view");
      io.unobserve(el);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  els.forEach((el) => io.observe(el));
}
