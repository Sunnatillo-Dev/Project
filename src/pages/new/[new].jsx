import { DynamicProvider } from "@/Context/dynamic";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  useStatStyles,
} from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import NewsDataFromJson from "@/data/News.json";
import { useUser } from "@clerk/nextjs";

const New = () => {
  let router = useRouter();
  let { user } = useUser();
  let { newsData, setNewsData } = useContext(DynamicProvider);
  let saveData = (data) => {
    axios.post("/api/saved", {
      userId: user?.id,
      data,
    });
  };
  useEffect(() => {
    let getData = async () => {
      setNewsData(
        await NewsDataFromJson.filter((item) => {
          return item.id == router.query.new;
        })
      );
    };
    getData();
  }, [router.query.new]);
  return (
    <Container pt={"100px"} maxW={"680px"}>
      <Text
        width={"100%"}
        fontSize={{ base: "20px", sm: "42px" }}
        fontWeight={"bold"}
        mb={"0px"}
      >
        {newsData[0]?.title}
      </Text>
      <Text color={"gray"} fontSize={"25px"} my={"20px"}>
        {newsData[0]?.description.split("").slice(0, 100)}
        {newsData[0]?.description?.length < 100 ? "" : "..."}
      </Text>
      <Flex mb={"20px"} alignItems={"center"} gap={"15px"}>
        <Image
          alt="img"
          src={newsData[0]?.avatar}
          width={44}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
          }}
          height={44}
        />
        <Box>
          <Flex gap={"10px"}>
            <Text display={"flex"} as={"div"}>
              {newsData[0]?.author}
            </Text>
            <Text>-</Text>
            <Text color={"green"}>Follow</Text>
          </Flex>

          <Flex gap={"7px"}>
            <Text as={"div"} display={"flex"} gap={"5px"}>
              <Text fontWeight={"bold"}>Category:</Text> {newsData[0]?.category}
            </Text>{" "}
            - <Text>{newsData[0]?.readMinutes} min read</Text> -
            <Text>{newsData[0]?.date}</Text>
          </Flex>
        </Box>
      </Flex>
      <Box>
        <Button onClick={() => saveData(newsData[0])} variant={"unstyled"}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="nu"
          >
            <path
              d="M17.5 1.25a.5.5 0 0 1 1 0v2.5H21a.5.5 0 0 1 0 1h-2.5v2.5a.5.5 0 0 1-1 0v-2.5H15a.5.5 0 0 1 0-1h2.5v-2.5zm-11 4.5a1 1 0 0 1 1-1H11a.5.5 0 0 0 0-1H7.5a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V5.75z"
              fill="#000"
            ></path>
          </svg>
        </Button>
        <Button variant={"unstyled"}>
          <svg width="24" height="24" viewBox="0 0 24 24" className="us">
            <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
          </svg>
        </Button>
      </Box>
      <Box>
        <Text my={"20px"} fontSize={"20px"}>
          {newsData[0]?.description}
        </Text>
        <Image
          alt="img"
          src={newsData[0]?.photo}
          width={680}
          height={500}
          style={{ width: "100%", padding: "20px 0 20px 0" }}
        />
        <Text fontSize={"20px"}>{newsData[0]?.article}</Text>
      </Box>
    </Container>
  );
};

export default New;
