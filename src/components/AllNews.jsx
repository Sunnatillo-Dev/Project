import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Button, Grid } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import SingleNew from "@/components/SingleNew";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AllNews() {
  const [fullData, setFullData] = useState([]);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [num, setNum] = useState(7);
  const [fromNum, setFromNum] = useState(0);
  const [dataLength, setDataLength] = useState(1);
  const [newData, setNewData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [others, setOthers] = useState([]);
  const fetchData = () => {
    setTimeout(() => {
      axios.get("api/newsapi").then((res) => {
        setData([...data, ...res.data.slice(fromNum, num)]);
        setNum((prev) => prev + 4);
      });
      setFromNum(num);
      if (dataLength === data.length) {
        setHasMore(false);
      }
    }, 1100);
  };

  let handleCategory = async (type) => {
    axios.get("api/newsapi").then(({ data }) => {
      if (type === "") {
        setNewData(data);
      }
      setSelectedCategory(type);

      if (type === "others") {
        setNewData(
          fullData.filter(
            (item) =>
              !item.category.includes("tech") &&
              !item.category.includes("crypto") &&
              !item.category.includes("future") &&
              !item.category.includes("robot") &&
              !item.category.includes("energy")
          )
        );
        console.log(newData);
      }
      setNewData(
        data.filter((item) => {
          return (
            item.category.toLowerCase().includes(type) ||
            item.title.toLowerCase().includes(type) ||
            item.description.toLowerCase().includes(type.toLowerCase())
          );
        })
      );
    });
  };
  useEffect(() => {
    axios.get("api/newsapi").then((res) => {
      setFullData(res.data);
      setDataLength(res.data.length);
    });
    fetchData();
    handleCategory("");
  }, []);
  return (
    <Box width={"680px"}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid gray",
        }}
      >
        <Box
          // background={"red"}
          // alignItems={"center"}

          display={"flex"}
          alignItems={"stretch"}
          gap={"20px"}
          width={"100%"}
          height={"40px"}
          overflow={"hidden"}
        >
          <h1
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => handleCategory("")}
            className={!selectedCategory ? "selected-category" : ""}
          >
            For&nbsp;You
          </h1>
          <h1
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => handleCategory("tech")}
            className={selectedCategory === "tech" ? "selected-category" : ""}
          >
            Technology
          </h1>
          <h1
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => handleCategory("crypto")}
            className={selectedCategory === "crypto" ? "selected-category" : ""}
          >
            Crypto
          </h1>
          <h1
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => handleCategory("energy")}
            className={selectedCategory === "energy" ? "selected-category" : ""}
          >
            Energy city
          </h1>
          <h1
            style={{
              cursor: "pointer",
              userSelect: "none",
            }}
            onClick={(e) => handleCategory("future")}
            className={selectedCategory === "future" ? "selected-category" : ""}
          >
            Future & Modern
          </h1>
        </Box>
      </div>

      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={hasMore ? <Loader /> : ""}
      >
        <Grid my={"20px"} gap={"30px"} templateColumns={"repeat(1,1fr)"}>
          {newData.slice(0, num).map((item) => (
            <SingleNew
              readMinutes={item.readMinutes}
              key={item.id}
              id={item.id}
              photo={item.photo}
              avatar={item.avatar}
              author={item.author}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}
