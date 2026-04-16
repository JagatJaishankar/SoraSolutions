// Override CSS variables defined in the article's embedded <style> block.
// This block renders AFTER the article's styles so it wins the cascade.
// CSS custom properties defined on .blog-content take priority over :root
// for all descendant elements (CSS inheritance).
const BRAND_OVERRIDES = `
  .blog-content {
    --font-heading: var(--font-maven-pro);
    --font-body: var(--font-poppins);
    --link: #9740fe;
    --link-hover: #222872;

    /* Remap off-brand greens */
    --emerald: #9740fe;
    --emerald-light: #d9d0fb;
    --emerald-border: #9740fe;

    /* Remap off-brand teals (article 08) */
    --teal: #222872;
    --teal-light: #d9d0fb;

    /* Remap off-brand oranges/ambers (article 08) */
    --amber-accent: #9740fe;
    --amber-light: #d9d0fb;
    --amber-border: #9740fe;
  }

  /* Force all CTA banners to use brand gradient */
  .blog-content .cta-banner {
    background: linear-gradient(135deg, #9740fe, #222872) !important;
  }

  /* Tip boxes that use off-brand accent colors */
  .blog-content .tip-box.amber,
  .blog-content .tip-box.teal {
    border-left-color: #9740fe !important;
    background: #d9d0fb !important;
  }

  /* Comparison table header cells */
  .blog-content .comp-table thead th:nth-child(2) {
    background: #9740fe !important;
  }
  .blog-content .comp-table thead th:nth-child(3) {
    background: #222872 !important;
  }

  /* Every article uses: nav { position: sticky; top: 0; z-index: 100 }
     After extracting content, the only <nav> elements left inside .blog-content
     are TOC navs (<nav class="toc">). Reset their positioning so they don't
     act as a sticky navbar. The .toc class styles handle their appearance. */
  .blog-content nav {
    position: static !important;
    top: auto !important;
    z-index: auto !important;
    height: auto !important;
  }

  /* Article image — constrained to content column width, site-standard border radius */
  .blog-content .hero-img {
    border-radius: 16px !important;
    overflow: hidden !important;
    margin-top: 40px !important;
    margin-bottom: 40px !important;
    max-width: 100% !important;
  }
  .blog-content .hero-img img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default function ArticleLayout({ meta, parsed }) {
  const { styleContent, mainHTML, jsonLd } = parsed;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      {/* Article embedded styles */}
      <style dangerouslySetInnerHTML={{ __html: styleContent }} />

      {/* Brand overrides — must come after article styles */}
      <style dangerouslySetInnerHTML={{ __html: BRAND_OVERRIDES }} />

      {/* Article content — uses .blog-content for CSS variable overrides */}
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: mainHTML }}
      />
    </>
  );
}
