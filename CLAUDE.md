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

**M0, M1, M2, M3 all done - 11/11 examples, live at
`https://neslihanh.github.io/css-animator/`. Every example has a "Show code"
toggle with copy + download buttons. M4 (Polish & Launch) scope is next to
discuss - was deliberately left open, see Conversation.md.**

Deploy note: `postbuild` script copies `dist/index.html` to `dist/404.html`
so GitHub Pages serves the SPA shell (not a real 404) when a deep link like
`/scroll-animations` is opened directly or refreshed - react-router then
renders the right page client-side from the URL.

Site-wide text centering: `.page { text-align: center; }` plus `margin: 0
auto` on any block that also has a `max-width` (needed for `.page-subtitle`
and would apply to any future centered paragraph) - a `max-width` alone does
not center a block, it just narrows it and leaves it stuck to the left.

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
- [ ] **M4 - Polish & Launch** (scope not locked, to be re-discussed before starting)
  - [ ] Visual design pass (user flagged the M0.1 shell UI as not liked yet -
        still an open candidate for this milestone; the text-centering part of
        it was resolved ahead of time during M3.1, see D9)
  - [ ] Responsive check
  - [ ] `prefers-reduced-motion` support
  - [ ] README + final deploy + publishing check

Note: the example list is a living roadmap, not a hard ceiling - new animation
ideas get slotted into M1/M2/M3 (or a new M5+) explicitly as they come up, never
silently absorbed.
