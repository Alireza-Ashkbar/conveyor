"use client";

import { Header } from "@/components";
import { Sidebar } from "@/components";
import { useState } from "react";

export default function PanelLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Fixed Sidebar (Desktop) */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen w-72 z-40">
        <Sidebar />
      </div>

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 lg:left-72 right-0 z-30 ">
        <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
      </div>

      {/* Main Content */}
      <main className="pt-16 lg:pl-72 bg-gray-50 min-h-screen  md:pt-20 lg:pt-20">
        {children}
      </main>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
}