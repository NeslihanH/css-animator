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
