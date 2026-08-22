import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import siteConfig from "@/content/site-config.json";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ChatWidgetWrapper from "@/components/chat/ChatWidgetWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        <ThemeProvider>
          {children}
          <ChatWidgetWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
