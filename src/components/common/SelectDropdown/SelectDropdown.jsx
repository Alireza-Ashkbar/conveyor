"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { IconChevronDown } from "@/Icons";

export function SelectDropdown({
  data = [],
  selectedCard = null,
  onSelect = () => {},
  loading = false,
  children,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  // close onclick outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (card) => {
    onSelect(card);
    setOpen(false);
  };

  if (!selectedCard) return null;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className="flex justify-between items-center cursor-pointer rounded-md px-2 py-2"
        onClick={() => setOpen(!open)}
      >
        {loading ? (
          <div className="h-5">
          loading...
          </div>
        ) : (
          <div className="flex items-center justify-start gap-2">
            <div className="relative h-5 w-8">
              <Image
                src={selectedCard.img}
                alt={selectedCard.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-zinc-900 text-sm font-normal">
              {selectedCard.name}
            </div>
            <div className="text-zinc-900 text-sm font-normal">
              {selectedCard.number}
            </div>
          </div>
        )}
        <IconChevronDown size={20} />
      </div>

      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-zinc-200 rounded-md shadow-lg">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex items-center gap-2 px-3 py-3 hover:bg-zinc-100 cursor-pointer"
              onClick={() => handleSelect(card)}
            >
              <div className="relative h-5 w-8">
                <Image
                  src={card.img}
                  alt={card.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-zinc-900 text-sm font-normal">
                {card.name}
              </div>
              <div className="text-zinc-900 text-sm font-normal">
                {card.number}
              </div>
            </div>
          ))}

          {children && (
            <div className="border-t border-zinc-100 px-3 py-2">{children}</div>
          )}
        </div>
      )}
    </div>
  );
}
