import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

let Guest = () => {
  return (
    <Box py={"50px"} position={"relative"} backgroundColor={"#FFC017"}>
      <Box display={"flex"} height={"462px"} m={"0 auto"} maxW={"1280px"}>
        <Box
          maxW={"1280px"}
          display={"flex"}
          flexDir={"column"}
          height={"100%"}
          justifyContent={"center"}
          gap={"20px"}
        >
          <Text as={"span"} fontSize={"106px"}>
            Stay curious.
          </Text>
          <Text fontSize={"24px"}>
            Discover stories, thinking, and expertise from writers on any topic.
          </Text>
          <Link
            style={{
              fontSize: "20px",
              padding: "8px 20px ",
              background: "#191919",
              width: "213px",
              borderRadius: "99em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
            href={"/search"}
          >
            Start Reading
          </Link>
        </Box>
        <Text
          position={"absolute"}
          right={0}
          top={"5%"}
          bottom={"10%"}
          fontSize={"25px"}
          maxW={"500px"}
        >
          M&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M
          M&nbsp;M&nbsp;M
          M&nbsp;&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MM&nbsp;M&nbsp;&nbsp;&nbsp;M
          MM&nbsp;M&nbsp;MM&nbsp; M&nbsp;M
          M&nbsp;&nbsp;M&nbsp;&nbsp;M&nbsp;M&nbsp;&nbsp;MM&nbsp;M&nbsp;&nbsp;M
          &nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;MM
          MM&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;MM&nbsp;M
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M
          M&nbsp;MM&nbsp;M&nbsp;MM
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M
          M&nbsp;M&nbsp;M&nbsp;MM&nbsp;M&nbsp;M
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;&nbsp;M
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;MMMM
          M&nbsp;M&nbsp;M
          M&nbsp;M&nbsp;MM&nbsp;M&nbsp;M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;M&nbsp;&nbsp;M
        </Text>
      </Box>
    </Box>
  );
};
export default Guest;
