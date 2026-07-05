# Conversation.md - CSS Animator

Running narrative of what we discussed and why, session by session.

## 2026-07-04 - Kickoff

Started the project as an "Animation Showcase": interactive scroll animations,
page transitions, and micro-interactions meant to be a genuine "wow" portfolio
piece. Read `extension_playbook.md` first to align on working method: milestone
breakdown, atomic delivery loop (discuss -> confirm -> implement -> test ->
docs -> commit), triple docs, Turkish chat / English shipped files.

Clarified with the user (A/B/C style) before any code:
- Stack: React + Framer Motion (not vanilla CSS/JS, not the React+CSS hybrid).
- Scope: standalone project, not folded into the existing albireolabs-website
  portfolio.
- Content: fixed an upfront list rather than a fully open-ended MVP.
- Deploy: GitHub Pages.

Proposed a milestone plan (M0 setup, M1 scroll animations x4, M2 page
transitions x3, M3 micro-interactions x4, M4 polish/launch). User confirmed the
plan as a starting point, with two explicit notes:
- The example list can grow later - not a hard cap at 11.
- M4's scope should be discussed again later, not locked in now.

User is a junior developer - instructions should be detailed and explicit at
each step, with a clear manual test to run before approving the next milestone.

Next: M0.1 - scaffold Vite + React, install Framer Motion + react-router-dom,
build the base layout/nav shell.

## 2026-07-04 - M0.1 built and approved

Scaffolded Vite + React, installed Framer Motion + react-router-dom, built Nav
+ Home + 3 category placeholder pages. First manual test caught a real bug:
forgot to wrap `App` in `BrowserRouter` in `main.jsx`, which crashed `NavLink`
with "useLocation() may be used only in the context of a Router" - fixed and
reverified before the user retested.

User approved the shell functionally but does not like the current visual
design ("UI'yi çok beğenmedim"). Not fixing now - logged as a candidate item
under M4 (Polish & Launch), which is still an open/undiscussed milestone.

Next: M0.2 - GitHub repo + GitHub Pages deploy pipeline. `gh` CLI is not
installed locally, so repo creation goes through the GitHub web UI with the
user, walked through one step at a time (playbook setup-guidance mode).

## 2026-07-04 - M0.2: GitHub Pages deploy pipeline

User created `https://github.com/NeslihanH/css-animator` and pushed the M0.1
commit themselves. Added Vite `base: '/css-animator/'` and a matching
`BrowserRouter basename` for the project-site subpath, plus a GitHub Actions
workflow (`.github/workflows/deploy.yml`) that builds and deploys to Pages on
push to `main`.

Hit a real snag: the user's local git credential (PAT) lacks the `workflow`
scope, so pushing a commit that touches `.github/workflows/*` was rejected.
Rather than walking a junior user through editing PAT scopes, worked around it
by dropping the workflow file from the local commit and having the user add
it once via the GitHub web UI (which isn't scope-restricted). This produced a
second, independent commit for the same file - user apparently also has a
local IDE git integration that created its own commit for it, so the branch
briefly diverged (two commits, identical file content). Merged cleanly
(`git merge origin/main`, no conflicts since content matched) and pushed.

Pages Source was already correctly set to "GitHub Actions"; the first deploy
failure ("Deployment failed, try again later") was a transient first-run
issue, resolved by re-running the job. Separately fixed the root cause of the
push rejections: the user's classic PAT was missing the `workflow` scope:
added it via https://github.com/settings/tokens (same token string, no
keychain changes needed), confirmed by pushing the Node 20 -> 22 bump
directly without issue. Site confirmed live and working at
`https://neslihanh.github.io/css-animator/`.

M0 is complete. Next: M1.1 - fade & slide-in on scroll, using Framer Motion's
`whileInView`.

## 2026-07-04 - M1.1: fade & slide-in, three rounds of visual tuning

Built `ExampleCard` (shared wrapper: title, description, demo area) and
`FadeSlideIn` (three boxes fading + sliding up on scroll via `whileInView`).
First cut used `initial y: 40`, `duration 0.5`, `viewport amount 0.4`, big
`gap: 50vh` before the first box - user said the animation "wasn't noticeable
at all." Root cause: with only 4rem of top padding, the first box was already
visible on page load, so it animated before the user had a chance to scroll
and look.

Iterated three times against direct user feedback:
1. Pushed the whole stack down (`padding-top: 70vh`, `gap: 60vh`) and slowed
   the animation (duration 0.7, y 80, viewport amount 0.5) - user said the
   boxes were now too far apart and it still didn't read as a fade.
2. Tightened spacing (`gap: 30vh`, `padding-top: 45vh`), slowed further
   (duration 1.1) - user said the top padding now looked like a broken/empty
   page.
3. Cut top padding to `8vh` (still enough that nothing intersects on load,
   just doesn't feel like dead space), lowered the `viewport` trigger
   threshold to `amount: 0.2` (animation starts as soon as a sliver is
   visible, not at 50%), bumped distance/duration further (y 100, duration
   1.3). Also tried adding a "Scroll down to see each box animate in" hint
   text - user didn't like it, removed.

Final approved version: `padding: 8vh 0 4rem`, `gap: 25vh`, `y: 100 -> 0`,
`opacity 0 -> 1`, `viewport={{ once: true, amount: 0.2 }}`,
`transition={{ duration: 1.3, ease: 'easeOut' }}`. Lesson for future scroll
examples in M1: trigger threshold (`viewport.amount`) matters more for
perceived "obviousness" than duration alone - a low `amount` catching the
element early reads much clearer than a high one that waits until it's
already half in view.

Next: M1.2 - staggered list reveal on scroll.

## 2026-07-04 - M1.2: staggered list reveal

Built `StaggerReveal`: a 5-item grid using Framer Motion `variants` with
`staggerChildren: 0.15` on the parent, triggered by `whileInView` at the same
tuned `amount: 0.2` threshold as M1.1. Approved on the first pass, no
iteration needed this time.

Next: M1.3 - parallax scroll effect (`useScroll` + `useTransform`).

## 2026-07-04 - M1.3 + code viewer retrofit

Built `ParallaxScroll`: two blobs moving at different speeds via `useScroll`
(scoped to the section with a ref) + `useTransform`, no iteration needed.

Mid-flight, the user raised a real scope gap: examples only showed the live
demo, not the underlying code - weak for something meant to be an open-source
showcase. Treated as a living-roadmap addition rather than silently folding it
in. Presented three options (plain-text code panel, syntax-highlighted panel,
or a GitHub link); user picked syntax-highlighted inline, so:

- Added `prism-react-renderer` (small, no separate CSS/theme file needed).
- Built `CodeBlock` (wraps `Highlight`) and added a `code` prop + "Show
  code"/"Hide code" toggle to `ExampleCard`.
- Source is pulled via Vite's `?raw` import suffix (e.g.
  `import Source from '../examples/FadeSlideIn.jsx?raw'`) rather than copied
  by hand, so the displayed code can never drift from the real component.
- Retrofitted into all three existing M1 examples; will apply the same
  pattern going forward for M2/M3.

Two rounds of layout feedback: the code panel originally rendered after the
demo, which for a tall demo (like the 70vh parallax section) put it very far
below its own toggle button - moved the `CodeBlock` to render between the
header and the demo instead. Then the code text appeared centered - traced to
a global `#root { text-align: center }` left over from the Vite scaffold
template, inherited by everything including `<pre>` content. Fixed locally by
forcing `text-align: left` on `.code-block` rather than touching the
site-wide rule. The broader "everything is centered" look is left alone for
now and logged under M4 (visual design pass), since the user's original "UI'yi
beğenmedim" feedback likely covers this too.

Next: M1.4 - scroll progress bar.

## 2026-07-05 - M1.4 and M1 wrap-up: copy + download buttons

Built `ScrollProgressBar`: a self-contained scrollable box (own `overflow-y:
auto` container + ref) with a bar pinned to its top, `scaleX` driven by
`useScroll({ container: containerRef })`. Kept it scoped to its own container
rather than the whole page, consistent with how the other three M1 examples
are self-contained demo boxes rather than site-wide chrome. Approved without
iteration.

User asked for two more things on the code viewer (from M1.3): a copy-to-
clipboard icon, then a download-as-file icon right after. Added both to
`CodeBlock`: copy uses `navigator.clipboard.writeText` with a brief checkmark
confirmation; download builds a `Blob` + temporary anchor click. Download
needed a real file name, so threaded a `fileName` prop through
`ExampleCard` -> `CodeBlock`, set per example to match its actual source file
(`FadeSlideIn.jsx`, etc.) rather than a generic name.

M1 - Scroll Animations is fully done: 4/4 examples, each with working code
view + copy + download. Next: M2 - Page Transitions, starting with M2.1
(route fade/slide transition via `AnimatePresence`).

## 2026-07-05 - M2.1: real site-wide page transitions

Design call (technical, made without a vote per the playbook): rather than
faking route transitions inside a contained demo box like M1's examples, wired
`AnimatePresence` + `useLocation` directly into `App.jsx` so the actual site
navigation animates - every click on a nav link fades/slides between real
pages. Added a small reusable `PageTransition` wrapper component. The Page
Transitions page itself just explains this and points back at the nav, plus
shows `PageTransition.jsx`'s source. Approved without iteration.

M2.2 and M2.3 will go back to M1's pattern (self-contained demo boxes) since
shared-element and modal techniques don't need real routing to demonstrate
convincingly.

Next: M2.2 - shared element transition (`layoutId`).

## 2026-07-05 - M2.2: shared element transition

Built `SharedElement`: 3 clickable cards, each with `layoutId={`card-${id}`}`;
clicking one shows an `AnimatePresence`-controlled detail view sharing the
same `layoutId`, so Framer Motion morphs the card's position/size directly
into the expanded view instead of cross-fading two unrelated elements. Kept
the backdrop contained within the demo box (`position: absolute` inside a
`position: relative` wrapper) rather than a real fixed full-page overlay,
consistent with M1's self-contained-demo pattern. Approved without iteration.

Next: M2.3 - modal/overlay open-close transition.

## 2026-07-05 - M2.3, then a real layout bug in the code viewer

Built `ModalDemo`: spring pop-in/out dialog over a backdrop, deliberately
different motion feel from M2.2's shared layoutId morph. First cut kept the
backdrop contained within the demo box like M2.2 (`position: absolute`
inside a `min-height: 320px` wrapper) - user reported the empty reserved
space made "Show code" feel like it was making the screen grow. Switched the
backdrop to `position: fixed` covering the full viewport (a real modal, not a
contained one) and removed the `min-height` hack, since a modal has no reason
to be boxed into its demo card.

User then reported a second, more specific issue: on the Shared Element and
Modal examples (not the M1 ones), clicking "Show code" visibly widened the
whole section left and right by the same amount. Several guesses (text-align
inheritance, scrollbar-gutter, explicit width/min-width/overflow-x:hidden on
the component chain) did not fix it. Two screenshots showing the same
settled-state width proved it wasn't a permanent bug in the obvious place, so
asked the user to inspect DevTools directly - the box model tooltip showed
`.example-card` going from 696.77px to 960px wide. A console script measuring
`.example-card`, `.page`, `main`, and `#root` nailed it: `main`'s width itself
was 768.8px with code hidden vs 1032px with code shown, while `#root` stayed
a constant 1126px throughout.

Root cause: `main { max-width: 960px; margin: 0 auto; }` is a **flex item**
of `#root` (`display: flex; flex-direction: column`). `margin: 0 auto` on a
flex item disables `align-items: stretch` on the cross axis, so instead of
filling the container, `main` shrink-to-fits to its content's intrinsic
width - and that intrinsic width is unreliable because of the `auto-fit` CSS
Grids used in some examples (`SharedElement`'s card grid, `Home`'s category
grid, `StaggerReveal`'s grid), which compute differently under indefinite
(shrink-to-fit) available space depending on what else is on the page. Fix:
added `width: 100%` (plus `box-sizing: border-box`) to `main` in `App.css`, so
it always fills `#root` and gets capped by `max-width` consistently,
regardless of what any child's intrinsic content size happens to be.

Lesson for later CSS work in this codebase: **never combine `margin: 0 auto`
centering with `max-width` on a flex item without also setting an explicit
`width`** - the flex item will silently shrink-to-fit instead of centering
at its intended max size, and the bug only surfaces once some descendant's
intrinsic width happens to shrink (which is exactly what an `auto-fit` grid
does under indefinite sizing).

M2 - Page Transitions is fully done (3/3), and this layout bug is fixed
site-wide (not just for the two examples that exposed it). Next: M3 -
Micro-interactions, starting with M3.1 (button hover/tap feedback, magnetic
button).

## 2026-07-05 - M3.1: magnetic button dropped for plain hover, then a
centering pass

Built `MagneticButton` first (cursor-follow via `onMouseMove` + spring
`animate`), matching the milestone's own parenthetical. User felt it
"vibrated" - traced to `mass: 0.1` giving it almost zero inertia, so it
mirrored the mouse's raw micro-jitter instead of smoothing it. Increased mass
to 1 and the pull strength slightly, but once it was clearer, the user said
plainly they didn't want the button following the cursor at all - just a
normal hover/tap response. Replaced it outright with `HoverButton` (scale on
`whileHover`/`whileTap`, no position change). See [[D8]].

That triggered a broader complaint: several page texts were still visibly
left-aligned despite `#root { text-align: center }` supposedly cascading
everywhere. Root-caused two distinct issues (see [[D9]]): `.page-subtitle`
had `max-width` without `margin: 0 auto` (text-align only centers text
*inside* a box, it doesn't center the box itself); and `.example-header` was
a `space-between` flex row that positioned the whole text block at the
left regardless of text-align. Fixed both - added explicit `.page {
text-align: center }`, gave `.page-subtitle` `margin: 0 auto`, and turned
`.example-header` into a centered column (title, description, "Show code"
button stacked). That last change left the button touching the demo box
below it with no gap - added `margin-bottom` back onto `.example-header` to
fix it. All approved.

Next: M3.2 - animated toggle/switch.

## 2026-07-05 - M2.3: modal open/close, M2 wrap-up

Built `ModalDemo`: a button opens a spring-based (`type: 'spring', stiffness:
300, damping: 25`) pop-in dialog over a fading backdrop, both via
`AnimatePresence`. Deliberately different motion feel from M2.2's shared
layoutId morph, so the two examples don't read as the same trick twice.
Approved without iteration.

M2 - Page Transitions is fully done: 3/3 (site-wide route transition, shared
element morph, modal). Next: M3 - Micro-interactions, starting with M3.1
(button hover/tap feedback, magnetic button).
