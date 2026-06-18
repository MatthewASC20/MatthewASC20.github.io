# Card photos

Drop photos into the folder named after a card's **id** and they're added to that card's
carousel automatically — no code or JSON edits needed.

## Naming
- Number photos sequentially: `1.jpg`, `2.jpg`, `3.jpg`, … They load **in order** and stop at
  the first missing number, so **don't skip numbers**.
- Optionally add a `cover.*` file (e.g. `cover.jpg`) — that image is shown on the card on the
  homepage. With no `cover.*`, `1.*` is used as the cover.
- Supported extensions (lowercase): `.jpg` `.jpeg` `.png` `.webp` `.svg`

## Where each card's folder is
- **Projects** → `assets/photos/<project-id>/`
  ids: `buck`, `gan`, `diffamp`, `riscv`, `gokart`, `shade`, `ytdl`, `botnet`
- **Beyond the Lab** → `assets/photos/<item-id>/` (e.g. `cryofac`)

## Example
```
assets/photos/cryofac/
  cover.svg   ← shown on the card + first in the carousel
  1.svg
  2.svg
```
→ the CryoFac card shows `cover`, and its carousel scrolls cover → 1 → 2.

## Behaviour
- **Projects:** the cover appears at the top of the card; clicking the card opens the detail
  modal with the carousel at the top.
- **Beyond:** the cover is the card; clicking it opens the fullscreen carousel.
- After adding/removing photos, just **hard-refresh** the page (Cmd+Shift+R). No build step.
