import dynamic from "next/dynamic";
import faqData from "@/lib/faqData";

export const metadata = {
  alternates: {
    canonical: "https://sora-solutions.vercel.app/",
  },
};

import HeroSection from "@/components/home/HeroSection";
import TrustBarSection from "@/components/home/TrustBarSection";
import ProblemCards from "@/components/home/ProblemCards";
import ServicesGrid from "@/components/home/ServicesGrid";
const WebsiteShowcase = dynamic(() => import("@/components/home/WebsiteShowcase"));

const VideoSection = dynamic(() => import("@/components/home/VideoSection"));
const WhatYouGet = dynamic(() => import("@/components/home/WhatYouGet"));
const ComparisonTable = dynamic(() => import("@/components/home/ComparisonTable"));
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"));
const BuiltByTradie = dynamic(() => import("@/components/home/BuiltByTradie"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const StatsSection = dynamic(() => import("@/components/home/StatsSection"));
const GuaranteeSection = dynamic(() => import("@/components/home/GuaranteeSection"));
const FoundingMemberBlock = dynamic(() => import("@/components/home/FoundingMemberBlock"));
const FAQSection = dynamic(() => import("@/components/home/FAQSection"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <TrustBarSection />
      <VideoSection />
      {/* <AuditFormSection /> */}
      <ProblemCards />
      <div className="bg-[#faf9ff] section-shadow">
        <ServicesGrid />
        <WebsiteShowcase />
      </div>
      <WhatYouGet />
      <ComparisonTable />
      <HowItWorks />
      <BuiltByTradie />
      <TestimonialsSection />
      <StatsSection />
      <GuaranteeSection />
      <FoundingMemberBlock />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
