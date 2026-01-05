"use client";

import Image from "next/image";

export function SelectDropdownItem({ img, title, children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 hover:bg-zinc-100 cursor-pointer"
    >
      {img && (
        <div className="relative h-5 w-8">
          <Image src={img} alt={title} fill className="object-contain" />
        </div>
      )}
      <div className=" flex-1 flex flex-col text-sm text-zinc-900">
        {title && <div className="font-normal">{title}</div>}
        {children}
      </div>
    </div>
  );
}
