import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nilesh Kumar",
  description:
    "Web Developer - Dedicated to building responsive and user-friendly digital interfaces. Connecting creative design with efficient technical implementation.",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans bg-black text-white antialiased`}
      >
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
