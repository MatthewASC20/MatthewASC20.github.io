/* Tiny DOM + string helpers shared across modules. */

export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/** Escape a value for safe interpolation into HTML. */
export const esc = (str) =>
  String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const prefersReduced = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** Make an element act like a button: click and Enter/Space both trigger `fn`. */
export function onActivate(el, fn) {
  el.addEventListener("click", fn);
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); }
  });
}

/** Filter-pill bars (timeline, projects): activate the clicked pill, then apply it. */
export function wireFilterPills(btns, apply) {
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      apply(btn);
    }));
}
