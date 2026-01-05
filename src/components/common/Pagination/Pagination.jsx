"use client";

import { IconChevronLeft, IconChevronRight } from "@/Icons";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-8 bg-white rounded-sm border border-transparent text-slate-700 flex justify-center items-center disabled:opacity-50"
      >
        <IconChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`size-8 rounded-lg border text-sm font-bold flex justify-center items-center ${
            currentPage === page
              ? "bg-slate-700 text-white border-slate-700"
              : "bg-white text-slate-700 border-zinc-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="size-8 bg-white rounded-sm border border-transparent text-slate-700 flex justify-center items-center disabled:opacity-70"
      >
        <IconChevronRight />
      </button>
    </div>
  );
}
