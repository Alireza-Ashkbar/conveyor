"use client";

import { IconChevronDown } from "@/Icons";
import { useState, Children, cloneElement, useRef, useEffect } from "react";

// Select component
export function Select({ value, onChange, children, className, ...rest }) {
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

  // Find selected label
  const selectedChild = Children.toArray(children).find(
    (child) => child.props.value === value
  );

  return (
    <div className="relative" ref={dropdownRef} {...rest}>
      {/* Selected value */}
      <div
        className={`flex items-center justify-between gap-4 cursor-pointer ${className}`}
        onClick={() => setOpen(!open)}
      >
        <span className="w-max">
          {selectedChild ? selectedChild.props.children : "Select..."}
        </span>

        <IconChevronDown />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute mt-1 bg-white w-full z-10 min-w-40 rounded-lg border border-zinc-100 shadow-md text-base">
          {Children.map(children, (child) =>
            cloneElement(child, {
              onSelect: (val) => {
                onChange(val);
                setOpen(false);
              },
            })
          )}
        </div>
      )}
    </div>
  );
}
