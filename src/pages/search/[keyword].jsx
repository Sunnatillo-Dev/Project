import { DynamicProvider } from "@/Context/dynamic";
import SingleNew from "@/components/SingleNew";
import { Box, Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

const Search = () => {
  let { query } = useRouter();
  let [data, setData] = useState([]);
  let { searchRes, setSearchRes } = useContext(DynamicProvider);
  useContext(DynamicProvider);
  let getData = async () => {
    await axios.get("/api/newsapi").then((res) => setData(res.data));
    if (!searchRes.length) {
      setSearchRes(
        data.filter((SingleNew) => {
          return (
            SingleNew.category
              ?.toLowerCase()
              .includes(query.keyword.toLowerCase()) ||
            SingleNew.title
              ?.toLowerCase()
              .includes(query.keyword.toLowerCase()) ||
            SingleNew.description
              ?.toLowerCase()
              .includes(query.keyword.toLowerCase()) ||
            SingleNew.article
              ?.toLowerCase()
              .includes(query.keyword.toLowerCase()) ||
            SingleNew.author
              ?.toLowerCase()
              .includes(query.keyword.toLowerCase())
          );
        })
      );
    }
  };
  useEffect(() => {
    getData();
  }, [query.keyword]);

  return (
    <Box m={"0 auto"} maxW={"680px"}>
      <Text fontSize={"42px"} color={"blackAlpha.600"} pt={"100px"}>
        Results For{" "}
        <Text color={"black"} as={"span"}>
          {" "}
          {query.keyword}{" "}
        </Text>
      </Text>
      <Grid templateColumns={"auto "} maxW={"680px"} gap={"10px"} pt={"40px"}>
        {searchRes.map(
          ({
            avatar,
            author,
            date,
            title,
            description,
            readMinutes,
            photo,
            id,
            category,
          }) => {
            return (
              <SingleNew
                key={id}
                id={id}
                avatar={avatar}
                author={author}
                date={date}
                title={title}
                description={description}
                readMinutes={readMinutes}
                photo={photo}
                category={category}
              />
            );
          }
        )}
        {!searchRes.length && (
          <Text
            fontSize={"20px"}
            borderTop={"2px solid gray"}
            pt={"20px"}
            color={" black"}
          >
            We can't find anything for{" "}
            <Text as={"span"} color={"red"}>
              {query.keyword}
            </Text>
          </Text>
        )}
      </Grid>
    </Box>
  );
};

export default Search;
