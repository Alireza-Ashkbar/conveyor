"use client";

import { createContext, useState, useCallback } from "react";
// import ModalContainer from "./ModalContainer";

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isOpen: false,
    content: null,
    title: "",
  });

  const openModal = useCallback((content, title = "") => {
    setModal({ isOpen: true, content, title });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, content: null, title: "" });
  }, []);

  return (
    <ModalContext.Provider value={{ ...modal, openModal, closeModal }}>
      {children}
      {/* <ModalContainer /> */}
    </ModalContext.Provider>
  );
}
