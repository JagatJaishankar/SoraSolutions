import AboutHero from "@/components/about/AboutHero";
import JoelTimeline from "@/components/about/JoelTimeline";
import AboutVideo from "@/components/about/AboutVideo";
import ValuesBento from "@/components/about/ValuesBento";
import VisionSection from "@/components/about/VisionSection";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About — Sora Solutions",
  description:
    "Built by a tradie who has been there. Joel Willis spent 6 years as a carpenter, got his builder licence, and built Sora to give every trade business the marketing and systems they deserve.",
};

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      <AboutHero />
      <JoelTimeline />
      <AboutVideo />
      <ValuesBento />
      <VisionSection />
      <AboutCTA />
    </div>
  );
}
