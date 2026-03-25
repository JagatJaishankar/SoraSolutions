import HeroSection from "@/components/home/HeroSection";
import TrustBarSection from "@/components/home/TrustBarSection";
import AuditFormSection from "@/components/home/AuditFormSection";
import ProblemCards from "@/components/home/ProblemCards";
import ServicesGrid from "@/components/home/ServicesGrid";
import WebsiteShowcase from "@/components/home/WebsiteShowcase";
import ComparisonTable from "@/components/home/ComparisonTable";
import HowItWorks from "@/components/home/HowItWorks";
import WhatYouGet from "@/components/home/WhatYouGet";
import BuiltByTradie from "@/components/home/BuiltByTradie";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import VideoGrid from "@/components/home/VideoGrid";
import ResultsSection from "@/components/home/ResultsSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import FoundingMemberBlock from "@/components/home/FoundingMemberBlock";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBarSection />
      <AuditFormSection />
      <ProblemCards />
      <ServicesGrid />
      <WebsiteShowcase />
      <ComparisonTable />
      <HowItWorks />
      <WhatYouGet />
      <BuiltByTradie />
      <TestimonialsSection />
      <StatsSection />
      <VideoGrid />
      <ResultsSection />
      <GuaranteeSection />
      <FoundingMemberBlock />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
