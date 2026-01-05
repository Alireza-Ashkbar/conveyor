"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconDashboard,
  IconDashboardFill,
  IconEquipment,
  IconEquipmentFill,
  IconAlert,
  IconAlertFill,
  IconLogout,
  IconMenu,
  IconClose,
} from "@/Icons";

export const Sidebar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data-driven menu items with unique icons
  const sidebarLinks = [
    {
      href: "/",
      label: "Dashboard",
      icon: IconDashboard,
      iconFill: IconDashboardFill,
    },
    {
      href: "/equipment-list",
      label: "Equipment List",
      icon: IconEquipment,
      iconFill: IconEquipmentFill,
    },
    {
      href: "/faults-alerts",
      label: "Faults & Alerts",
      icon: IconAlert,
      iconFill: IconAlertFill,
    },
  ];

  const isActive = (href) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  const renderNavLinks = () =>
    sidebarLinks.map(({ href, label, icon: Icon, iconFill: IconFill }) => (
      <li key={href}>
        <Link
          href={href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={`flex items-center gap-4 px-5 py-3.5 rounded-xl font-medium text-base transition-all duration-200 group
            ${isActive(href)
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-300 hover:bg-slate-700/70 hover:text-white"
            }`}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            {isActive(href) ? (
              <IconFill className="w-6 h-6 text-blue-200" />
            ) : (
              <Icon className="w-6 h-6 text-slate-400 group-hover:text-white transition" />
            )}
          </div>
          <span>{label}</span>
        </Link>
      </li>
    ));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white border-r border-slate-700 flex-col justify-between px-6 py-8 overflow-y-auto z-40">
        <div>
          {/* Logo */}
          <div className="relative w-40 h-8 mb-12">
            <Image
              src="/images/logo/logo-text.svg"
              alt="Conveyor Monitoring System"
              fill
              className="object-contain brightness-0 invert"
            />
          </div>

          <hr className="border-slate-700 mb-8" />

          {/* Navigation */}
          <nav>
            <ul className="space-y-1">{renderNavLinks()}</ul>
          </nav>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-slate-300 font-medium hover:bg-red-900/30 hover:text-red-300 transition duration-200 group">
          <IconLogout className="w-6 h-6 text-slate-400 group-hover:text-red-300 transition" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-xl border border-slate-200 hover:shadow-2xl transition"
      >
        <IconMenu size={24} className="text-slate-700" />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Mobile Sidebar Panel */}
        <aside
          className={`absolute top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl flex flex-col px-6 py-6 transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="relative w-36 h-7">
              <Image
                src="/images/logo/logo-text.svg"
                alt="Logo"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-slate-700/70 transition"
            >
              <IconClose size={24} />
            </button>
          </div>

          <hr className="border-slate-700 mb-8" />

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto pb-4">
            <ul className="space-y-1">{renderNavLinks()}</ul>
          </nav>

          {/* Logout */}
          <div className="border-t border-slate-700 pt-6">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl text-slate-300 font-medium hover:bg-red-900/40 hover:text-red-300 transition duration-200 group"
            >
              <IconLogout className="w-6 h-6 text-slate-400 group-hover:text-red-300 transition" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </>
  );
};