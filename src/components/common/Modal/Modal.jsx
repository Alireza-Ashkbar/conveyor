// components/Modal.jsx
"use client";

import { IconClose } from "@/Icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function Modal({
  title = "",
  triggerText,
  triggerClass = "btn",
  confirmText,
  cancelText,
  showFooter = true,
  onConfirm = () => {},
  onCancel = () => {},
  children,
  open: externalOpen,
  onClose: externalClose,
  size = "md", // "sm" | "md" | "lg" | "xl"
  className = "",
}) {
  const isControlled = typeof externalOpen === "boolean";
  const open = isControlled ? externalOpen : useState(false)[0];
  const setOpen = isControlled ? externalClose : () => {};

  // Prevent background scroll + ESC close
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      const handleEsc = (e) => {
        if (e.key === "Escape") {
          onCancel();
          if (externalClose) externalClose(false);
        }
      };

      document.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [open, onCancel, externalClose]);

  const handleClose = () => {
    onCancel();
    if (externalClose) externalClose(false);
  };

  const handleConfirm = () => {
    onConfirm();
    if (externalClose) externalClose(false);
  };

  // Responsive width classes
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  }[size] || "max-w-lg";

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-6 sm:p-0"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      {/* Modal Card - Slide up from bottom on mobile */}
      <div
        className={`
          relative w-full ${sizeClasses}
          bg-white rounded-2xl shadow-2xl overflow-hidden
          flex flex-col
          max-h-full
          animate-in fade-in slide-in-from-bottom-12 duration-300
          sm:animate-in fade-in zoom-in-95
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5 border-b border-zinc-200">
          <h2 className="text-lg sm:text-2xl font-semibold text-zinc-900 pr-8 line-clamp-2">
            {title}
          </h2>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-zinc-100 transition-colors sm:static sm:p-2.5"
            aria-label="Close modal"
          >
            <IconClose size={22} className="text-zinc-600" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {children}
        </div>

        {/* Footer - Full width buttons on mobile */}
        {showFooter && (confirmText || cancelText) && (
          <div className="border-t border-zinc-200 px-5 py-4 sm:px-6 sm:py-5 bg-zinc-50/80">
            <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
              {cancelText && (
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto btn btn-outline h-12 px-6 text-base font-medium"
                >
                  {cancelText}
                </button>
              )}
              {confirmText && (
                <button
                  onClick={handleConfirm}
                  className="w-full sm:w-auto btn btn-primary h-12 px-8 text-base font-medium"
                >
                  {confirmText}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}