"use client";

import Link from "next/link";

export const DropdownItem = ({ children, type = "div", href, onClick }) => {

        const baseClass =
      "flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded text-sm text-gray-600";



  if (type === "link" && href) {
    return (
      <Link
        href={href}
        className={baseClass}
      >
        {children}
      </Link>
    );
  }

  if (type === "button" && onClick) {
    return (
      <button
        onClick={onClick}
        type="button"
        className={baseClass + " w-full text-left"}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={baseClass}>
      {children}
    </div>
  );
};
