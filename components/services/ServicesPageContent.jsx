"use client";

import {
  Globe,
  Search,
  Target,
  Megaphone,
  Database,
  Brain,
} from "lucide-react";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceNavStrip from "@/components/services/ServiceNavStrip";
import ServiceSection from "@/components/services/ServiceSection";
import ServiceDivider from "@/components/services/ServiceDivider";
import AIHeading from "@/components/services/AIHeading";
import ROICalculator from "@/components/services/ROICalculator";
import ServicesClosingCTA from "@/components/services/ServicesClosingCTA";

export default function ServicesPageContent() {
  return (
    <>
      <ServicesHero />
      <ServiceNavStrip />

      {/* 01 — Websites */}
      <ServiceSection
        id="websites"
        number="01"
        icon={Globe}
        title="Websites"
        subtitle="Not a digital brochure — a conversion engine."
        description={
          "Custom-designed for your trade, optimised for Google, and built to turn visitors into booked jobs. Every Sora website comes with AI-powered chat built in.\n\nIt\u2019s the difference between a brochure and a salesperson that works 24/7."
        }
        inclusions={[
          "Custom design tailored to your trade and brand",
          "Done-for-you professional copywriting",
          "Mobile-responsive and fast-loading",
          "On-page SEO optimisation",
          "AI chatbot integration (24/7 lead capture)",
          "Work gallery / project showcase pages",
          "Google Analytics and conversion tracking",
          "Contact forms and click-to-call",
          "Google Business Profile integration",
          "2-3 week delivery from kickoff",
        ]}
        leadTimeBadge="Leads in 2-4 weeks"
        ctaText="Get Started with Websites"
        reversed={false}
        tinted={false}
        beforeContent="No website or an outdated template. Visitors leave. No leads captured."
        afterContent="Sora-built site with AI chat, trust signals, and conversion-optimised design. Leads captured 24/7."
      />

      <ServiceDivider
        topText="WEBSITES  HIGH-CONVERTING SITES  BUILT FOR YOUR TRADE"
        bottomText="SEO  GET FOUND ON GOOGLE  RANK HIGHER  LOCAL SEARCH"
      />

      {/* 02 — SEO */}
      <ServiceSection
        id="seo"
        number="02"
        icon={Search}
        title="SEO"
        subtitle="Be the first name they find."
        description={
          "Rank higher in Google Search and Maps so the right customers find you first. We build local authority through content, optimisation, and strategy that compounds over time.\n\nThe top 3 results in Google Maps get over 70% of all clicks. If you\u2019re not there, you\u2019re giving those jobs to someone else."
        }
        inclusions={[
          "Local keyword strategy",
          "Google Business Profile optimisation",
          "On-page SEO",
          "Content that ranks",
          "Review strategy",
          "AI search optimisation",
        ]}
        leadTimeBadge="Leads in 2-3 months"
        ctaText="Get Started with SEO"
        reversed={true}
        tinted={true}
        beforeContent="Invisible on Google. Page 4+. Competitors getting all the clicks."
        afterContent="Top 3 on Google Maps. Ranking for local keywords. Organic leads flowing daily."
      />

      {/* 03 — Pipeline & Follow-Up */}
      <ServiceSection
        id="crm"
        number="03"
        icon={Database}
        title="Pipeline & Follow-Up"
        subtitle="Every lead tracked. Every follow-up automated — nothing falls through the cracks."
        description={
          "One place for every lead, every message, every follow-up. Automated sequences fire within 60 seconds of a new enquiry. Nothing slips through the cracks. Ever.\n\nYour phone isn\u2019t a CRM. Right now your leads are scattered across voicemail, text messages, Facebook DMs, emails, and that notebook in your ute."
        }
        inclusions={[
          "Unified inbox (SMS, email, Facebook, Instagram, Google, WhatsApp)",
          "Visual pipeline",
          "60-second automated follow-up",
          "Missed call text-back",
          "Booking automation",
          "Mobile app",
          "Review automation",
          "Reporting dashboard",
        ]}
        leadTimeBadge="Instant impact"
        ctaText="Get Started with Pipeline & Follow-Up"
        reversed={false}
        tinted={false}
        beforeContent="Leads scattered across voicemail, texts, emails. Follow-ups forgotten."
        afterContent="Every lead in one place. 60-second auto follow-up. Nothing slips."
      />

      <ServiceDivider
        topText="PIPELINE & FOLLOW-UP  EVERY LEAD TRACKED  NOTHING FALLS THROUGH"
        bottomText="AI OPERATING SYSTEM  CUSTOM AGENTS  FULL AI SYSTEM"
      />

      {/* 04 — AI Operating System */}
      <ServiceSection
        id="ai"
        number="04"
        icon={Brain}
        title=""
        titleOverride={<AIHeading />}
        subtitle="AI operating systems for trade businesses."
        description={
          "This isn\u2019t a chatbot bolted onto your website. This is a full AI operating system \u2014 custom agents across every department of your business, from lead capture to project management to review generation.\n\nSora deploys custom AI agents tailored to your specific workflows. The kind of systems that make your business run like it has a full admin team \u2014 without the payroll."
        }
        inclusions={[
          "Custom AI agents across business pillars",
          "AI receptionist (voice AI)",
          "Intelligent lead qualification",
          "Automated review generation",
          "Smart follow-up sequences",
          "Workflow automation",
          "CRM intelligence and reporting",
        ]}
        leadTimeBadge="Instant impact"
        ctaText="Get Started with AI"
        reversed={true}
        tinted={true}
        beforeContent="Manual admin. Missed calls. Slow responses. Losing jobs to faster competitors."
        afterContent="AI handles calls, qualifies leads, books jobs, requests reviews. 24/7. No payroll."
      />

      {/* 05 — Google Ads */}
      <ServiceSection
        id="google-ads"
        number="05"
        icon={Target}
        title="Google Ads"
        subtitle="Stop wasting money on ads that don't convert."
        description={
          "Show up at the top of Google the day your campaign goes live. We build, manage, and optimise campaigns that bring in real enquiries \u2014 not just clicks and impressions.\n\nSora tracks every lead from the first click to the booked job. If an ad isn\u2019t bringing in real enquiries, we kill it. If it\u2019s working, we scale it."
        }
        inclusions={[
          "Full-funnel tracking",
          "AI-powered follow-up",
          "Trade-specific campaigns",
          "Landing pages that convert",
          "Ongoing optimisation",
          "Transparent reporting",
        ]}
        leadTimeBadge="Leads in 48 hours"
        ctaText="Get Started with Google Ads"
        reversed={false}
        tinted={false}
        beforeContent="Wasted ad spend. Clicks but no calls. Reports full of vanity metrics."
        afterContent="Every click tracked to a booked job. Cost per lead dropping monthly."
      />

      <ServiceDivider
        topText="GOOGLE ADS  TARGETED CAMPAIGNS  LEADS IN 48 HOURS"
        bottomText="SOCIAL ADS  REACH HOMEOWNERS  FILL YOUR PIPELINE"
      />

      {/* 06 — Facebook & Instagram Ads */}
      <ServiceSection
        id="social-ads"
        number="06"
        icon={Megaphone}
        title="Facebook & Instagram Ads"
        subtitle="Reach homeowners before they start searching."
        description={
          "Get in front of local homeowners before they start Googling. Social ads build awareness and generate demand \u2014 so your pipeline stays full even in quiet months.\n\nThis is how you stay busy during quiet months. This is how you fill your pipeline before your competitors even know there\u2019s demand."
        }
        inclusions={[
          "Scroll-stopping creative",
          "Precision targeting",
          "Lead form ads",
          "Retargeting",
          "A/B testing",
        ]}
        leadTimeBadge="Leads in 1-2 weeks"
        ctaText="Get Started with Social Ads"
        reversed={true}
        tinted={true}
        beforeContent="No social presence. Quiet months. Hoping the phone rings."
        afterContent="Pipeline full from social. Homeowners seeing your work before they even search."
      />

      <ROICalculator />
      <ServicesClosingCTA />
    </>
  );
}
