# Sora Blog Articles — Handover for Website Integration

**Date:** 18 March 2026
**From:** Joel Willis, Sora Business Solutions
**To:** Jagat (Website Builder)
**Total Articles:** 27

---

## Overview

This folder contains 27 SEO blog articles for the Sora Solutions website (sorasolution.com). Each article is a self-contained HTML file with all styling inline — no external CSS dependencies (only Google Fonts). These need to be integrated into the Sora Next.js website as blog pages.

---

## What's in Each File

Every HTML file includes:
- **Full article content** — ready to publish, no editing needed
- **Inline CSS** — all styles are in a `<style>` tag in the `<head>`
- **JSON-LD structured data** — Article + FAQPage schema for SEO rich results
- **Responsive design** — mobile breakpoints at 768px already built in
- **SVG graphics** — all visual elements (charts, mockups, icons) are inline SVG, zero external image dependencies
- **Navigation + Footer** — placeholder nav/footer included (replace with the site's actual nav/footer)

---

## How to Integrate

### Option A: Extract Content Only (Recommended)
1. For each HTML file, extract the content between the `<article>` tags
2. Pull the CSS custom properties and component styles from the `<style>` block
3. Drop into your Next.js blog template (which should already have the site nav, footer, and base styles)
4. The inline SVG graphics will work as-is — just paste the HTML

### Option B: Use as Full Pages
Each file works as a standalone HTML page. You could convert each to a Next.js page component, replacing the nav/footer with the site's shared components.

### Key Technical Notes
- **Fonts used:** Plus Jakarta Sans (headings) + Inter (body) — loaded from Google Fonts. Some articles may use Maven Pro + Poppins — standardise to whichever the main site uses.
- **Brand colours are CSS variables** at the top of each file's `<style>` block — easy to update globally
- **Internal links** between articles use relative paths like `/blog/seo-for-tradies` — these should match the final URL structure
- **All images are inline SVG** — no external image files to host or manage
- **FAQ sections** use `<details>/<summary>` or custom JS toggle — ensure the site's JS doesn't conflict

---

## URL Structure

Each file is named with a number prefix and slug. The suggested URL pattern:

```
sorasolution.com/blog/{slug}
```

For example:
- `01-google-reviews-trade-business.html` → `/blog/google-reviews-trade-business`
- `02-seo-for-tradies.html` → `/blog/seo-for-tradies`

The number prefix is just for ordering — don't include it in the URL.

---

## Article Inventory

### Pillar 1: SEO & Local Search (5 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 02 | 02-seo-for-tradies.html | SEO for Tradies: The Complete Guide to Getting Found on Google | Pillar | ~2,500 |
| 03 | 03-google-business-profile-tradies.html | Google Business Profile for Tradies: Setup & Optimisation Guide | Cluster | ~1,200 |
| 04 | 04-local-seo-tips-tradies.html | Local SEO Tips for Plumbers, Electricians & Builders | Cluster | ~1,200 |
| 17 | 17-seo-vs-google-ads-tradies.html | SEO vs Google Ads: Which Is Better for Tradies? | Cluster | ~1,200 |
| 18 | 18-rank-number-1-google-maps-tradie.html | How to Rank #1 in Google Maps as a Tradie | Cluster | ~1,200 |

### Pillar 2: Websites That Get Jobs (4 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 05 | 05-tradie-websites-dont-get-leads.html | Why Most Tradie Websites Don't Get Leads | Pillar | ~2,500 |
| 06 | 06-tradie-website-features-that-convert.html | 7 Features That Convert Visitors to Calls | Cluster | ~1,200 |
| 07 | 07-mobile-first-websites-tradies.html | Mobile-First Websites for Tradies | Cluster | ~1,200 |
| 20 | 20-tradie-website-homepage-converts.html | How to Write a Homepage That Converts | Cluster | ~1,200 |

### Pillar 3: Google Ads (2 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 08 | 08-google-ads-for-tradies.html | Google Ads for Tradies: Get More Jobs Without Wasting Money | Pillar | ~2,500 |
| 09 | 09-how-much-tradies-spend-google-ads.html | How Much Should a Tradie Spend on Google Ads? | Cluster | ~1,200 |

### Pillar 4: Social Media Marketing (3 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 11 | 11-facebook-marketing-for-tradies.html | Facebook Marketing for Tradies: A No-BS Guide | Pillar | ~2,500 |
| 12 | 12-tradie-marketing-stand-out.html | 10 Ways to Stand Out From Your Competition | Cluster | ~1,200 |
| 19 | 19-instagram-for-tradies.html | Instagram for Tradies: Is It Worth It? | Cluster | ~1,200 |

### Pillar 5: CRM & Automation (3 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 13 | 13-why-tradies-need-crm.html | Why Tradies Need a CRM | Cluster | ~1,200 |
| 23 | 23-best-crm-for-tradies-ghl.html | Best CRM for Tradies: Why GoHighLevel Wins | Pillar | ~2,500 |
| 24 | 24-lead-follow-up-automation-tradies.html | Automated Follow-Up for Tradies | Cluster | ~1,200 |

### Pillar 6: Reviews & Reputation (4 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 01 | 01-google-reviews-trade-business.html | How to Get More Google Reviews | Pillar | ~2,500 |
| 10 | 10-get-more-google-reviews-trade-business.html | Get More Google Reviews (Action Guide) | Cluster | ~1,200 |
| 22 | 22-automating-review-requests-tradies.html | Automating Your Review Requests | Cluster | ~1,200 |
| 25 | 25-responding-negative-reviews-tradies.html | How to Respond to Negative Reviews | Cluster | ~1,200 |

### Pillar 7: Growing a Trade Business (3 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 14 | 14-get-more-customers-tradie-2026.html | How to Get More Customers as a Tradie in 2026 | Pillar | ~2,500 |
| 26 | 26-tradie-business-growth-solo-to-team.html | From Solo Tradie to Business Owner | Cluster | ~1,200 |
| 27 | 27-pricing-trade-services-guide.html | How to Price Your Trade Services | Cluster | ~1,200 |

### Pillar 8: Industry-Specific Guides (3 articles)
| # | File | Title | Type | Words |
|---|------|-------|------|-------|
| 15 | 15-digital-marketing-plumbers.html | Digital Marketing for Plumbers | Cluster | ~1,200 |
| 16 | 16-electricians-get-more-jobs-online.html | How Electricians Get More Jobs Online | Cluster | ~1,200 |
| 21 | 21-digital-marketing-builders.html | Digital Marketing for Builders | Cluster | ~1,200 |

---

## SEO Notes

- **Internal linking:** Articles cross-link to each other. The links use relative paths (`/blog/slug`). Make sure the URL structure matches.
- **Pillar-cluster architecture:** Pillar pages are comprehensive (~2,500 words). Cluster pages support them (~1,200 words) and link back to the pillar. This builds topical authority with Google.
- **JSON-LD schema:** Every article has Article + FAQPage structured data in the `<head>`. This enables FAQ rich results in Google search.
- **Meta descriptions:** Each file has a `<meta name="description">` tag — these are optimised for click-through.
- **Publish dates:** All set to 2026-03-18 in the schema. Update if publishing on different dates.
- **Author:** All articles attributed to Joel Willis, Founder & Director, Sora Business Solutions.

---

## Blog Index Page

You'll also need a `/blog` index page that lists all articles. Suggested grouping: by pillar (as above) or by most recent. Each card should show the article title, excerpt (from meta description), and reading time.

---

## Questions?

Reach out to Joel on Upwork or at joel@sorasolution.com.
