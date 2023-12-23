import { DynamicProvider } from "@/Context/dynamic";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import React, { useContext } from "react";

const GuestCatigory = () => {
  const { scrollY } = useContext(DynamicProvider);
  let { user } = useUser();
  const SCROLL_THRESHOLD = 400;
  const BOX_POSITION = scrollY >= SCROLL_THRESHOLD ? "sticky" : "static";
  return !user ? (
    <Flex
      maxW={"400px"}
      position={BOX_POSITION}
      right={"6%"} // Adjust as needed
      width={"80%"} // Adjust as needed
      top={"60px"}
      flexDirection="column"
      justifyContent="space-between"
      height="200px"
    >
      <Text my={"20px"} fontWeight={"bold"}>
        Discover more of what matters to you
      </Text>
      <Flex wrap={"wrap"} gap={"10px"}>
        <Text
          padding={"6px 12px"}
          borderRadius={"20px"}
          backgroundColor={"blackAlpha.100"}
        >
          Technology
        </Text>
        <Text
          padding={"6px 12px"}
          borderRadius={"20px"}
          backgroundColor={"blackAlpha.100"}
        >
          Crypto
        </Text>
        <Text
          padding={"6px 12px"}
          borderRadius={"20px"}
          backgroundColor={"blackAlpha.100"}
        >
          Energy City
        </Text>
        <Text
          padding={"6px 12px"}
          borderRadius={"20px"}
          backgroundColor={"blackAlpha.100"}
        >
          Future
        </Text>
        <Text
          padding={"6px 12px"}
          borderRadius={"20px"}
          backgroundColor={"blackAlpha.100"}
        >
          Modern
        </Text>
      </Flex>
      <Text my={"20px"} color={"#1A8917"}>
        See More Categories
      </Text>
      <Flex
        pt={"30px"}
        mt={"30px"}
        borderTop={"1px solid #f4f4f4"}
        wrap={"wrap"}
        rowGap={"10px"}
        fontSize={"13px"}
        columnGap={"20px"}
      >
        <Text>Help</Text>
        <Text>Status</Text>
        <Text>About</Text>
        <Text>Careers</Text>
        <Text>Privacy</Text>
        <Text>Terms</Text>
        <Text>Text to speech </Text>
        <Text>Teams</Text>
      </Flex>
    </Flex>
  ) : (
    <Flex mt={"100px"}>
      asdasd
    </Flex>
  );
};

export default GuestCatigory;
