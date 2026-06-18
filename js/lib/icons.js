/* Inline icon set (24x24 viewBox), rendered via svg(). */

const ICONS = {
  power:   '<path d="M7 13h4l-1 8 7-11h-4l1-8z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
  wave:    '<path d="M2 12h3l2-7 4 14 2-7h2l2 4h3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  chip:    '<rect x="6" y="6" width="12" height="12" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="9.5" y="9.5" width="5" height="5" rx="0.5" fill="currentColor" opacity="0.5"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M9 6V3M15 6V3M9 21v-3M15 21v-3M6 9H3M6 15H3M21 9h-3M21 15h-3"/></g>',
  cpu:     '<rect x="5" y="5" width="14" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M9 9h6v6H9z" fill="none" stroke="currentColor" stroke-width="1.6"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9 5V2M15 5V2M9 22v-3M15 22v-3M5 9H2M5 15H2M22 9h-3M22 15h-3"/></g>',
  motor:   '<circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M4.9 4.9l2.5 2.5M16.6 16.6l2.5 2.5M19.1 4.9l-2.5 2.5M7.4 16.6l-2.5 2.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  embedded:'<rect x="4" y="8" width="16" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.8"/><g stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M7 8V5M12 8V5M17 8V5M7 19v-3M12 19v-3M17 19v-3"/></g><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/>',
  code:    '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
  pdf:     '<path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/>',
  github:  '<path d="M12 2a10 10 0 00-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0012 2z" fill="currentColor"/>',
  link:    '<path d="M10 13a5 5 0 007.07 0l2-2a5 5 0 00-7.07-7.07l-1.5 1.5M14 11a5 5 0 00-7.07 0l-2 2a5 5 0 007.07 7.07l1.5-1.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
  linkedin:'<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 014 0v4M11 10v7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
  arrow:   '<path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
};

/** Render a named icon as an inline SVG string. */
export const svg = (name, size = 24) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true">${ICONS[name] ?? ICONS.link}</svg>`;

/** Map a data-file icon key to a known icon name. */
export const linkIcon = (type) => (type in ICONS ? type : "link");
