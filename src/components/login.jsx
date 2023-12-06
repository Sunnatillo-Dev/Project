import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContextProvider,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ModalProvider } from "@/Context/Modal.context";
import axios from "axios";
import { RegisterProvider } from "@/Context/isRegistered";

export default function Login() {
  let { isOpen, setIsOpen, LisOpen, setLIsOpen } = useContext(ModalProvider);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [userName, setUserName] = useState("");
  let onSignIn = () => {
    try {
      if (!email || !userName || !password) return;
      axios.get("api/login").then((res) => {
        console.log(res.data);
      });
      setIsOpen(false);
    } catch (e) {}
  };
  return (
    <>
      <Modal
        isCentered
        size={"xl"}
        isOpen={LisOpen}
        onClose={() => {
          setLIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader my={"20px"} fontSize={"30px"} textAlign={"center"}>
            Welcome Back
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type={"email"}
                placeholder="Email"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={"password"}
                placeholder="Password"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                type={"text"}
                placeholder="Username"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              background={"black"}
              color={"white"}
              _hover={{ background: "blackAlpha.700" }}
              mr={3}
              onClick={onSignIn}
            >
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
