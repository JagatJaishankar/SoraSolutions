import fs from "fs";
import path from "path";

export function parseBlogFile(filePath) {
  const html = fs.readFileSync(path.join(process.cwd(), filePath), "utf-8");

  // Extract <style> block, strip @import, then scope all structural rules to
  // .blog-content using CSS @scope so they don't leak into the site's Navbar/Footer.
  // The :root { --variable } block is kept global (harmless — just custom property
  // definitions) so that var() references inside the article CSS still resolve.
  const styleRaw = html.match(/<style>([\s\S]*?)<\/style>/)?.[1] ?? "";
  const noImport = styleRaw.replace(/@import\s+url\([^)]+\);?\s*/g, "");

  // Separate ALL :root variable blocks from everything else.
  // Handles both minified `:root{` and spaced `:root {` forms.
  const rootBlocks = noImport.match(/:root\s*\{[^}]*\}/g) ?? [];
  const rootBlock = rootBlocks.join("\n");
  const otherCSS = noImport.replace(/:root\s*\{[^}]*\}/g, "").trim();

  // Wrap structural/visual rules in @scope so they only apply within .blog-content
  const scopedCSS = otherCSS ? `@scope (.blog-content) { ${otherCSS} }` : "";
  const styleContent = [rootBlock, scopedCSS].filter(Boolean).join("\n");

  // Extract main content: everything after the FIRST </nav> (the article's
  // placeholder nav) and before <footer. Re-join on "</nav>" so that any
  // additional <nav> elements inside the article (e.g. TOC navs) are preserved.
  const navParts = html.split("</nav>");
  const afterNav = navParts.length > 1 ? navParts.slice(1).join("</nav>") : "";
  const mainHTML = afterNav.split("<footer")[0]?.trim() ?? "";

  // Extract JSON-LD structured data
  const jsonLd =
    html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1] ?? null;

  return { styleContent, mainHTML, jsonLd };
}
