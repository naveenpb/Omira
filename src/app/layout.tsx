import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant"
});

const manrope = Manrope({ 
  subsets: ["latin"], 
  variable: "--font-manrope" 
});

export const metadata: Metadata = {
  title: "Omira Wellness | Clinical Yoga & Rehabilitation",
  description: "Where Traditional Yoga Meets Empirical Medicine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="bg-[#FAF9F6] text-[#2A4032] font-sans antialiased selection:bg-[#C47C5D] selection:text-white">
        {/* We moved the UI logic into ConditionalLayout */}
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}