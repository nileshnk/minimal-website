import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ThemeProvider from "@/contexts/ThemeContext";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "Portfolio - Nilesh Kumar",
  description: "A portfolio showcasing my work, blog, and contact info.",
};

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"] });

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-black dark:text-white transition-colors`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
