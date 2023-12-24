import React, { createContext, useState } from "react";

export let DynamicProvider = createContext(null);
const DynamicContext = ({ children }) => {
  let [userData, setUserData] = useState([]);
  let [newsData, setNewsData] = useState([]);
  let [scrollY, setScrollY] = useState(0);
  let [searchTitle, setSearchTitle] = useState("");

  return (
    <DynamicProvider.Provider
      value={{
        userData,
        setUserData,
        searchTitle,
        setSearchTitle,
        newsData,
        setNewsData,
        scrollY,
        setScrollY,
      }}
    >
      {children}
    </DynamicProvider.Provider>
  );
};

export default DynamicContext;
