import React, { useContext, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { TfiBell } from "react-icons/tfi";
import { useRouter } from "next/router";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { DynamicProvider } from "@/Context/dynamic";
// import { Box } from "@chakra-ui/react";

function Header() {
  let router = useRouter();
  let { user } = useUser();
  let { scrollY, setScrollY } = useContext(DynamicProvider);
  //
  const scrollH = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
        console.log(window.scrollY);
      });
    }
  };

  useEffect(() => {
    scrollH();
  }, []);

  //
  return (
    <Box
      boxShadow={
        " -webkit-box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18); -moz-box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18); box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18);"
      }
      position={"fixed"}
      width={"100%"}
      px={"24px"}
      height={"60px"}
      display={"flex"}
      justifyContent={"space-between"}
      transition={"all 0.5s"}
      borderBottom={user ? "1px solid #F2F2F2" : "1px solid black"}
      mb={user ? "40px" : "0px"}
      zIndex={5}
      backgroundColor={
        !user && !(scrollY >= 400) && router.asPath == "/" ? "#FFC017" : "white"
      }
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
          transition={"all 0.5s"}
          border={!user ? "2px solid black  " : "auto"}
          backgroundColor={
            !user && !(scrollY >= 400) && router.asPath == "/"
              ? "#FFC017"
              : "white"
          }
        >
          <IoSearch color={"gray"} fontSize={"25px"} />
          <Input
            variant={"unstyled"}
            background={"none"}
            height={"40px"}
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
        {!user && (
          <Flex gap={"20px"}>
            {/* <Button
              display={"flex"}
              onClick={() => {
                router.push("/sign-in");
              }}
              variant={"unstyled"}
            >
              Sign In
            </Button> */}
            <SignInButton redirectUrl="/sign-in" style={{ display: "flex", alignItems: "center" }}>
              Sign In
            </SignInButton>
            <SignUpButton
              style={{
                color: "white",
                background: "black",
                borderRadius: "30px",
                padding: "10px 20px",
                ":hover": { color: "red" },
              }}
            >
              Get Started
            </SignUpButton>
            {/* <Button
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
            </Button> */}
          </Flex>
        )}

        {user && <UserButton afterSignOutUrl="/" />}
      </Flex>
    </Box>
  );
}

export default Header;
