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
