const articles = [
  {
    slug: "google-reviews-trade-business",
    file: "_source/blog/01-google-reviews-trade-business.html",
    image: "/images/blog/01-google-reviews.webp",
    title: "How to Get More Google Reviews for Your Trade Business",
    description:
      "A practical guide for Australian tradies to get more Google reviews, rank higher in local search, and win more jobs. No gimmicks — just what actually works.",
    category: "Reviews & Reputation",
    type: "pillar",
    readTime: "7 min read",
  },
  {
    slug: "seo-for-tradies",
    file: "_source/blog/02-seo-for-tradies.html",
    image: "/images/blog/05-seo-tradies.webp",
    title: "SEO for Tradies: The Complete Guide to Getting Found on Google",
    description:
      "The complete SEO guide for Australian tradies. Learn how to rank higher on Google, dominate local search, and get more calls from customers in your area.",
    category: "SEO & Local Search",
    type: "pillar",
    readTime: "12 min read",
  },
  {
    slug: "google-business-profile-tradies",
    file: "_source/blog/03-google-business-profile-tradies.html",
    image: "/images/blog/06-gbp-setup.webp",
    title: "Google Business Profile for Tradies: Setup & Optimisation Guide",
    description:
      "Step-by-step guide to setting up and optimising your Google Business Profile as a tradie. Get found on Google Maps and win more local jobs.",
    category: "SEO & Local Search",
    type: "cluster",
    readTime: "5 min read",
  },
  {
    slug: "local-seo-tips-tradies",
    file: "_source/blog/04-local-seo-tips-tradies.html",
    image: "/images/blog/07-local-seo-tips.webp",
    title: "Local SEO Tips for Plumbers, Electricians & Builders in Australia",
    description:
      "Practical local SEO tips for Australian tradies. Learn how plumbers, electricians and builders can rank higher in Google local results and win more jobs.",
    category: "SEO & Local Search",
    type: "cluster",
    readTime: "6 min read",
  },
  {
    slug: "tradie-websites-dont-get-leads",
    file: "_source/blog/05-tradie-websites-dont-get-leads.html",
    image: "/images/blog/10-tradie-websites-broken.webp",
    title: "Why Most Tradie Websites Don't Get Leads (And How to Fix Yours)",
    description:
      "Most tradie websites look good but generate zero leads. Here are the 5 biggest mistakes and exactly how to fix them to get more calls and booked jobs.",
    category: "Websites",
    type: "pillar",
    readTime: "10 min read",
  },
  {
    slug: "tradie-website-features-that-convert",
    file: "_source/blog/06-tradie-website-features-that-convert.html",
    image: "/images/blog/11-good-tradie-website.webp",
    title: "What Makes a Good Tradie Website? 7 Features That Convert Visitors to Calls",
    description:
      "Discover the 7 features every tradie website needs to convert visitors into calls and booked jobs. Mobile design, click-to-call, reviews and more.",
    category: "Websites",
    type: "cluster",
    readTime: "6 min read",
  },
  {
    slug: "mobile-first-websites-tradies",
    file: "_source/blog/07-mobile-first-websites-tradies.html",
    image: "/images/blog/12-mobile-first.webp",
    title: "Mobile-First Websites for Tradies: Why It Matters in 2026",
    description:
      "More than half your customers are finding you on their phone. If your tradie website doesn't work on mobile, you're losing jobs. Here's what to do about it.",
    category: "Websites",
    type: "cluster",
    readTime: "5 min read",
  },
  {
    slug: "google-ads-for-tradies",
    file: "_source/blog/08-google-ads-for-tradies.html",
    image: "/images/blog/14-google-ads-tradies.webp",
    title: "Google Ads for Tradies: How to Get More Jobs Without Wasting Money",
    description:
      "Learn how Google Ads can get your trade business more jobs. Setup guide, budget benchmarks, keyword tips and common mistakes to avoid.",
    category: "Google Ads",
    type: "pillar",
    readTime: "10 min read",
  },
  {
    slug: "how-much-tradies-spend-google-ads",
    file: "_source/blog/09-how-much-tradies-spend-google-ads.html",
    image: "/images/blog/15-google-ads-budget.webp",
    title: "How Much Should a Tradie Spend on Google Ads?",
    description:
      "The definitive guide to Google Ads budgets for Australian tradies. Real CPC benchmarks, budget tiers, ROI examples and how to calculate what to spend.",
    category: "Google Ads",
    type: "cluster",
    readTime: "5 min read",
  },
  {
    slug: "get-more-google-reviews-trade-business",
    file: "_source/blog/10-get-more-google-reviews-trade-business.html",
    image: "/images/blog/04-more-reviews.webp",
    title: "How to Get More Google Reviews for Your Trade Business",
    description:
      "A practical guide for tradies on how to get more Google reviews, automate review requests, and build a 5-star reputation that wins more jobs.",
    category: "Reviews & Reputation",
    type: "cluster",
    readTime: "9 min read",
  },
  {
    slug: "facebook-marketing-for-tradies",
    file: "_source/blog/11-facebook-marketing-for-tradies.html",
    image: "/images/blog/16-facebook-tradies.webp",
    title: "Facebook Marketing for Tradies: A No-BS Guide",
    description:
      "Facebook marketing for tradies explained simply. Learn how to set up your page, what content gets leads, how to run ads, and avoid the mistakes that waste money.",
    category: "Social Media",
    type: "pillar",
    readTime: "5 min read",
  },
  {
    slug: "tradie-marketing-stand-out",
    file: "_source/blog/12-tradie-marketing-stand-out.html",
    image: "/images/blog/17-tradie-marketing.webp",
    title: "Tradie Marketing: 10 Ways to Stand Out From Your Competition",
    description:
      "Most tradies rely on word of mouth and hope the phone rings. Here are 10 practical tradie marketing ideas to actually stand out and win more jobs.",
    category: "Social Media",
    type: "cluster",
    readTime: "7 min read",
  },
  {
    slug: "why-tradies-need-crm",
    file: "_source/blog/13-why-tradies-need-crm.html",
    image: "/images/blog/19-crm-tradies.webp",
    title: "Why Tradies Need a CRM (And How to Choose One)",
    description:
      "Losing leads because you're too busy on the tools? A CRM fixes that. Here's what tradie CRM software does, which options to compare, and what to look for when choosing.",
    category: "Pipeline & Follow-Up",
    type: "cluster",
    readTime: "6 min read",
  },
  {
    slug: "get-more-customers-tradie-2026",
    file: "_source/blog/14-get-more-customers-tradie-2026.html",
    image: "/images/blog/22-more-customers.webp",
    title: "How to Get More Customers as a Tradie in 2026",
    description:
      "Still relying on word of mouth? Here's how tradies are winning more jobs in 2026 — proven customer acquisition strategies that actually work for trade businesses.",
    category: "Business Growth",
    type: "pillar",
    readTime: "12 min read",
  },
  {
    slug: "digital-marketing-plumbers",
    file: "_source/blog/15-digital-marketing-plumbers.html",
    image: "/images/blog/25-plumber-digital.webp",
    title: "Digital Marketing for Plumbers: The Complete Guide",
    description:
      "A complete guide to digital marketing for plumbers in Australia — SEO, Google Ads, your website, Google Business Profile, and the full marketing stack to keep your phone ringing.",
    category: "Industry Guides",
    type: "cluster",
    readTime: "12 min read",
  },
  {
    slug: "electricians-get-more-jobs-online",
    file: "_source/blog/16-electricians-get-more-jobs-online.html",
    image: "/images/blog/26-electrician-jobs.webp",
    title: "How Electricians Can Get More Jobs Online",
    description:
      "Learn how to get more electrical jobs online with SEO, Google Ads, a conversion-ready website, and automated follow-up. Practical guide for Australian electricians.",
    category: "Industry Guides",
    type: "cluster",
    readTime: "12 min read",
  },
  {
    slug: "seo-vs-google-ads-tradies",
    file: "_source/blog/17-seo-vs-google-ads-tradies.html",
    image: "/images/blog/08-seo-vs-ads.webp",
    title: "SEO vs Google Ads: Which Is Better for Tradies?",
    description:
      "SEO vs Google Ads for tradies — a complete comparison. Find out which delivers better ROI, when to use each, and the smart strategy that combines both for maximum leads.",
    category: "SEO & Local Search",
    type: "cluster",
    readTime: "8 min read",
  },
  {
    slug: "rank-number-1-google-maps-tradie",
    file: "_source/blog/18-rank-number-1-google-maps-tradie.html",
    image: "/images/blog/09-rank-google-maps.webp",
    title: "How to Rank #1 in Google Maps as a Tradie",
    description:
      "The #1 spot in Google Maps captures almost half of all local search clicks. Here's exactly how Australian tradies can dominate the local map pack and win more jobs.",
    category: "SEO & Local Search",
    type: "cluster",
    readTime: "7 min read",
  },
  {
    slug: "instagram-for-tradies",
    file: "_source/blog/19-instagram-for-tradies.html",
    image: "/images/blog/18-instagram-tradies.webp",
    title: "Instagram for Tradies: Is It Worth It?",
    description:
      "Instagram for tradies — is it actually worth your time? Learn which content types book jobs, how to grow without wasting hours, and whether Instagram or Facebook is better for your trade business.",
    category: "Social Media",
    type: "cluster",
    readTime: "6 min read",
  },
  {
    slug: "tradie-website-homepage-converts",
    file: "_source/blog/20-tradie-website-homepage-converts.html",
    image: "/images/blog/13-homepage-converts.webp",
    title: "How to Write a Tradie Website Homepage That Converts",
    description:
      "Your tradie website homepage is where jobs are won or lost. Learn the 6 sections every trade homepage needs, copy that converts, and a launch checklist to get more calls.",
    category: "Websites",
    type: "cluster",
    readTime: "7 min read",
  },
  {
    slug: "digital-marketing-builders",
    file: "_source/blog/21-digital-marketing-builders.html",
    image: "/images/blog/27-builder-digital.webp",
    title: "Digital Marketing for Builders: Complete Guide",
    description:
      "A complete guide to digital marketing for builders in Australia — project portfolios, SEO, Google Ads, Google Business Profile, and the full marketing stack to win more high-value construction jobs.",
    category: "Industry Guides",
    type: "cluster",
    readTime: "13 min read",
  },
  {
    slug: "automating-review-requests-tradies",
    file: "_source/blog/22-automating-review-requests-tradies.html",
    image: "/images/blog/02-automate-reviews.webp",
    title: "Automating Your Review Requests: A Guide for Tradies",
    description:
      "Asking for reviews manually is painful and inconsistent. Here's how to automate your Google review requests so you get more 5-star reviews on autopilot.",
    category: "Reviews & Reputation",
    type: "cluster",
    readTime: "8 min read",
  },
  {
    slug: "best-crm-for-tradies-ghl",
    file: "_source/blog/23-best-crm-for-tradies-ghl.html",
    image: "/images/blog/20-best-crm.webp",
    title: "Best CRM for Tradies in 2026: Why GoHighLevel Wins",
    description:
      "We compared every major CRM for tradies — GoHighLevel, ServiceM8, Tradify, Jobber, Fergus. Here's which one actually helps you get more jobs and grow.",
    category: "Pipeline & Follow-Up",
    type: "pillar",
    readTime: "11 min read",
  },
  {
    slug: "lead-follow-up-automation-tradies",
    file: "_source/blog/24-lead-follow-up-automation-tradies.html",
    image: "/images/blog/21-automated-followup.webp",
    title: "Stop Losing Leads: Automated Follow-Up for Tradies",
    description:
      "Most tradies quote a job, hear 'I'll think about it,' and never follow up. Here's how automated follow-up sequences recover those leads and book more jobs — on autopilot.",
    category: "Pipeline & Follow-Up",
    type: "cluster",
    readTime: "8 min read",
  },
  {
    slug: "responding-negative-reviews-tradies",
    file: "_source/blog/25-responding-negative-reviews-tradies.html",
    image: "/images/blog/03-negative-reviews.webp",
    title: "How to Respond to Negative Reviews as a Tradie (Without Making It Worse)",
    description:
      "One bad Google review doesn't have to sink your reputation. Learn the 5-step response framework, templates, and exactly what to say when a negative review lands.",
    category: "Reviews & Reputation",
    type: "cluster",
    readTime: "7 min read",
  },
  {
    slug: "tradie-business-growth-solo-to-team",
    file: "_source/blog/26-tradie-business-growth-solo-to-team.html",
    image: "/images/blog/23-solo-to-owner.webp",
    title: "From Solo Tradie to Trade Business Owner: A Growth Roadmap",
    description:
      "Turning down work but not sure how to grow? Here's the exact roadmap to go from solo operator to trade business owner — the 5 stages, the systems you need, and how to hire your first employee.",
    category: "Business Growth",
    type: "cluster",
    readTime: "12 min read",
  },
  {
    slug: "pricing-trade-services-guide",
    file: "_source/blog/27-pricing-trade-services-guide.html",
    image: "/images/blog/24-pricing-services.webp",
    title: "How to Price Your Trade Services (Without Underselling Yourself)",
    description:
      "Most tradies undercharge by at least 15%. Learn how to price your trade services correctly in Australia — with real benchmarks, a pricing calculator and strategies to raise rates without losing clients.",
    category: "Business Growth",
    type: "cluster",
    readTime: "8 min read",
  },
];

export const CATEGORIES = [
  "Reviews & Reputation",
  "SEO & Local Search",
  "Websites",
  "Google Ads",
  "Social Media",
  "Pipeline & Follow-Up",
  "Business Growth",
  "Industry Guides",
];

export const getAllSlugs = () => articles.map((a) => a.slug);
export const getArticleBySlug = (slug) => articles.find((a) => a.slug === slug) ?? null;
export const getAllArticles = () => articles;
export const getPillarArticles = () => articles.filter((a) => a.type === "pillar");
