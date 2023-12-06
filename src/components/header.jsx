import React, { useContext } from "react";
import { Box, Button, Flex, Input } from "@chakra-ui/react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { TfiBell } from "react-icons/tfi";
import { useRouter } from "next/router";
import { ModalProvider } from "@/Context/Modal.context";
import Register from "@/components/register";
function Header() {
  let { setIsOpen } = useContext(ModalProvider);
  let router = useRouter();
  let onRegister = () => {
    setIsOpen(true);
  };
  let onLogin = () => {
    router.push("/login");
  };
  return (
    <Box
      px={"24px"}
      height={"60px"}
      display={"flex"}
      justifyContent={"space-between"}
      borderBottom="1px solid #F2F2F2"
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
            background={"none"}
            height={"100%"}
            border={"none"}
            outline={"none"}
            placeholder={"Search"}
            type={"text"}
            fontSize={"13px"}
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
        >
          <Button
            leftIcon={<TfiWrite fontSize={"24px"} />}
            align={"flex-end"}
            transition={"all 0.2s"}
            _hover={{ color: "rgba(0,0,0,0.8)" }}
            color={"gray"}
            variant={"unstyled"}
            fontFamily="Inter"
            fontSize="16px"
            fontStyle="normal"
            fontWeight={400}
            border={"none"}
            background={"none"}
          >
            Write
          </Button>
        </Flex>
        <Box
          transition={"all 0.2s"}
          color={"gray"}
          _hover={{ color: "rgba(0,0,0,0.8)" }}
        >
          <TfiBell fontSize={"24px"} />
        </Box>
        {/*<Box*/}
        {/*  borderRadius="50%"*/}
        {/*  background={"#ff00fb"}*/}
        {/*  width="32px"*/}
        {/*  height="32px"*/}
        {/*  display={"flex"}*/}
        {/*  justifyContent={"center"}*/}
        {/*  color={"white"}*/}
        {/*  alignItems={"center"}*/}
        {/*  boxShadow="inset 0px 0px 0px 1px rgba(0, 0, 0, 0.05)"*/}
        {/*  _hover={{ background: "#6b006b" }}*/}
        {/*  transition={"all 0.4s"}*/}
        {/*>*/}
        {/*  S*/}
        {/*</Box>*/}
        <Flex gap={"20px"}>
          <Button onClick={onLogin}>Sign In</Button>
          <Button
            onClick={onRegister}
            color={"white"}
            background={"black"}
            borderRadius={"30px"}
            padding={"10px 20px"}
          >
            Get Started
          </Button>
        </Flex>
      </Flex>
      <Register />
    </Box>
  );
}

export default Header;
