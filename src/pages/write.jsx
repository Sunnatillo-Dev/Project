import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import userData from "@/data/users/login.json";

import user from "@/data/users/login.json";
function Write() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [time, setTime] = useState("");
  let [link, setLink] = useState("");
  let [error, setError] = useState("");
  const router = useRouter();

  const onWrite = async () => {
    try {
      if (!title || !description || !time || !link) {
        setError("All fields are required and write all of them correctly");
        return;
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const formattedDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
      const dateString = formattedDate.toISOString().split("T")[0];
      const res = await axios.post("http://localhost:3000/api/newsapi", {
        title,
        description,
        readMinutes: time,
        photo:
          link.includes("https://") ||
          link.includes("http://") ||
          link.includes("data:image")
            ? link
            : " https://source.unsplash.com/random/800x600/?" + link,
        author:
          userData?.fullName?.split(" ")[0][0].toUpperCase() +
          userData?.fullName
            ?.split(" ")[0]
            .slice(0, userData.fullName.split(" ")[0].length) +
          " " +
          userData.fullName?.split(" ")[1][0].toUpperCase() +
          userData.fullName
            ?.split(" ")[1]
            .slice(0, userData.fullName.split(" ")[0].length),
        date: dateString,
        avatar: "https://source.unsplash.com/random/800x600/?user",
      });

      if (res?.data.newsItem) {
        router.push("/");
      } else {
        setError("Double-check and try again");
      }
    } catch (error) {
      console.error("Error publishing article:", error);
      setError("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <Heading my={"30px"} textAlign={"center"} fontSize={"32px"}>
        Add Article
      </Heading>
      <Container
        alignItems={"center"}
        flexDir={"column"}
        display={"flex"}
        justifyContent={"center"}
        maxW={"1280px"}
        m={"0 auto"}
        gap={"20px"}
      >
        <Flex align={"center"}>
          <Input
            onChange={(e) => setTitle(e.target.value)}
            width={"500px"}
            placeholder={"Title"}
            variant={"unstyled"}
            border={"1px solid black"}
            height={"40px"}
            padding={"5px 10px"}
            type={"text"}
            outline={"1px solid #385898"}
          />
        </Flex>{" "}
        <Flex align={"center"}>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            width={"500px"}
            variant={"unstyled"}
            border={"1px solid black"}
            height={"40px"}
            padding={"5px 10px"}
            placeholder={"Description"}
            type={"text"}
            outline={"1px solid #385898"}
          />
        </Flex>{" "}
        <Flex align={"center"}>
          <Input
            onChange={(e) => setTime(e.target.value)}
            width={"500px"}
            placeholder={"Reading Time (in Minutes)"}
            variant={"unstyled"}
            border={"1px solid black"}
            height={"40px"}
            padding={"5px 10px"}
            type={"number"}
            outline={"1px solid #385898"}
          />
        </Flex>
        <Flex align={"center"}>
          <Input
            onChange={(e) => setLink(e.target.value)}
            width={"500px"}
            variant={"unstyled"}
            border={"1px solid black"}
            height={"40px"}
            placeholder={"Photo (link):"}
            padding={"5px 10px"}
            type={"text"}
            outline={"1px solid #385898"}
          />
        </Flex>
        <Text>{error}</Text>
        <Button width={"200px"} colorScheme={"facebook"} onClick={onWrite}>
          Publish
        </Button>
      </Container>
    </>
  );
}

export default Write;
