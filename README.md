# CSS Animator

Interactive animation showcase: scroll animations, page transitions, and
micro-interactions, built with CSS and Framer Motion. Every example ships
with its real source code, one click away, with copy and download buttons.

**Live: [neslihanh.github.io/css-animator](https://neslihanh.github.io/css-animator/)**

## Examples

**Scroll Animations**
- Fade & slide-in on scroll (`whileInView`)
- Staggered list reveal
- Parallax scroll (`useScroll` + `useTransform`)
- Scroll progress bar (own scroll container)

**Page Transitions**
- Site-wide route fade/slide transition (`AnimatePresence`)
- Shared element transition (`layoutId`)
- Modal open/close

**Micro-interactions**
- Button hover/tap feedback
- Animated toggle/switch
- Form input focus/error feedback
- Loading spinner & skeleton loader

## Stack

- React + Vite
- [Framer Motion](https://motion.dev/)
- react-router-dom
- Deployed to GitHub Pages, no backend

## Run locally

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs to `dist/`, including a `404.html` copy of `index.html` so GitHub
Pages serves the app (not a real 404) on direct/refreshed deep links.
