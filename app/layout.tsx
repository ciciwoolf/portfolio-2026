import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio | Your Name",
  description: "Full-stack developer specializing in modern web technologies and interactive 3D experiences",
  openGraph: {
    title: "Portfolio | Your Name",
    description: "Full-stack developer specializing in modern web technologies and interactive 3D experiences",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
