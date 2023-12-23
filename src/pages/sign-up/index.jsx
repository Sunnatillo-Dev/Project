import { Box } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
import React from "react";

const SignUpPage = () => {
  return (
    <Box
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SignUp />
    </Box>
  );
};

export default SignUpPage;
