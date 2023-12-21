import React, { useContext } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { TfiBell } from "react-icons/tfi";
import { useRouter } from "next/router";
import { UserButton, useUser } from "@clerk/nextjs";
function Header() {
  let router = useRouter();
  let { user } = useUser();

  return (
    <Box
      px={"24px"}
      height={"60px"}
      display={"flex"}
      justifyContent={"space-between"}
      borderBottom="1px solid #F2F2F2"
      mb={"40px"}
    >
      <Flex gap={"20px"} align={"center"}>
        <Image
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
          src={logo}
          alt={"logo"}
          width={44}
          height={25}
        />
        <Flex
          justify={"space-between"}
          padding={"12px"}
          borderRadius="20px"
          background="#f9f9f9"
          height={"40px"}
          boxSizing={"border-box"}
          align={"center"}
          gap={"10px"}
        >
          <IoSearch color={"gray"} fontSize={"25px"} />
          <Input
            variant={"unstyled"}
            background={"none"}
            height={"100%"}
            border={"none"}
            outline={"none"}
            placeholder={"Search"}
            type={"text"}
            fontSize={"16px"}
          />
        </Flex>
      </Flex>
      <Flex align={"center"} gap={"30px"}>
        <Flex
          align={"flex-end"}
          transition={"all 0.2s"}
          color={"gray"}
          _hover={{ color: "rgba(0,0,0,0.8)" }}
          onClick={() => router.push("/write")}
          display={"block"}
        >
          {user && (
            <Button
              leftIcon={<TfiWrite fontSize={"24px"} />}
              align={"flex-end"}
              transition={"all 0.2s"}
              _hover={{ color: "rgba(0,0,0,0.8)" }}
              color={"gray"}
              alignItems={"center"}
              variant={"unstyled"}
              fontFamily="Inter"
              fontSize="16px"
              fontStyle="normal"
              fontWeight={400}
              border={"none"}
              display={"flex"}
              background={"none"}
            >
              Write
            </Button>
          )}
        </Flex>
        <>
          <Box
            transition={"all 0.2s"}
            color={"gray"}
            _hover={{ color: "rgba(0,0,0,0.8)" }}
          >
            <TfiBell fontSize={"24px"} />
          </Box>
        </>
        {!user && (
          <Flex gap={"20px"}>
            <Button
              display={"flex"}
              onClick={() => {
                router.push("/sign-in");
              }}
              variant={"unstyled"}
            >
              Sign In
            </Button>
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
              Get Started
            </Button>
          </Flex>
        )}

        {user && <UserButton afterSignOutUrl="/" />}
      </Flex>
    </Box>
  );
}

export default Header;
