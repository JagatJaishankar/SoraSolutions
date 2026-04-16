import {
  Maven_Pro,
  Poppins,
  Oswald,
  Playfair_Display,
  Space_Mono,
  Bebas_Neue,
  Raleway,
  Black_Han_Sans,
  Caveat,
  Barlow,
  Roboto_Flex,
} from "next/font/google";
import "./globals.css";
import { GradientBackground } from "@/components/effects/GradientBackground";
import { GridOverlay } from "@/components/effects/GridOverlay";
// import { PatternOverlay } from "@/components/effects/PatternOverlay";
import FloatingLogos from "@/components/effects/FloatingLogos";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyBottomCTA from "@/components/layout/StickyBottomCTA";
import ExitIntentPopup from "@/components/layout/ExitIntentPopup";

const mavenPro = Maven_Pro({
  variable: "--font-maven-pro",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "600", "700"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["700"],
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han",
  subsets: ["latin"],
  weight: ["400"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["700"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["600", "800"],
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  axes: ["wght"],
});

export const metadata = {
  title: "Sora Solutions — Marketing, AI & Growth Systems for Trades",
  description:
    "Trade automation agency helping Australian tradies get more jobs, leads, and growth with AI-powered marketing systems.",
  openGraph: {
    title: "Sora Solutions — Marketing, AI & Growth Systems for Trades",
    description:
      "Trade automation agency helping Australian tradies get more jobs, leads, and growth with AI-powered marketing systems.",
    url: "https://sora-solutions.vercel.app/",
    siteName: "Sora Solutions",
    // og:image — update this path once the image asset is ready
    images: [
      {
        url: "https://sora-solutions.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sora Solutions — Marketing, AI & Growth Systems for Trades",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sora Solutions — Marketing, AI & Growth Systems for Trades",
    description:
      "Trade automation agency helping Australian tradies get more jobs, leads, and growth with AI-powered marketing systems.",
    images: ["https://sora-solutions.vercel.app/images/og-image.jpg"],
  },
};

const fontVars = [
  mavenPro,
  poppins,
  oswald,
  playfair,
  spaceMono,
  bebasNeue,
  raleway,
  blackHanSans,
  caveat,
  barlow,
  robotoFlex,
]
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fontVars} font-[family-name:var(--font-poppins)] antialiased overflow-x-hidden w-full max-w-full`}
      >
        <GradientBackground />
        <GridOverlay />
        <FloatingLogos />
        <div className="relative z-10 w-full">
          <Navbar />
          {children}
          <Footer />
          <StickyBottomCTA />
          <ExitIntentPopup />
        </div>
      </body>
    </html>
  );
}
