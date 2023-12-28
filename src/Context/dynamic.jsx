import React, { createContext, useState } from "react";

export let DynamicProvider = createContext(null);
const DynamicContext = ({ children }) => {
  let [userData, setUserData] = useState([]);
  let [newsData, setNewsData] = useState([]);
  let [scrollY, setScrollY] = useState(0);
  let [searchRes, setSearchRes] = useState([]);
  let [openComment, setOpenComment] = useState(false);
  let [refreshForCommment, setRefreshForCommment] = useState(false);
  let [searchTitle, setSearchTitle] = useState("");
  return (
    <DynamicProvider.Provider
      value={{
        userData,
        refreshForCommment,
        setRefreshForCommment,
        searchRes,
        setSearchRes,
        setUserData,
        searchTitle,
        setSearchTitle,
        newsData,
        setNewsData,
        scrollY,
        setScrollY,
        openComment,
        setOpenComment,
      }}
    >
      {children}
    </DynamicProvider.Provider>
  );
};

export default DynamicContext;
