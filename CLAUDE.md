# CLAUDE.md - CSS Animator

Resume doc. Read this first when picking the project back up.

## What this is

A standalone animation showcase site: interactive examples of scroll animations,
page transitions, and micro-interactions, built with CSS animation techniques and
Framer Motion. Portfolio piece, not a SaaS product - no backend, no auth, no
monetization, no host platform to target.

References the general workflow methodology in `extension_playbook.md`
(parent directory: `/Users/neslihanhamali/Documents/Codes/extension_playbook.md`)
for docs pattern, milestone discipline, and language rules. Project-specific
decisions live here and in `Decisions.md`.

## Stack

- React + Vite
- Framer Motion (animation library)
- react-router-dom (category pages + route transitions)
- Deploy target: GitHub Pages
- No backend, no auth, no database - fully static/client-side

## Status

**M0-M3 all done - 11/11 examples, live at
`https://neslihanh.github.io/css-animator/`. Every example has a "Show code"
toggle with copy + download buttons. M4.1 (visual design, "Studio Grain")
and M4.2 (responsive + mobile hamburger nav with a back-to-home button) done.
Current milestone: M4 - Polish & Launch, M4.3 (`prefers-reduced-motion`) next.**

Deploy note: `postbuild` script copies `dist/index.html` to `dist/404.html`
so GitHub Pages serves the SPA shell (not a real 404) when a deep link like
`/scroll-animations` is opened directly or refreshed - react-router then
renders the right page client-side from the URL.

Visual identity (M4.1, "Studio Grain" - see D11): near-black `#0d0d0f` dark /
warm paper `#f5f3ee` light, Georgia serif for `h1`/`h2`/card titles, system
sans for body/UI, one amber accent (`#ffb238` dark / `#b8720a` light) used
sparingly (nav active underline, focus rings, hover fills) rather than
filling boxes. Thin 1px hairline borders, soft shadows (`var(--shadow)`), no
thick "sticker" borders. Content is left-aligned (no more site-wide
text-align: center - that was the previous "Playground" direction's choice,
superseded). Token file: `src/index.css`.

Note: the original plan had an M0.3 ("finalize triple docs"). Folded into the
per-step doc update instead of its own milestone - CLAUDE.md gets its repo
layout / run instructions updated as part of closing out M0.1, not as a
separate step.

## Repo layout

```
src/
  components/   # Shared UI (Nav, later: shared example wrappers)
  pages/        # One page per category (Home, ScrollAnimations, PageTransitions, MicroInteractions)
  examples/     # Individual animation example components, added in M1-M3
  App.jsx       # Route definitions
  main.jsx      # React root, router provider
public/         # Static assets served as-is
```

## How to run

```
npm install
npm run dev
```

Opens at `http://localhost:5173` by default.

## Milestone checklist

- [x] **M0 - Project Setup**
  - [x] M0.1 - Vite + React scaffold, Framer Motion + react-router-dom installed, base layout/nav
  - [x] M0.2 - Git remote + GitHub Pages deploy pipeline, empty shell verified live
- [x] **M1 - Scroll Animations** (4 examples)
  - [x] M1.1 - Fade & slide-in on scroll (`whileInView`)
  - [x] M1.2 - Staggered list reveal on scroll
  - [x] M1.3 - Parallax scroll effect (`useScroll` + `useTransform`)
  - [x] M1.4 - Scroll progress bar (scoped to its own scrollable container)
  - [x] Code viewer - "Show code" toggle on every `ExampleCard`, real source via
        Vite `?raw` import + `prism-react-renderer` syntax highlighting, plus
        copy-to-clipboard and download-as-file buttons. Applies to every
        example in every milestone from here on.
- [x] **M2 - Page Transitions** (3 examples)
  - [x] M2.1 - Route fade/slide transition (`AnimatePresence` + react-router) -
        applied site-wide to real navigation, not a contained demo box
  - [x] M2.2 - Shared element transition (`layoutId`)
  - [x] M2.3 - Modal/overlay open-close transition
- [x] **M3 - Micro-interactions** (4 examples)
  - [x] M3.1 - Button hover/tap feedback (`HoverButton`: scale on hover/tap,
        no position-follow - see D8)
  - [x] M3.2 - Animated toggle/switch
  - [x] M3.3 - Form input focus/error animation
  - [x] M3.4 - Animated loading spinner / skeleton loader
- [ ] **M4 - Polish & Launch**
  - [x] M4.1 - Visual design pass ("Studio Grain" direction, both themes; see D11)
  - [x] M4.2 - Responsive check (mobile hamburger menu + back-to-home button
        on `Nav`, replacing the awkward flex-wrap of 4 nav links; see D12)
  - [ ] M4.3 - `prefers-reduced-motion` support
  - [ ] M4.4 - README + final deploy + publishing check

Note: the example list is a living roadmap, not a hard ceiling - new animation
ideas get slotted into M1/M2/M3 (or a new M5+) explicitly as they come up, never
silently absorbed.
