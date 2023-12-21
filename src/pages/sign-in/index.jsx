import { Flex } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";
const SignInPage = () => {
  return (
    <Flex height={"80vh"} alignItems={"center"} justify="center">
      <SignIn />
    </Flex>
  );
};
export default SignInPage;
