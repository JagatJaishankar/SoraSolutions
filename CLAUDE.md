# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# SORA SOLUTIONS — Project Context

## Development Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (eslint.config.mjs, Next.js config)
```

No test framework is configured.

## Project Overview
- **Client:** Joel Willis — ex-carpenter, founder of Sora Solutions
- **Business:** Trade automation agency for Australian tradies (plumbers, electricians, builders, roofers, landscapers, painters, concreters, HVAC)
- **Stack:** Next.js 16 (App Router, JavaScript, NO src/ directory) + Tailwind CSS v4 + Framer Motion + React 19
- **React Compiler:** Enabled via `babel-plugin-react-compiler` in next.config.mjs (`reactCompiler: true`)
- **Path alias:** `@/` maps to project root (e.g. `@/components/ui/GlassCard`)
- **Design Reference:** Softriver.co aesthetic — premium, clean, trust-heavy
- **Theme:** Vibrant, light, glassmorphism, tech-forward but human
- **Pages:** Home, Services, About, Resources, Contact + Blog (with dynamic `[slug]` routes)

## Architecture

### Directory structure
```
app/                     # Next.js App Router pages
  layout.js              # Root layout — fonts, global backgrounds, Navbar, Footer
  page.js                # Home page
  blog/[slug]/           # Dynamic blog post pages
  resources/page.js      # Resources page
  about/ contact/ services/
components/
  home/                  # One component per homepage section
  layout/                # Navbar, Footer, MobileDrawer, StickyBottomCTA, ExitIntentPopup, ServicesDropdown
  ui/                    # Reusable UI primitives (GlassCard, PrimaryButton, SectionHeading, TiltCard, etc.)
  effects/               # Visual effects (GradientBackground, GridOverlay, FloatingLogos, OrbRevealLayer)
hooks/                   # useCountUp.js, useExitIntent.js
lib/                     # faqData.js (static data)
public/                  # Static assets (images, blog/)
```

### Root layout layers (bottom to top, all fixed/behind content)
1. `GradientBackground` — animated blobs (z-0)
2. `GridOverlay` — subtle grid (replaces PatternOverlay which is commented out)
3. `FloatingLogos` — floating trade brand logos
4. Content wrapper `div.relative.z-10` — Navbar + page + Footer + StickyBottomCTA + ExitIntentPopup

### Additional libraries in use
- `gsap` + `@gsap/react` — supplementary animations alongside Framer Motion
- `three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/rapier` — 3D effects
- `lucide-react` — icons
- `clsx` — conditional class merging

## Critical Rules
- **NO inline style tags** — all styling must be Tailwind classes or globals.css. The ONLY exception is CSS custom properties needed for dynamic values (cursor position for tilt effects, Framer Motion style props)
- **NO src/ directory** — components live at /components/, app at /app/, hooks at /hooks/, lib at /lib/
- **Every section = its own component file** in components/home/
- **Every reusable UI element = its own component file** in components/ui/
- **Every effect = its own component file** in components/effects/
- **No height shifts** — animated elements must not cause layout shift. Use fixed heights or invisible sizers
- **max-w-7xl** on all section containers unless specifically noted otherwise
- **Mobile-first** — all components must be responsive
- **STRICT COLOUR ENFORCEMENT** — only the 7 approved brand colours may be used anywhere. The ONLY exception is #F59E0B for gold star ratings in the Google Reviews section.

## Design System

### Colours — STRICTLY 7 colours only (defined in @theme in globals.css)
- --color-primary: #9740fe (Sora Violet — CTAs, links, accents, buttons, icons, active states)
- --color-secondary: #222872 (Intense Blue — dark accents, gradient endpoints, dark section backgrounds)
- --color-accent: #d9d0fb (Lilac — tints, hover states, badge backgrounds, icon containers, subtle fills)
- --color-base: #ffffff (White — dominant base, cards, glassmorphism)
- --color-black: #000000 (Black — body text, headings)
- --color-deep: #090b3c (Midnight Blue — footer, darkest backgrounds, Final CTA)
- --color-bluewhite: #f5f3ff (Blue White — alternating section backgrounds)

NO OTHER COLOURS ALLOWED. No orange, no blue (#2362fd), no green, no red, no amber.
Exception: #F59E0B for star ratings in reviews section ONLY.

### Typography
- Display/Headings: Maven Pro (--font-maven-pro) — font-extrabold or font-black
- Body: Poppins (--font-poppins) — font-light (300 weight), tracking-wide
- Hero heading: text-5xl, tracking-tight/tighter
- Section headings: text-4xl, tracking-tight
- Body text: text-base, font-light, tracking-wide
- Button text: font-bold or font-semibold (heavier than body)
- WordFlip base word ("Jobs."): Maven Pro (matches heading font)
- WordFlip spin fonts: Oswald, Playfair Display, Space Mono, Bebas Neue, Raleway, Black Han Sans, Caveat, Barlow

### Spacing
- Section padding: py-[100px] unless noted otherwise
- Container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
- Card border-radius: rounded-2xl
- Card gaps: gap-6 md:gap-8

### Glassmorphism
- Background: bg-white/80 (increased for readability over pattern background)
- Blur: backdrop-blur-xl
- Border: border border-white/20
- Gradient border: 1.5px padding wrapper with linear-gradient(135deg, #9740fe, #222872)

### Gradient Text
- Purple to indigo: background linear-gradient(135deg, #9740fe, #222872)
- Applied with bg-clip-text text-transparent

### Dark Sections
- Final CTA: bg-[#090b3c], text white, #9740fe glow accents
- Footer: bg-[#090b3c], text white with opacity, link hover: text-[#d9d0fb], social icon hover: text-[#9740fe]

### Badges & Pills
- All badges: bg-[#d9d0fb] text-[#9740fe] text-xs font-semibold px-3 py-1 rounded-full

### Icon Containers
- All icon circles: bg-[#d9d0fb] with icon in text-[#9740fe]

### Section Background Rhythm
- Alternating sections use bg-[#f5f3ff] (Blue White) for visual rhythm:
  - ProblemCards, ComparisonTable, WhatYouGet, StatsSection, TestimonialsSection, FAQSection
- Remaining sections stay on white/transparent base

## Animation Defaults (Framer Motion)
- Fade up: from y:30 opacity:0 → y:0 opacity:1, duration 0.6s, easeOut
- Card stagger: 100ms between cards
- Headline text reveal: 0.4s per line, 0.2s delay between lines
- Card hover: translateY(-4px) + shadow increase, 0.3s
- Button hover: scale 1.02, 0.2s
- Accordion: smooth height + chevron 180° rotation
- Counter: 0 to target, ease-out cubic, ~2s, viewport triggered

## Site-Wide Background (layout.js)
- GradientBackground: fixed z-0 animated gradient blobs (purple + indigo brand colours)
- GridOverlay: active — subtle grid pattern (PatternOverlay is currently commented out)
- FloatingLogos: floating trade brand logos layer
- All pointer-events-none, render behind all content (z-10 content wrapper sits above)

## Logo
- Logo image: /images/sora-logo.png (transparent PNG with purple S icon + "SoraSolutions" wordmark)
- Used in Navbar, Footer (with brightness-0 invert for dark bg), and MobileDrawer

## Mobile
- Sticky bottom bar: click-to-call ONLY, fixed bottom, mobile only (lg:hidden)
- No floating phone button
- "Get Free Audit" lives inside mobile hamburger drawer only
- All hover → tap on mobile
- Exit intent: desktop only, once per session
