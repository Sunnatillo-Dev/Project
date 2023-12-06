import React, { createContext, useState } from "react";

export let ModalProvider = createContext(null);
function ModalContext({ children }) {
  let [isOpen, setIsOpen] = useState(false);
  return (
    <ModalProvider.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalProvider.Provider>
  );
}

export default ModalContext;
