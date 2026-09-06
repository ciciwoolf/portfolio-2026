import type { Metadata } from "next";
import { Nunito, Alegreya, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import siteConfig from "@/content/site-config.json";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ChatWidgetWrapper from "@/components/chat/ChatWidgetWrapper";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
  weight: ["400", "700", "900"],
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.titleTemplate,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.titleTemplate,
    description: siteConfig.seo.description,
    type: "website",
    url: siteConfig.seo.url,
    images: [
      {
        url: siteConfig.seo.image,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${alegreya.variable} ${sourceSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          {children}
          <ChatWidgetWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
