import "./globals.css";
import { Crimson_Pro, DM_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";
import WebVitals from "@/components/WebVitals/WebVitals";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-crimson-pro",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-dm-mono",
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "Bondure | Construction Chemicals",
  description:
    "Bondure engineers high-performance mortars, adhesives, and construction chemicals built to bond, protect, and last.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${manrope.variable} ${crimsonPro.variable} ${dmMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem("bondure-theme")||"light";const l=localStorage.getItem("bondure-language")==="de"?"de":"en";const c=localStorage.getItem("bondure-consent")||document.cookie.includes("bondure_consent=yes");document.documentElement.dataset.theme=t;document.documentElement.dataset.consent=c?"saved":"pending";document.documentElement.style.colorScheme=t;document.documentElement.lang=l}catch(e){}` }} />
      </head>
      <body>
        <WebVitals />
        <ClientLayout siteChrome={<TopBar />}>
          {children}
        </ClientLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
