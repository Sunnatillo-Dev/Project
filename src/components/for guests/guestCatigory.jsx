import { DynamicProvider } from "@/Context/dynamic";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

const GuestCatigory = () => {
  const { scrollY } = useContext(DynamicProvider);
  let { user } = useUser();

  return !user ? (
    <Flex
      maxW={"400px"}
      position={scrollY >= 400 ? "sticky" : "static"}
      right={"6%"} // Adjust as needed
      width={"80%"} // Adjust as needed
      top={"60px"}
      flexDirection="column"
      justifyContent="space-between"
      height="200px"
      display={{ base: "none", xl: "flex" }}
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
    <Flex
      borderLeft={"1px solid "}
      maxW={"400px"}
      position={scrollY >= 40 ? "sticky" : "static"}
      right={"6%"}
      width={"80%"}
      top={"10px"}
      flexDirection="column"
      height="100vh"
      pl={"50px"}
      pt={"80px"}
      mt={"50px"}
      display={{ base: "none", xl: "flex" }}
    >
      <Text fontSize={"17px"} fontWeight={"bold"}>
        Staff Picks
      </Text>
      <Flex mt={"20px"} alignItems={"center"} gap={"10px"}>
        <Image
          src={
            "https://plus.unsplash.com/premium_photo-1697695567115-d0769c8f9649?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
          }
          width={24}
          height={24}
          style={{ borderRadius: "50px", height: "24px", width: "24px" }}
          alt="img"
        />
        <Text fontSize={"13px"} fontWeight={"bold"}>
          Jon Cluck In The Medium Blog
        </Text>
      </Flex>
      <Text fontWeight={"bold"} mb={"20px"}>
        32 of our favorite Medium stories of 2023
      </Text>
      <Flex alignItems={"center"} gap={"10px"}>
        <Image
          src={
            "https://images.unsplash.com/photo-1700819001837-3cb6fdb0d4dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
          }
          width={24}
          height={24}
          style={{ borderRadius: "50px", height: "24px", width: "24px" }}
          alt="img"
        />
        <Text fontSize={"13px"} fontWeight={"bold"}>
          Joan Westenberg
        </Text>
      </Flex>
      <Text fontWeight={"bold"} mb={"20px"}>
        Get in The Van.
      </Text>
      <Flex alignItems={"center"} gap={"10px"}>
        <Image
          src={
            "https://images.unsplash.com/photo-1703209935165-1de535c776ea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D"
          }
          width={24}
          height={24}
          style={{ borderRadius: "50px", height: "24px", width: "24px" }}
          alt="img"
        />
        <Text fontSize={"13px"} fontWeight={"bold"}>
          Quister Septer
        </Text>
      </Flex>
      <Text fontWeight={"bold"} mb={"20px"}>
        Zen And the art of Mountain Biking
      </Text>
      <Text fontSize={"13px"} color={"green"}>
        See The full list
      </Text>
      <Flex
        borderBottom={"1px solid gray"}
        pb={"50px"}
        gap={"20px"}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Box display={"flex"} my={"20px"} alignItems={"center"}>
          <svg width={"43px"} viewBox="0 0 1043.63 592.71">
            <g data-name="Layer 2">
              <g data-name="Layer 1">
                <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94"></path>
              </g>
            </g>
          </svg>
          <svg width="19" height="19">
            <path d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9v6z" fillRule="evenodd"></path>
          </svg>
          <svg fill="blue" width="29" height="29">
            <path d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"></path>
          </svg>
        </Box>
        <Text maxW={"250px"} fontWeight={"100"}>
          Discover Medium writers you already follow on Twitter.
        </Text>
        <Button
          leftIcon={
            <svg fill="blue" width="29" height="29">
              <path d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"></path>
            </svg>
          }
          border={"1px solid "}
          borderRadius={"50px"}
          padding={"20px 50px"}
          background={"white"}
        >
          Connect to Twitter
        </Button>
        <Text textDecoration={"underline"} color={"blackAlpha.500"}>
          Maybe Later
        </Text>
      </Flex>
      <Text mt={"30px"} fontSize={"17px"} fontWeight={"bold"}>
        Recommended topics
      </Text>
      <Flex mt={"20px"} wrap={"wrap"} gap={"10px"}>
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
      <Text mt={"20px"} fontSize={"13px"} color={"green"}>
        See More Topicss
      </Text>
    </Flex>
  );
};

export default GuestCatigory;
