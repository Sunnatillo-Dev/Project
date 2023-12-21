import { Box, Flex } from "@chakra-ui/react";
import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <Flex alignItems={"center"} justify="center">
      <SignUp />
        
    </Flex>
  );
};
export default SignUpPage;
