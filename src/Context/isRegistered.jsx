import React, { createContext, useState } from "react";

export let RegisterProvider = createContext(null);
function IsRegistered({ children }) {
  let [isRegister, setIsRegister] = useState(false);
  return (
    <RegisterProvider.Provider value={{ isRegister, setIsRegister }}>
      {children}
    </RegisterProvider.Provider>
  );
}

export default IsRegistered;
