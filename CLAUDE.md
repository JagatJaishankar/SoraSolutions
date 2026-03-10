# SORA SOLUTIONS — Project Context

## Project Overview
- **Client:** Joel Willis — ex-carpenter, founder of Sora Solutions
- **Business:** Trade automation agency for Australian tradies (plumbers, electricians, builders, roofers, landscapers, painters, concreters, HVAC)
- **Stack:** Next.js 15 (App Router, JavaScript, NO src/ directory) + Tailwind CSS v4 + Framer Motion
- **Design Reference:** Softriver.co aesthetic — premium, clean, trust-heavy
- **Theme:** Vibrant, light, glassmorphism, tech-forward but human
- **Pages:** Home, Services, About, Resources, Contact (5 pages only — no /results page)

## Critical Rules
- **NO inline style tags** — all styling must be Tailwind classes or globals.css. The ONLY exception is CSS custom properties needed for dynamic values (cursor position for tilt effects, Framer Motion style props)
- **NO src/ directory** — components live at /components/, app at /app/, hooks at /hooks/, lib at /lib/
- **Every section = its own component file** in components/home/
- **Every reusable UI element = its own component file** in components/ui/
- **Every effect = its own component file** in components/effects/
- **No height shifts** — animated elements must not cause layout shift. Use fixed heights or invisible sizers
- **max-w-7xl** on all section containers unless specifically noted otherwise
- **Mobile-first** — all components must be responsive

## Design System

### Colours (defined in @theme in globals.css)
- --color-primary: #2362fd (blue — CTAs, links, accents)
- --color-secondary: #fd6600 (orange — main CTA buttons, highlights)
- --color-accent: #fab347 (warm amber — gradients, hover states)
- --color-base: #ffffff (white base)
- --color-black: #000000 (text)

### Typography
- Display/Headings: Plus Jakarta Sans — font-extrabold or font-black
- Body: Plus Jakarta Sans — font-light (300 weight), tracking-wide
- Hero heading: text-5xl, tracking-tight/tighter
- Section headings: text-4xl, tracking-tight
- Body text: text-base, font-light, tracking-wide
- Button text: font-bold or font-semibold (heavier than body)
- WordFlip fonts: Oswald, Playfair Display, Space Mono, Bebas Neue, Raleway, Black Han Sans, Caveat, Barlow

### Spacing
- Section padding: py-[100px] unless noted otherwise
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Card border-radius: rounded-2xl
- Card gaps: gap-6 md:gap-8

### Glassmorphism
- Background: bg-white/50 to bg-white/70
- Blur: backdrop-blur-xl
- Border: border border-white/20
- Gradient border: 1.5px padding wrapper with linear-gradient(135deg, #2362fd, #fd6600)

### Gradient Text
- Blue to orange: background linear-gradient(135deg, #2362fd, #fd6600)
- Applied with bg-clip-text text-transparent

## Animation Defaults (Framer Motion)
- Fade up: from y:30 opacity:0 → y:0 opacity:1, duration 0.6s, easeOut
- Card stagger: 100ms between cards
- Headline text reveal: 0.4s per line, 0.2s delay between lines
- Card hover: translateY(-4px) + shadow increase, 0.3s
- Button hover: scale 1.02, 0.2s
- Accordion: smooth height + chevron 180° rotation
- Counter: 0 to target, ease-out cubic, ~2s, viewport triggered

## Site-Wide Background (layout.js)
- GradientBackground: fixed z-0 animated gradient blobs (blue + orange brand colours)
- GridOverlay: fixed z-1 subtle dot grid
- Both pointer-events-none, render behind all content

## Mobile
- Sticky bottom bar: click-to-call ONLY, fixed bottom, mobile only (lg:hidden)
- No floating phone button
- "Get Free Audit" lives inside mobile hamburger drawer only
- All hover → tap on mobile
- Exit intent: desktop only, once per session
