import { DynamicProvider } from "@/Context/dynamic";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useContext } from "react";

const New = () => {
  let { userData, setNewsData, setUserData, newsData } =
    useContext(DynamicProvider);
  return (
    <Container maxW={"680px"}>
      <Text
        width={"100%"}
        fontSize={{ base: "20px", sm: "42px" }}
        fontWeight={"bold"}
      >
        {newsData[0]?.title}
      </Text>
      <Flex gap={"25px"}>
        <Image
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
          <Text>{newsData[0]?.author}</Text>

          <Flex gap={"7px"}>
            <Text as={"div"} display={"flex"} gap={"5px"}>
              <Text fontWeight={"bold"}>Category:</Text> {newsData[0]?.category}
            </Text>{" "}
            - <Text>{newsData[0]?.readMinutes} min read</Text> -{" "}
            <Text>{newsData[0]?.date}</Text>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default New;
