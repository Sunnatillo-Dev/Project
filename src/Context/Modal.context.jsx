import React, { createContext, useState } from "react";

export let ModalProvider = createContext(null);
function ModalContext({ children }) {
  let [isOpen, setIsOpen] = useState(false);
  let [LisOpen, setLIsOpen] = useState(false);
  return (
    <ModalProvider.Provider value={{ isOpen, setIsOpen, LisOpen, setLIsOpen }}>
      {children}
    </ModalProvider.Provider>
  );
}

export default ModalContext;
