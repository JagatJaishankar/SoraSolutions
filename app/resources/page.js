import ResourcesHero from "@/components/resources/ResourcesHero";
import FeaturedArticles from "@/components/resources/FeaturedArticles";
import BlogGrid from "@/components/resources/BlogGrid";
import ComingSoon from "@/components/resources/ComingSoon";
import ResourcesCTA from "@/components/resources/ResourcesCTA";

export const metadata = {
  title: "Resources — Sora Solutions",
  description:
    "Free guides, tools and blog articles to help Australian tradies grow their business with digital marketing, SEO, Google Ads and automation.",
};

export default function ResourcesPage() {
  return (
    <div className="overflow-x-hidden">
      <ResourcesHero />
      <FeaturedArticles />
      <BlogGrid />
      <ComingSoon />
      <ResourcesCTA />
    </div>
  );
}
