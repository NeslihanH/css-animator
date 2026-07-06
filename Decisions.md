# Decisions.md - CSS Animator

Append-only architecture log. Never edited or deleted, only superseded by a newer entry.

## D1 - Stack: React + Framer Motion

Context: needed to pick between vanilla CSS/JS, React + Framer Motion, or a hybrid.
Decision: React + Framer Motion.
Rationale: the showcase should demonstrate both CSS animation technique and Framer
Motion's declarative API, not CSS alone. Accepted the extra build tooling (Vite)
as a fair trade-off for that goal.

## D2 - Standalone project, not embedded in albireolabs-website

Context: could have shipped as a section inside the existing albireolabs-website
portfolio (React + Vite) instead of its own repo.
Decision: standalone repo, own deploy target.
Rationale: simpler architecture, no coupling to the portfolio site's build or
release cadence.

## D3 - Fixed upfront example list, but treated as a living roadmap

Context: could have started fully open-ended (MVP, expand later) or fixed a
complete list of examples upfront.
Decision: fixed an initial list of 11 examples across 3 categories (scroll
animations, page transitions, micro-interactions), but explicitly agreed new
ideas get added later rather than treating 11 as a hard ceiling.
Rationale: user wants scope visibility now, while keeping room to grow as new
animation ideas come up mid-project.

## D4 - Deploy target: GitHub Pages

Context: needed a deploy target for a static, backend-free site.
Decision: GitHub Pages.
Rationale: free, simple, sufficient for a static showcase; no server-side needs.

## D5 - M4 (Polish & Launch) scope left open

Context: milestone plan was drafted with a placeholder M4 (responsive check,
reduced-motion support, final deploy/publishing check).
Decision: M4's scope is not locked - will be revisited and discussed again
before work on it starts.
Rationale: user explicitly asked to defer that conversation until M1-M3 are
further along.

## D6 - Every example ships with a visible, always-accurate source view

Context: examples originally only showed the live demo. For an open-source
showcase, seeing the code is the point - user flagged this mid-M1. Considered
a plain-text panel, a syntax-highlighted panel, or a "View on GitHub" link.
Decision: syntax-highlighted inline panel (`prism-react-renderer`), toggled
via a "Show code" button on `ExampleCard`, sourced through Vite's `?raw`
import rather than a hand-copied string.
Rationale: `?raw` import guarantees the displayed code always matches the
real component (single source of truth, no drift as examples get tweaked);
inline + highlighted keeps the reader on the page instead of bouncing to
GitHub, which matters more for a showcase meant to impress. Applies
retroactively to all M1 examples and to every example going forward.

Follow-up: added copy-to-clipboard and download-as-file buttons on the same
code panel (user request, same session). Download uses a `fileName` prop set
to the example's real source file name, keeping the same "matches reality"
principle as the `?raw` import itself.

## D7 - `main` must have an explicit `width: 100%`, not just `max-width`

Context: `main` sits directly under `#root`, which is `display: flex;
flex-direction: column`, making `main` a flex item. With only
`max-width: 960px; margin: 0 auto;` (no explicit `width`), the browser's
cross-axis stretch (`align-items: stretch`) gets overridden by the auto
margins, so `main` shrink-to-fits its content's intrinsic width instead of
filling the container. That intrinsic width shifted depending on page state
(768.8px vs 1032px, observed via DevTools) because of `auto-fit` CSS Grids
elsewhere on the page, which resolve differently under indefinite
(shrink-to-fit) sizing - this read to the user as the whole page "growing"
when toggling the code viewer.
Decision: `main { width: 100%; max-width: 960px; margin: 0 auto; box-sizing:
border-box; }`.
Rationale: an explicit `width: 100%` forces `main` to always fill `#root`
(then get capped by `max-width`), independent of any descendant's intrinsic
sizing. General rule for this codebase: a flex item centered via
`margin: 0 auto` always needs an explicit `width` alongside its `max-width`.

## D8 - Button feedback is plain hover/tap, not magnetic

Context: M3.1 first shipped as a "magnetic button" (follows the cursor within
a radius via `onMouseMove` + spring `animate`), matching the milestone's
original parenthetical name. After tuning it to be more pronounced, the user
clarified they didn't want position-follow behavior at all, just a standard
hover/tap response (scale up on hover, scale down on tap, no movement).
Decision: replaced `MagneticButton` with `HoverButton` (`whileHover={{ scale:
1.05 }}`, `whileTap={{ scale: 0.95 }}`, plain CSS `:hover` for background/
shadow). No magnetic variant kept.
Rationale: user's explicit preference once they saw the effect live - the
milestone plan's parenthetical was Claude's initial interpretation, not a
locked requirement.

## D9 - Page-wide text centering needs explicit rules, not just inheritance

Context: `#root { text-align: center }` (from the Vite scaffold) was assumed
to cascade centering to every page, but several elements stayed visually
left-aligned: `.page-subtitle` and `.example-description` have `max-width`
without `margin: 0 auto`, so the box itself hugs the left edge even though
text-align only centers text *within* that (already left-stuck) box; and
`.example-header` was a `justify-content: space-between` flex row, which
positions its text block at the start regardless of text-align.
Decision: added `.page { text-align: center }` (explicit, not relying solely
on `#root`'s inherited value), `margin: 0 auto` on `.page-subtitle`, and
changed `.example-header` to a centered flex column (title, description,
"Show code" button stacked, all centered) instead of a left/right split row.
Rationale: user wants a consistently centered look site-wide (this resolves
part of the "UI'yi beğenmedim" feedback from M0.1 ahead of the full M4 visual
pass). General rule for this codebase: `max-width` centers nothing by itself -
always pair it with `margin: 0 auto` (or an equivalent centering rule) if the
box also needs to be positioned centered, not just narrowed.

## D10 - Removed `overflow-x: hidden` from `#root`; `Nav` is `position: sticky`

Context: made `Nav` sticky (`position: sticky; top: 0`) so it stays visible
while scrolling, per user request. It silently did not stick - traced to
`#root`'s `overflow-x: hidden` (added in D7's debugging as a defensive safety
net): any ancestor with `overflow` other than `visible` becomes sticky's
containing block for scroll-tracking purposes, and since `#root` itself never
actually scrolls (its height just grows with content; the document scrolls),
sticky positioning relative to it never reactivates on scroll.
Decision: removed `overflow-x: hidden` from `#root`.
Rationale: the actual width bug (D7) was already fixed by giving `main` an
explicit `width: 100%` - `overflow-x: hidden` on `#root` was an extra,
ultimately unnecessary safety net from that debugging session, and it now
conflicts with sticky positioning. Verified the width bug does not regress
after removing it.

## D11 - Visual identity: "Studio Grain" (supersedes D9's centering choice)

Context: M4.1's visual design pass. First direction tried was "Playground"
(bright, thick black outlines, hard offset "sticker" shadows, per-category
colors) - built two full passes at it (fonts via Google Fonts after the first
pass silently fell back to unavailable system fonts; colors switched from
translucent tints to solid fills after they read "muddy" in dark mode) but
the user rejected it outright both times, even correctly executed, as "cold"
and not matching the approved mockup's energy once seen live. Presented two
fresh directions (Studio Grain: dark, cinematic, serif display, single amber
accent, film grain; Field Notes: light paper, typewriter mono, hot-pink
highlighter marker) as a new mockup round - user picked Studio Grain, which
was mocked up dark-only at first; user then asked for a light variant too,
which was mocked up and approved before touching real code (lesson from the
Playground misstep: show every theme variant as a mockup before implementing,
don't invent one blind).
Decision: implemented "Studio Grain" site-wide: `--bg`/`--text-h`/`--border`/
`--accent` tokens in `src/index.css` (near-black `#0d0d0f` dark, warm paper
`#f5f3ee` light, single amber accent `#ffb238`/`#b8720a`), Georgia serif for
headings, thin 1px hairline borders + soft shadows instead of Playground's
thick borders/hard shadows, and left-aligned content instead of site-wide
centering.
Rationale: matches what was actually approved in the mockup, twice validated
(dark first, then light) before writing real CSS. Removes `.page { text-align:
center }` from D9 - that centering choice belonged to a design language this
project no longer uses; Studio Grain's asymmetric, editorial layout is
deliberately left-aligned.

Follow-up fixes after going live in the real codebase (mockups can't catch
everything): skeleton loader and spinner track used `--accent-bg` (a ~10%
opacity tint) which read as nearly invisible on the light warm-paper
background - switched to `--social-bg`/`--border` for baseline visibility,
keeping the accent only on the moving/active part. The film-grain texture was
implemented as `#root::before` (`position: absolute`), which - being
positioned while most page content is static - painted above the page's
actual content in stacking order; moved it to `background-image` directly on
`#root` instead, which paints as part of the element's own background and
can never appear above content. The parallax scroll example's motion (`±15%`
/ `±20%` of the blobs' own height, heavily blurred, low-opacity gradient
fills) was too subtle to perceive at normal scroll speed - same class of bug
as the M1.1 fade/slide tuning (D-adjacent, see Conversation.md): bumped to
large pixel offsets (`±160px` / `±220px`) and made the blobs solid, low-blur,
higher-opacity shapes.

## D12 - Mobile nav: hamburger + collapsible menu, not a wrapping link row

Context: at mobile widths, the nav's 4 links (`Home`, `Scroll Animations`,
`Page Transitions`, `Micro-interactions`) don't fit on one line. Tried two
CSS-only fixes first: letting the flex row wrap naturally (left the last link
stranded alone on its own line, looked broken) and a deliberate 2x2 grid
(looked intentional, but the user's real objection was that the *sticky* nav
was now 2-3 lines tall, permanently eating mobile screen space while
scrolling - a layout tweak couldn't fix that, only hiding the links could).
Decision: below 640px, collapse the links behind a hamburger button
(animated into an X via three `<span>`s rotating/fading, no icon library);
tapping opens an `AnimatePresence` height/opacity-animated dropdown; the menu
auto-closes on route change (`useEffect` keyed on `location.pathname`). Also
added a circular back-to-home button (chevron icon, `whileTap` scale) next to
the hamburger, shown only when not already on `/` - since the site's only
"depth" is category page -> home, a literal "back" affordance means "home,"
not browser history.
Rationale: keeps the always-visible sticky nav compact on mobile (one row)
while still exposing all navigation; the hamburger-to-X morph and the
back-button tap animation are deliberate micro-interactions, fitting for a
site whose whole subject is animation.

## D13 - `prefers-reduced-motion`: three layers, not one

Context: M4.3. A single mechanism doesn't cover every animation technique
used across M1-M3: Framer Motion's own `animate`/`whileHover`/`whileTap`/
`initial-animate-exit` transitions are one category; `useScroll` +
`useTransform` bound directly to a `style` prop (as in `ParallaxScroll`) are
a second category that Framer Motion does not treat as "animations" for
reduced-motion purposes; plain CSS `@keyframes`/`transition` (the spinner,
skeleton pulse, hover color changes, hamburger icon morph) are a third,
entirely outside Framer Motion's reach.
Decision: `<MotionConfig reducedMotion="user">` wraps the app in `main.jsx`
for category one; `ParallaxScroll` calls `useReducedMotion()` itself and
zeroes its scroll-linked offsets for category two; a blanket
`@media (prefers-reduced-motion: reduce) { *, *::before, *::after {
animation-duration: 0.01ms !important; ... } }` in `index.css` for category
three.
Rationale: each category needed a different fix; relying on just one (e.g.
assuming `MotionConfig` alone was enough) would have silently left the
parallax example's scroll-linked motion - one of the more commonly-flagged
motion-sickness triggers - untouched. Any future example using raw
`useScroll`/`useTransform` needs its own `useReducedMotion()` check;
`MotionConfig` will not catch it.

## D14 - v1.0.0: publishing checklist run, no findings needing a fix

Context: M4.4, the last item in the original milestone plan. Ran the
playbook's publishing checklist against the shipped files (`src/`,
`index.html`, `README.md`): grepped for Turkish characters
(`çğıİöşüÇĞÖŞÜ`) - none; grepped for em-dashes - none; grepped for
secret-shaped strings (`api_key`, `secret`, `password`, `token`) and checked
for `.env*` files - none (expected, this project never needed a backend or
any credentials, per the original architecture decision). Also found and
fixed two things unrelated to the checklist itself: `public/favicon.svg` was
still the default Vite logo (purple, unrelated to "Studio Grain"), replaced
with a small on-brand mark (an amber dot with a faint trailing arc, echoing
the parallax example's "traveling light" motif); `public/icons.svg` was dead
weight from the original scaffold (unused since the M0.1 cleanup) and was
deleted.
Decision: bumped `package.json` version to `1.0.0` and rewrote `README.md`
(live link, full example list, stack, run/build instructions) to mark this
as the first complete version.
Rationale: closes out the milestone plan that was set at kickoff - every
originally-planned example (11/11) and every M4 polish item is done.

## D15 - Code viewer shows every file, not just the `.jsx`

Context: post-v1.0.0, user pointed out that "Show code" only ever showed the
React component source, never the paired `.css` file - incomplete for a site
whose whole subject is CSS animation technique; someone reading the code
can't actually see the styling that makes an example look the way it does.
Decision: `ExampleCard` and `CodeBlock` switched from a single `code`/
`fileName` prop pair to a `files` array (`[{ fileName, code }, ...]`).
`CodeBlock` renders a file-name tab per entry (styled to look like an
attached tab sitting on top of the code panel) when there's more than one,
and copy/download act on whichever tab is active. Pages now import both the
`.jsx?raw` and `.css?raw` source for every example that has a CSS file (a
few, like `PageTransition`, don't and just get a single-file `files` array,
no tabs shown).
Rationale: matches the site's actual claim ("see the real source") -
previously only half true. Any future example with more than one source
file (e.g. a shared helper) should list all of them in `files`, in the order
a reader would want to see them.

## D16 - Dark-mode surface contrast needed a second, more aggressive pass

Context: first attempt at fixing "boxes are invisible on black" (bumping
`--border` from `#2a2a2c` to `#3d3d42` and giving demo boxes `--social-bg`
instead of `--bg`) was too timid - user reported it "didn't look very
different." The values were still too close in luminance to read as
distinct at a glance, and the dark-mode `--shadow` (a black
`rgba(0,0,0,0.5)` drop shadow) is fundamentally invisible against a
near-black `--bg` - shadows only read when they're darker than their
surroundings, which isn't possible once the background is already near-black.
Decision: pushed the values much further - `--border: #55555c`,
`--social-bg: #29292e` - and added a subtle light rim to the dark-mode
`--shadow` (`0 0 0 1px rgba(255, 255, 255, 0.05)` alongside the drop shadow)
so elevated surfaces get a highlight edge instead of relying solely on a
shadow that can't work in the dark.
Rationale: small, "tasteful" contrast bumps are easy to convince yourself
are enough when looking at hex values in isolation, but perceptually need to
be much bigger than they feel like they should be, especially near the dark
end of the scale. Lesson for future dark-mode work here: verify new
dark-mode colors by checking the actual rendered contrast, not just that the
hex values differ.

## D17 - Manual theme toggle, plus M5 "Pure CSS" as new living-roadmap scope

Context: after v1.0.0, user asked for two things pulled from a sibling
project's pattern (Suno Cookbook): a visible GitHub link, and a manual
dark/light toggle rather than relying solely on `prefers-color-scheme`.
Separately, user asked to be "proactive" about suggestions; among a few
options (meta/OG tags, a footer/contact link, pure-CSS examples), user chose
pure-CSS examples, then explicitly asked for a bigger, more impressive set
(5-6) rather than the original 2 proposed.
Decision:
- Theme toggle: `useTheme` hook (`localStorage`-persisted, `data-theme`
  attribute on `<html>`), with `:root[data-theme="dark"]` /
  `:root[data-theme="light"]` blocks added to `index.css` alongside the
  existing `@media (prefers-color-scheme: dark)` block - the attribute
  selector's higher specificity lets a manual choice override the OS
  preference in either direction, per the standard robust pattern for this.
- GitHub link: small octocat-mark SVG in `Nav`, always visible (desktop and
  mobile), linking to the repo.
- M5 "Pure CSS": five examples with zero animation-library/JS-animation code
  (`FlipCard`, `ScrollDrivenReveal`, `Marquee`, `GradientBorder`,
  `GradientText`), given their own page and nav entry rather than scattered
  into M1-M3, since collecting them together makes the "no JavaScript" claim
  legible at a glance instead of buried in random cards.
Rationale: the theme toggle and GitHub link directly reuse a pattern the
user already validated on another project, cheap to port over. M5 closes a
real gap the user (accurately) identified: despite the site's name, nothing
before this used pure CSS animation technique - every existing example was
Framer Motion driven.
