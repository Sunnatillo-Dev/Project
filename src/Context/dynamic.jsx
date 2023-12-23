import React, { createContext, useState } from "react";

export let DynamicProvider = createContext(null);
const DynamicContext = ({ children }) => {
  let [userData, setUserData] = useState([]);
  let [newsData, setNewsData] = useState([]);
  let [scrollY, setScrollY] = useState(0);
  return (
    <DynamicProvider.Provider
      value={{
        userData,
        setNewsData,
        setUserData,
        newsData,
        setScrollY,
        scrollY,
      }}
    >
      {children}
    </DynamicProvider.Provider>
  );
};

export default DynamicContext;
