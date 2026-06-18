/* Light/dark theme: pre-paint init lives inline in index.html;
   this wires the toggle and keeps <meta name="theme-color"> in sync. */

import { $ } from "../lib/dom.js";

const META_COLORS = { light: "#fbfcfd", dark: "#0a0f14" };

const syncMeta = (theme) => {
  $('meta[name="theme-color"]')?.setAttribute("content", META_COLORS[theme] ?? META_COLORS.light);
};

export function initTheme() {
  const root = document.documentElement;
  syncMeta(root.dataset.theme);

  $("#themeToggle")?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    syncMeta(next);
    try { localStorage.setItem("theme", next); } catch { /* private mode */ }
  });
}
