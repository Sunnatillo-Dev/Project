import { Box } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <>
      <Box height={"100vh"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <SignIn />
      </Box> 
    </>
  );
};

export default SignInPage;
