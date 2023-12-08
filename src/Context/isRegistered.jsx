import React, { createContext, useEffect, useState } from "react";
import userData from "@/data/users/login.json";
export let RegisterProvider = createContext(null);
function IsRegistered({ children }) {
  let [isRegister, setIsRegister] = useState(null);
  useEffect(() => {
    if (userData?.id) {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }, []);
  return (
    <RegisterProvider.Provider value={{ isRegister, setIsRegister }}>
      {children}
    </RegisterProvider.Provider>
  );
}

export default IsRegistered;
