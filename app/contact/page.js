import ContactHero from "@/components/contact/ContactHero";
import BookingSection from "@/components/contact/BookingSection";
import PhoneSection from "@/components/contact/PhoneSection";
import ContactForm from "@/components/contact/ContactForm";
import ContactFAQ from "@/components/contact/ContactFAQ";

export const metadata = {
  title: "Contact — Sora Solutions",
  description:
    "Book a free 30-minute strategy call with Joel. We will review your current marketing, show you where the biggest opportunities are, and give you a clear plan for your trade business.",
};

export default function ContactPage() {
  return (
    <div className="overflow-x-hidden">
      <ContactHero />
      <BookingSection />
      <PhoneSection />
      <ContactForm />
      <ContactFAQ />
    </div>
  );
}
