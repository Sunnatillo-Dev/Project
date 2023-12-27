import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Button, Flex, Grid, Link, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import SingleNew from "@/components/SingleNew";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function AllNews() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [num, setNum] = useState(7);
  const [fromNum, setFromNum] = useState(0);
  let { user } = useUser();
  const [dataLength, setDataLength] = useState(1);
  const [newData, setNewData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let router = useRouter();
  const fetchData = () => {
    if (num >= 14 && !user) {
      console.log("enough");
    } else {
      setTimeout(() => {
        axios.get("/api/newsapi").then((res) => {
          setData([...data, ...res.data.slice(fromNum, num)]);
          setNum((prev) => prev + 4);
        });
        setFromNum(num);
        if (dataLength === data.length) {
          setHasMore(false);
        }
      }, 1100);
    }
  };

  let handleCategory = async (type) => {
    axios.get("api/newsapi").then(({ data }) => {
      if (type === "") {
        setNewData(data);
      }
      setSelectedCategory(type);

      setNewData(
        data.filter((item) => {
          return (
            item.category?.toLowerCase().includes(type) ||
            item.title.toLowerCase().includes(type) ||
            item.description.toLowerCase().includes(type.toLowerCase())
          );
        })
      );
    });
  };
  useEffect(() => {
    axios.get("api/newsapi").then((res) => {
      setDataLength(res.data.length);
    });

    fetchData();
    handleCategory("");
  }, []);
  return (
    <Flex
      flexDir={"column"}
      width={{ base: "auto" }}
      pt={user ? "100px" : "auto"}
    >
      {user && (
        <div
          style={{
            // width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid gray",
            overflow: "hidden",
          }}
        >
          <Box
            display={"flex"}
            alignItems={"stretch"}
            gap={"20px"}
            width={"100%"}
            height={"40px"}
            overflow={"hidden"}
          >
            <Text
              fontSize={{ base: "10px", sm: "13px", lg: "16px" }}
              style={{
                cursor: "pointer",

                userSelect: "none",
              }}
              onClick={(e) => handleCategory("")}
              className={!selectedCategory ? "selected-category" : ""}
            >
              For&nbsp;You
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "13px", lg: "16px" }}
              style={{
                cursor: "pointer",

                userSelect: "none",
              }}
              onClick={(e) => handleCategory("tech")}
              className={selectedCategory === "tech" ? "selected-category" : ""}
            >
              Technology
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "13px", lg: "16px" }}
              style={{
                cursor: "pointer",

                userSelect: "none",
              }}
              onClick={(e) => handleCategory("crypto")}
              className={
                selectedCategory === "crypto" ? "selected-category" : ""
              }
            >
              Crypto
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "13px", lg: "16px" }}
              style={{
                cursor: "pointer",

                userSelect: "none",
              }}
              onClick={(e) => handleCategory("energy")}
              className={
                selectedCategory === "energy" ? "selected-category" : ""
              }
            >
              Energy city
            </Text>
            <Text
              fontSize={{ base: "10px", sm: "13px", lg: "16px" }}
              style={{
                cursor: "pointer",

                userSelect: "none",
              }}
              onClick={(e) => handleCategory("future")}
              className={
                selectedCategory === "future" ? "selected-category" : ""
              }
            >
              Future & Modern
            </Text>
          </Box>
        </div>
      )}
      <InfiniteScroll
        dataLength={data.length}
        next={fetchData}
        hasMore={hasMore}
        loader={hasMore ? <Loader /> : ""}
      >
        <Grid
          my={"20px"}
          gap={"30px"}
          width={"100%"}
          templateColumns={"repeat(1,1fr)"}
          maxW={"680px"}
        >
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
      {!user && num >= 14 && (
        <Box
          backgroundColor={"rgba(255,255,255)"}
          boxShadow={`
          -webkit-box-shadow: -6px -100px 100px 14px rgba(255, 255, 255, 1);
          -moz-box-shadow: -6px -100px 100px 14px rgba(255, 255, 255, 1);
          box-shadow: -6px -100px 100px 14px rgba(255, 255, 255, 1)
          `}
          mt={"-60px"}
          position={"relative"}
          zIndex={1}
          display={"flex"}
          pt={"100px"}
          flexDir={"column"}
          alignItems={"center"}
          gap={"20px"}
          pb={"20px"}
          fontSize={"20px"}
        >
          <Text>To Continue Reading</Text>
          <Button
            onClick={() => {
              router.push("/sign-up");
            }}
            color={"white"}
            background={"black"}
            borderRadius={"30px"}
            padding={"10px 20px"}
            _hover={{ background: "blackAlpha.800" }}
          >
            Sign In
          </Button>
        </Box>
      )}
    </Flex>
  );
}
