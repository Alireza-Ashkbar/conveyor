"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Card, Pagination } from "@/components";
import { IconChevronDown, IconChevronUp, IconSearch, IconEye } from "@/Icons";
import Link from "next/link";

export default function DataGrid({
  data = [],
  columns = [],
  title = "Data List",
  searchPlaceholder = "Search...",
  isLoading = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  emptyMessage = "No data found.",
  primaryColumns = 2,
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);

  /* ---------- SEARCH (DESIGN-PRESERVING + SAFE) ---------- */
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    const lowerSearch = searchTerm.toLowerCase();

    return data.filter((item) =>
      columns.some((col) => {
        const value =
          col.searchKey !== undefined
            ? item[col.searchKey]
            : item[col.key];

        return String(value ?? "")
          .toLowerCase()
          .includes(lowerSearch);
      })
    );
  }, [data, columns, searchTerm]);

  /* ---------- EXPAND TOGGLE ---------- */
  const toggleExpand = (itemId) => {
    setExpandedRows((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const primaryCols = columns.slice(0, primaryColumns);
  const detailCols = columns.slice(primaryColumns);

  return (
    <Card className="overflow-hidden shadow-lg rounded-2xl">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-zinc-200">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            {title}
          </h2>

          <div className="relative w-full md:w-96">
            <IconSearch
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 pl-12 pr-6 rounded-xl border border-zinc-300 bg-white text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="p-16 text-center text-zinc-500 animate-pulse">
          Loading data...
        </div>
      ) : filteredData.length === 0 ? (
        <div className="p-16 text-center text-zinc-500">
          {emptyMessage}
        </div>
      ) : (
        <>
          {/* ---------- DESKTOP TABLE ---------- */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200">
              <thead className="bg-zinc-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className="px-6 py-4 text-left text-sm font-semibold text-zinc-700 uppercase tracking-wider"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-zinc-100">
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="hover:bg-zinc-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => item.link && router.push(item.link)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-6 py-4 text-sm text-zinc-900"
                      >
                        {col.render
                          ? col.render(item)
                          : item[col.key] || "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ---------- MOBILE & TABLET ---------- */}
          <div className="lg:hidden px-4 py-4 space-y-4">
            {filteredData.map((item, index) => {
              const itemId = item.id || index;
              const isExpanded = expandedRows.includes(itemId);

              return (
                <div
                  key={itemId}
                  className="bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow transition-shadow duration-200 overflow-hidden"
                >
                  {/* Summary */}
                  <div className="p-4 space-y-2.5">
                    {primaryCols.map((col) => {
                      const value = col.render
                        ? col.render(item)
                        : item[col.key];

                      if (!value) return null;

                      return (
                        <div key={col.key}>
                          <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                            {col.header}
                          </div>
                          <div className="mt-0.5 text-sm font-semibold text-zinc-900">
                            {value}
                          </div>
                        </div>
                      );
                    })}

                    {detailCols.length > 0 && (
                      <button
                        onClick={() => toggleExpand(itemId)}
                        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2.5 px-3 bg-zinc-100 hover:bg-zinc-200 rounded-lg text-sm font-medium text-zinc-700 transition-colors"
                      >
                        {isExpanded ? (
                          <>
                            <IconChevronUp size={16} />
                            Hide Details
                          </>
                        ) : (
                          <>
                            <IconChevronDown size={16} />
                            Show Details ({detailCols.length})
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Details */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isExpanded
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-zinc-100 space-y-2.5">
                      {detailCols.map((col) => {
                        const value = col.render
                          ? col.render(item)
                          : item[col.key];

                        if (!value) return null;

                        return (
                          <div key={col.key}>
                            <div className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                              {col.header}
                            </div>
                            <div className="mt-0.5 text-sm text-zinc-800">
                              {value}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* View Button */}
                  {item.link && (
                    <div className="px-4 pb-4">
                      <Link
                        href={item.link}
                        className="w-full btn btn-primary h-11 flex items-center justify-center gap-2 text-base font-medium"
                      >
                        <IconEye size={18} />
                        View Details
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-5 border-t border-zinc-200">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </Card>
  );
}
