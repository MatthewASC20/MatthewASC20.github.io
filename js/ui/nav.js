/* Sticky nav, mobile burger menu, and scroll-spy highlighting. */

import { $, $$ } from "../lib/dom.js";

export function initNav() {
  const nav = $("#nav");
  const burger = $("#navBurger");
  const links = $("#navLinks");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  const setOpen = (open) => {
    links.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  };

  burger.addEventListener("click", () => setOpen(!links.classList.contains("is-open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setOpen(false)));

  // tap anywhere outside the open menu (and outside the burger) to close it
  document.addEventListener("click", (e) => {
    if (!links.classList.contains("is-open")) return;
    if (e.target.closest("#navLinks") || e.target.closest("#navBurger")) return;
    setOpen(false);
  });
}

export function initScrollSpy() {
  if (!("IntersectionObserver" in window)) return;

  const navLinks = new Map(
    $$("#navLinks a").map((a) => [a.getAttribute("href").replace("#", ""), a])
  );
  const sections = [...navLinks.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      navLinks.forEach((a) => {
        a.classList.remove("is-active");
        a.removeAttribute("aria-current");
      });
      const active = navLinks.get(entry.target.id);
      active?.classList.add("is-active");
      active?.setAttribute("aria-current", "true");
    }
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((s) => io.observe(s));
}
