"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link"; // فقط اگه از next/router استفاده می‌کنی

export const Dropdown = ({
  children,
  direction = "left",
  onSelect,
  buttonText,
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const buttonRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left:
          direction === "left"
            ? rect.left + window.scrollX
            : rect.right + window.scrollX,
      });
    }
  }, [open, direction]);

  const handleSelect = (item) => {
    if (onSelect) onSelect(item);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={buttonClassName}
        onClick={() => setOpen(!open)}
      >
        {buttonText}
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute min-w-32 w-max py-4 pl-4 pr-6 bg-white rounded-lg border border-zinc-100 z-50 shadow-md"
            style={{
              top: position.top,
              left: direction === "left" ? position.left : undefined,
              right:
                direction === "right"
                  ? window.innerWidth - position.left
                  : undefined,
            }}
          >
            <div className="flex flex-col gap-6">{children}</div>
          </div>,
          document.body
        )}
    </>
  );
};
