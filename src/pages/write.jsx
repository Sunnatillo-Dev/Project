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
import { useUser } from "@clerk/nextjs";

function Write() {
  let { user } = useUser();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [time, setTime] = useState("");
  let [link, setLink] = useState("");
  let [category, setCategory] = useState("");
  let [error, setError] = useState("");
  const router = useRouter();
  console.log(category);
  const onWrite = async () => {
    try {
      if (!title || !description || !time || !link || !category) {
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
        author: user.fullName,

        date: dateString,
        avatar: user.imageUrl,
        category,
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
        <Flex align={"center"} flexDir="column">
          <Text>Catigory:</Text>
          <Box display={"flex"} gap={"30px"} my={"20px"} flexWrap={"wrap"}>
            <Box>
              <label htmlFor="future">Future & Modern</label>
              <input
                onClick={(e) => setCategory(e.target.id)}
                id="future"
                type="radio"
                name="catigory"
              />
            </Box>
            <Box>
              <label htmlFor="tech">Technology</label>
              <input
                onClick={(e) => setCategory(e.target.id)}
                name="catigory"
                id="tech"
                type="radio"
              />
            </Box>
            <Box>
              <label htmlFor="crypto">Crypto</label>
              <input
                name="catigory"
                onClick={(e) => setCategory(e.target.id)}
                id="crypto"
                type="radio"
              />
            </Box>
            <Box>
              <label htmlFor="energy">Energy</label>
              <input
                name="catigory"
                onClick={(e) => setCategory(e.target.id)}
                id="energy"
                type="radio"
              />
            </Box>
          </Box>
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
