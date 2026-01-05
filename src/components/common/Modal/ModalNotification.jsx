"use client";

import { IconClose, IconDanger, IconWarning } from "@/Icons";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function ModalNotification({
  title = "",
  text = "",
  triggerText,
  triggerClass = "btn",
  confirmText,
  cancelText,
  showActions = true,
  onConfirm = () => {},
  onCancel = () => {},
  children,
  open: externalOpen,
  onClose: externalClose,
  type = "error", // "error" | "warning"
}) {
  const isControlled = typeof externalOpen === "boolean";
  const open = isControlled ? externalOpen : false; // If controlled, use external; otherwise, assume trigger manages it
  const handleClose = () => {
    onCancel();
    if (externalClose) externalClose();
  };

  const handleConfirm = () => {
    onConfirm();
    if (externalClose) externalClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && open) handleClose();
    };
    if (open) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Trigger Button (if provided) */}
      {triggerText && (
        <button className={triggerClass} onClick={externalClose}>
          {triggerText}
        </button>
      )}

      {/* Modal Portal */}
      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
          >
            {/* Modal Card */}
            <div
              className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Colored Header with Icon */}
              <div
                className={`relative h-20 flex items-end justify-center pb-8 ${
                  type === "error" ? "bg-red-500" : "bg-amber-500"
                }`}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition text-white"
                  aria-label="Close modal"
                >
                  <IconClose size={24} />
                </button>

                {/* Icon Circle */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center ring-8 ring-white">
                  {type === "error" ? (
                    <IconDanger size={48} />
                  ) : (
                    <IconWarning size={48} />
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 px-8 pt-12 pb-8 text-center">
                <h2 className="text-2xl font-semibold text-zinc-900 mb-4">{title}</h2>
                <p className="text-zinc-600 text-base leading-relaxed max-w-md mx-auto">
                  {text}
                </p>
                {children && <div className="mt-6">{children}</div>}
              </div>

              {/* Actions Footer */}
              {showActions && (
                <div className="px-8 pb-8 flex flex-col sm:flex-row gap-4 justify-center">
                  {cancelText && (
                    <button
                      onClick={handleClose}
                      className="px-8 py-3 rounded-xl font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition"
                    >
                      {cancelText}
                    </button>
                  )}
                  {confirmText && (
                    <button
                      onClick={handleConfirm}
                      className={`px-8 py-3 rounded-xl font-medium text-white transition ${
                        type === "error"
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-amber-500 hover:bg-amber-600"
                      }`}
                    >
                      {confirmText}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}