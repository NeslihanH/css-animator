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
