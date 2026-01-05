"use client";

export function Option({ value, children, onSelect }) {
  return (
    <div
      className="p-2 hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );
}
