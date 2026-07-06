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
