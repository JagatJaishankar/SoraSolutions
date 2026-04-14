"use client";

import { motion } from "framer-motion";
import LogoLoop from "@/components/ui/LogoLoop";

// Row 1 — platform & tool integrations (filenames prefixed with 0-)
const platformLogos = [
  { src: "/images/trust-logos/0-google.png",    alt: "Google",    title: "Google"    },
  { src: "/images/trust-logos/0-stripe.png",    alt: "Stripe",    title: "Stripe"    },
  { src: "/images/trust-logos/0-xero.png",      alt: "Xero",      title: "Xero"      },
  { src: "/images/trust-logos/0-myob.png",      alt: "MYOB",      title: "MYOB"      },
  { src: "/images/trust-logos/0-afterpay.png",  alt: "Afterpay",  title: "Afterpay"  },
  { src: "/images/trust-logos/0-zip.png",       alt: "Zip",       title: "Zip"       },
  { src: "/images/trust-logos/0-servicem8.png", alt: "ServiceM8", title: "ServiceM8" },
  { src: "/images/trust-logos/0-tradify.png",   alt: "Tradify",   title: "Tradify"   },
  { src: "/images/trust-logos/0-simpro.png",    alt: "simPRO",    title: "simPRO"    },
];

// Row 2 — industry associations & channels (no 0- prefix)
const industryLogos = [
  { src: "/images/trust-logos/airtasker.png",                    alt: "Airtasker",                    title: "Airtasker"                    },
  { src: "/images/trust-logos/facebook.png",                     alt: "Facebook",                     title: "Facebook"                     },
  { src: "/images/trust-logos/hipages.png",                      alt: "hipages",                      title: "hipages"                      },
  { src: "/images/trust-logos/master-builders-australia.png",    alt: "Master Builders Australia",    title: "Master Builders Australia"    },
  { src: "/images/trust-logos/master-electricians-australia.png",alt: "Master Electricians Australia",title: "Master Electricians Australia"},
  { src: "/images/trust-logos/master-plumbers-australia.png",    alt: "Master Plumbers Australia",    title: "Master Plumbers Australia"    },
  { src: "/images/trust-logos/hia.svg",                          alt: "HIA",                          title: "HIA",  unoptimized: true      },
  { src: "/images/trust-logos/qbcc.svg",                         alt: "QBCC",                         title: "QBCC", unoptimized: true      },
];

export default function TrustBarSection() {
  return (
    <motion.section
      className="w-full py-20 overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="text-sm text-black/60 text-center tracking-wider mb-10 uppercase">
        Integrates with the tools tradies already use
      </p>

      <div className="flex flex-col gap-8">
        {/* Row 1 — left to right */}
        <LogoLoop
          logos={platformLogos}
          speed={60}
          direction="left"
          logoHeight={36}
          gap={72}
          hoverSpeed={20}
          scaleOnHover
          ariaLabel="Platform integrations"
        />

        {/* Row 2 — right to left */}
        <LogoLoop
          logos={industryLogos}
          speed={60}
          direction="right"
          logoHeight={36}
          gap={72}
          hoverSpeed={-20}
          scaleOnHover
          ariaLabel="Industry associations and channels"
        />
      </div>
    </motion.section>
  );
}
