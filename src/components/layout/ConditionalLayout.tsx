"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";
import LeadCaptureModal from "../ui/LeadCaptureModal";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Catch both /admin and the automatic /studio redirects
  const isAdmin = pathname.startsWith("/admin") || pathname.startsWith("/studio");

  // If we are in the Sanity portal, return ONLY the raw workspace
  if (isAdmin) {
    return (
      <div className="bg-white text-black min-h-screen">
        {children}
      </div>
    );
  }

  // If we are on the public website, return the full Omira UI
  return (
    <SmoothScroll>
      <Navbar />
      {children}
      <Footer />
      <LeadCaptureModal />
    </SmoothScroll>
  );
}