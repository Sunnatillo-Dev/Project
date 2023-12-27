import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { useRouter } from "next/router";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Box, Button, Flex, Input, Link } from "@chakra-ui/react";
import { DynamicProvider } from "@/Context/dynamic";
import axios from "axios";

function Header() {
  let { user } = useUser();
  let router = useRouter();
  let { scrollY, setScrollY, setSearchRes, searchTitle, setSearchTitle } =
    useContext(DynamicProvider);
  let [data, setData] = useState([]);
  const scrollH = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        setScrollY(window.scrollY);
      });
    }
  };
  let getData = async () => {
    await axios.get("/api/newsapi").then((res) => setData(res.data));
  };
  useEffect(() => {
    getData();
    scrollH();
  }, []);
  let onSearch = () => {
    if (searchTitle.length) {
      router.push(`/search/${searchTitle}`);
      setSearchRes(
        data.filter((SingleNew) => {
          return (
            SingleNew.category
              ?.toLowerCase()
              .includes(searchTitle.toLowerCase()) ||
            SingleNew.title
              ?.toLowerCase()
              .includes(searchTitle.toLowerCase()) ||
            SingleNew.description
              ?.toLowerCase()
              .includes(searchTitle.toLowerCase()) ||
            SingleNew.article
              ?.toLowerCase()
              .includes(searchTitle.toLowerCase()) ||
            SingleNew.author?.toLowerCase().includes(searchTitle.toLowerCase())
          );
        })
      );
    }
  };
  //
  return (
    <Box
      boxShadow={
        "-webkit-box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18); -moz-box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18); box-shadow: 0px 9px 22px -16px rgba(34, 60, 80, 0.18);"
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
          border={!user ? "2px solid black  " : "1px solid "}
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
            defaultValue={searchTitle ? searchTitle : router.query.keyword}
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                onSearch();
              }
            }}
            placeholder={"Search"}
            type={"text"}
            fontSize={"16px"}
          />
        </Flex>
      </Flex>
      <Flex align={"center"} gap={"30px"}>
        {user && (
          <Button
            onClick={() => router.push("/saved")}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="28"
              viewBox="0 0 25 24"
              fill="#6B6B6B"
              stroke="#6B6B6B"
              strokeWidth="0.4"
            >
              <path
                d="M18 1.25C18 1.11739 18.0527 0.990215 18.1464 0.896447C18.2402 0.802678 18.3674 0.75 18.5 0.75C18.6326 0.75 18.7598 0.802678 18.8536 0.896447C18.9473 0.990215 19 1.11739 19 1.25V3.75H21.5C21.6326 3.75 21.7598 3.80268 21.8536 3.89645C21.9473 3.99021 22 4.11739 22 4.25C22 4.38261 21.9473 4.50979 21.8536 4.60355C21.7598 4.69732 21.6326 4.75 21.5 4.75H19V7.25C19 7.38261 18.9473 7.50979 18.8536 7.60355C18.7598 7.69732 18.6326 7.75 18.5 7.75C18.3674 7.75 18.2402 7.69732 18.1464 7.60355C18.0527 7.50979 18 7.38261 18 7.25V4.75H15.5C15.3674 4.75 15.2402 4.69732 15.1464 4.60355C15.0527 4.50979 15 4.38261 15 4.25C15 4.11739 15.0527 3.99021 15.1464 3.89645C15.2402 3.80268 15.3674 3.75 15.5 3.75H18V1.25ZM7 5.75C7 5.48478 7.10536 5.23043 7.29289 5.04289C7.48043 4.85536 7.73478 4.75 8 4.75H11.5C11.6326 4.75 11.7598 4.69732 11.8536 4.60355C11.9473 4.50979 12 4.38261 12 4.25C12 4.11739 11.9473 3.99021 11.8536 3.89645C11.7598 3.80268 11.6326 3.75 11.5 3.75H8C7.46957 3.75 6.96086 3.96071 6.58579 4.33579C6.21071 4.71086 6 5.21957 6 5.75V19.75C6 19.8429 6.02586 19.9339 6.07467 20.0129C6.12349 20.0919 6.19334 20.1557 6.27639 20.1972C6.35945 20.2387 6.45242 20.2563 6.5449 20.248C6.63738 20.2396 6.72572 20.2057 6.8 20.15L12.5 15.75L18.2 20.15C18.2743 20.2057 18.3626 20.2396 18.4551 20.248C18.5476 20.2563 18.6406 20.2387 18.7236 20.1972C18.8067 20.1557 18.8765 20.0919 18.9253 20.0129C18.9741 19.9339 19 19.8429 19 19.75V11.25C19 11.1174 18.9473 10.9902 18.8536 10.8964C18.7598 10.8027 18.6326 10.75 18.5 10.75C18.3674 10.75 18.2402 10.8027 18.1464 10.8964C18.0527 10.9902 18 11.1174 18 11.25V18.73L12.8 14.73C12.7135 14.6651 12.6082 14.63 12.5 14.63C12.3918 14.63 12.2865 14.6651 12.2 14.73L7 18.73V5.75Z"
                fill="#6B6B6B"
              />
            </svg>
            Saved
          </Button>
        )}
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
            <SignInButton style={{ display: "flex", alignItems: "center" }}>
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
          </Flex>
        )}

        {user && <UserButton afterSignOutUrl="/" />}
      </Flex>
    </Box>
  );
}

export default Header;
