"use client";

import Image from "next/image";
import Link from "next/link"; // Import Link for navigation

export const Header = () => {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-neutral-200 dark:border-slate-700 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-sm">
      {/* Left side - Space for future elements (e.g., logo, title) */}
      <div className="flex items-center">
        {/* Optional: Add a logo or app name later */}
      </div>

      {/* Right side - Notifications + User Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition">
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Clickable User Profile - Wrap with Link */}
        <Link href="/profile" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 dark:group-hover:ring-blue-400 transition-all duration-200">
            <Image
              src="/images/avatar.png"
              alt="Kiarashuix profile"
              fill
              className="object-cover"
            />
          </div>

          {/* Username & Role - Hidden on mobile, visible on sm+ */}
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Kiarashuix
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Administrator
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};