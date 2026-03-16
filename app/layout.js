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
  weight: ["400", "500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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

export const metadata = {
  title: "Sora Solutions — Marketing, AI & Growth Systems for Trades",
  description:
    "Trade automation agency helping Australian tradies get more jobs, leads, and growth with AI-powered marketing systems.",
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
        <div className="relative z-10 overflow-x-hidden w-full">
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
