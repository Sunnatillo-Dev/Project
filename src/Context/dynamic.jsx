import React, { createContext, useState } from "react";

export let DynamicProvider = createContext(null);
const DynamicContext = ({ children }) => {
  let [userData, setUserData] = useState([]);
  let [newsData, setNewsData] = useState([]);
  return (
    <DynamicProvider.Provider
      value={{ userData, setNewsData, setUserData, newsData }}
    >
      {children}
    </DynamicProvider.Provider>
  );
};

export default DynamicContext;
