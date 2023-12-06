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
        photo: link,
        author: user[0].username,
        date: dateString,
        avatar: "https://source.unsplash.com/random/800x600/?user",
      });
      res?.data.newsItem
        ? router.push("/")
        : setError("Double check and try again");
    } catch (error) {
      console.error("Error publishing article:", error);
    }
  };

  return (
    <Container maxW={"1280px"} m={"0 auto"}>
      <Heading fontSize={"32px"}>Add Article</Heading>
      <Flex align={"center"}>
        <Text width={"300px"}> Title:</Text>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          width={"500px"}
          type={"text"}
        />
      </Flex>{" "}
      <Flex align={"center"}>
        <Text width={"300px"}> Description:</Text>
        <Input
          onChange={(e) => setDescription(e.target.value)}
          width={"500px"}
          type={"text"}
        />
      </Flex>{" "}
      <Flex align={"center"}>
        <Text width={"300px"}> Reading Time (in Minutes):</Text>
        <Input
          onChange={(e) => setTime(e.target.value)}
          width={"500px"}
          type={"number"}
        />
      </Flex>
      <Flex align={"center"}>
        <Text width={"300px"}> Photo (link):</Text>
        <Input
          onChange={(e) => setLink(e.target.value)}
          width={"500px"}
          type={"text"}
        />
      </Flex>
      <Text>{error}</Text>
      <Button onClick={onWrite}>Publish</Button>
    </Container>
  );
}

export default Write;
