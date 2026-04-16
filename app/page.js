import faqData from "@/lib/faqData";

export const metadata = {
  alternates: {
    canonical: "https://sora-solutions.vercel.app/",
  },
};

import HeroSection from "@/components/home/HeroSection";
import TrustBarSection from "@/components/home/TrustBarSection";
// import AuditFormSection from "@/components/home/AuditFormSection";
import ProblemCards from "@/components/home/ProblemCards";
import ServicesGrid from "@/components/home/ServicesGrid";
import WebsiteShowcase from "@/components/home/WebsiteShowcase";
import VideoSection from "@/components/home/VideoSection";
import ComparisonTable from "@/components/home/ComparisonTable";
import HowItWorks from "@/components/home/HowItWorks";
import WhatYouGet from "@/components/home/WhatYouGet";
import BuiltByTradie from "@/components/home/BuiltByTradie";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import FoundingMemberBlock from "@/components/home/FoundingMemberBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

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
      {/* <AuditFormSection /> */}
      <ProblemCards />
      <div className="bg-[#faf9ff] section-shadow">
        <ServicesGrid />
        <WebsiteShowcase />
      </div>
      {/* <VideoSection /> */}
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
