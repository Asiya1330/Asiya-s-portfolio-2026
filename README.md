# Asiya Batool — portfolio

Next.js 16 (App Router) · React 19 · TypeScript · GSAP + Lenis.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

The static prototype this design was worked out in lives in
`portfolio-scrol-animation/` — kept for reference, excluded from lint,
not part of the app.

---

## Structure

```
src/
  app/
    layout.tsx          fonts, metadata, the <html> shell
    globals.css         tokens, reset, typography — the only global CSS
    page.tsx            composes the sections (server component)
  components/
    chrome/             fixed furniture: nav, cursor, progress, providers
    motion/             reusable motion primitives
    sections/           one .tsx + .module.css pair per section
    ui/                 presentational pieces: buttons, labels, mock-ups
  content/              all copy and data, typed
  lib/                  gsap registration, media-query hooks, helpers
public/img/             the treated photography
```

Every section is a component plus a CSS Module beside it. Only three
things are global — the design tokens, the reset, and the typography
scale — because those genuinely are a shared system. Everything else is
scoped and cannot leak.

## Server and client

`page.tsx` is a server component, and so are `About`, `WhyMe`, `Faq` and
`SiteFooter`. Only the pieces that actually animate cross into the
client, so copy and markup ship as static HTML and the route prerenders.

Where a section is mostly static but needs one interactive part, the
boundary is split rather than moved up — `Faq` is a server component
rendering the client `FaqList`, and `WhyMe` renders client `WhyRow`s.

## Content

Everything editable is in `src/content`, typed in `types.ts`. Sections
import from there and hold no copy of their own.

**This is the seam the admin plugs into.** Those modules become database
reads; the types are the contract, so nothing in `components/` changes.

## Animation

GSAP with ScrollTrigger, driven by Lenis. Plugins are registered once in
`lib/gsap.ts`, including `useGSAP` — registering it routes GSAP's context
cleanup through React, which is what stops animations stacking up across
Fast Refresh.

Wiring order matters in `SmoothScroll`: Lenis tells ScrollTrigger it
moved, and GSAP's ticker advances Lenis (`autoRaf: false`). Backwards,
every scrub lags one frame behind the scrollbar.

| section | motion |
|---|---|
| Hero | masked lines on mount; image creeps, type column leaves faster |
| Marquee | infinite loop whose `timeScale` leans into scroll velocity |
| Approach | words fill one at a time against the scrollbar |
| Work | cards `position: sticky` at staggered offsets; the one underneath scales back as the next lands |
| Studio | 260vh runway, sticky stage — a 40vw plate opens to full bleed while the image counter-scales |
| About | portrait parallax |
| Why choose me | the rule draws left to right, then the row lifts |
| Reviews | two bands of oversized type sliding against each other on scrub, over a card grid |
| FAQ | staggered entry, height accordion |

Theme flipping is one attribute on `<body>`: sections declare
`data-theme` in markup, `ThemeFlipper` swaps it at mid-viewport, and the
CSS transition on `body` does the crossfade. Adding a section never means
editing that component.

## Four things worth knowing

**Lenis must be reached through `useLenis`, not a ref.** Lenis
intercepts wheel events and animates its own scroll, so if its `raf` is
never driven it swallows the wheel entirely — the page stops responding
to the mouse while the native scrollbar keeps working, which looks like
a CSS bug and is not one. A ref on `<ReactLenis>` populates once; an
effect that reads it too early bails and never retries. The hook
subscribes to Lenis's context and re-runs when the instance appears.
Related: `<body>` uses `overflow-x: clip`, because `hidden` makes it a
scroll container that competes for the same wheel input.


**Never set a reveal's start state as a CSS transform.** GSAP parses an
existing computed transform into its own pixel `y` and then stacks
`yPercent` on top of it, so a `translateY(105%)` pre-state never animates
back to zero. Pre-states here are opacity; GSAP owns transforms outright.

**Pre-states are gated on `@media (scripting: enabled)`,** not a class
added by an inline script. A script that touches `<html>` before
hydration puts it in React's hydration diff, and React 19 will not
suppress that. The media feature does the same job in CSS, and with
scripting off the content simply stays visible.

**Aspect ratio plus `height: 100%` will widen a grid column.** The
featured project shots did exactly that: the ratio computed a width from
the row height, overflowed the column and put a horizontal scrollbar on
the whole document. Let width drive the box. Grid children also carry
`min-width: 0`, since they otherwise refuse to shrink below their
content.

**The motion primitives address elements by a generated id, not a ref.**
`Reveal` and `SplitLines` are polymorphic, and a ref passed through
`createElement` to a dynamic tag cannot be proven to land on a host
element — React's lint rules rightly object. An id costs one attribute
and leaves the DOM shape untouched.

## Photography

Pre-processed to final crop and grade rather than filtered in CSS: the
background falls to duotone mono while skin keeps its colour, via a
hue/saturation/value mask. The script and full recipe are in
`portfolio-scrol-animation/tools/treat-photos.py`.

Because the crops are final, `next.config.ts` narrows `deviceSizes` to
the widths the layout actually asks for.

## Project screenshots

`tools/capture-projects.mjs` drives the headless Chrome already on the
machine — no Playwright to install, and the render is a real browser.
Shots are taken tall and cropped to the top 16:10 band, which drops
bottom-fixed cookie bars and chat bubbles and leaves the hero.

```bash
node tools/capture-projects.mjs           # all
node tools/capture-projects.mjs acudocx   # one
python3 tools/process-shots.py            # crop, resize, webp
```

Re-run when a client redesigns.

## Reviews

Real feedback read from the public Upwork profile, stored in
`content/reviews.ts`. A **snapshot, not a live feed** — Upwork's public
profile has nothing to subscribe to and their API needs an approved
OAuth app, so refresh it by hand when the profile changes.

Upwork does not publish client avatars or per-review permalinks on a
public profile, so each quote links back to the profile, which is where
a client would go to verify it anyway.

## Environment

Copy `.env.example` to `.env.local`. Both features degrade honestly
when unset — the booking panel says so, and the form tells visitors to
email instead of silently swallowing the message.

| variable | what it turns on |
|---|---|
| `NEXT_PUBLIC_CALENDLY_URL` | the inline booking widget |
| `RESEND_API_KEY` + `CONTACT_FROM_EMAIL` | contact-form delivery |

The Calendly script is ~90KB and sets cookies, so it only loads after
the visitor clicks "See available times".

## Still placeholder

- the admin area
- `metadataBase` in `app/layout.tsx` points at asiyabatool.com — change
  it when the real domain is settled
