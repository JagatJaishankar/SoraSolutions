import { getAllSlugs, getArticleBySlug } from "@/lib/blogData";
import { parseBlogFile } from "@/lib/parseBlogHTML";
import ArticleLayout from "@/components/blog/ArticleLayout";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = getArticleBySlug(slug);
  if (!meta) return {};
  return {
    title: `${meta.title} — Sora Solutions`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "article",
      ...(meta.image && {
        images: [{ url: meta.image, width: 960, height: 420 }],
      }),
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const meta = getArticleBySlug(slug);
  if (!meta) return <div>Article not found</div>;

  const parsed = parseBlogFile(meta.file, meta.image ?? null);

  return (
    <ArticleLayout meta={meta} parsed={parsed} />
  );
}
