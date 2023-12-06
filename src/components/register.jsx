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

export default function Register() {
  let { isOpen, setIsOpen } = useContext(ModalProvider);
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [userName, setUserName] = useState("");

  let onSignUp = () => {
    try {
      axios
        .post("http://localhost:3000/api/register", {
          fullName: firstName + " " + lastName,
          email: email,
          username: userName,
          password: password,
        })
        .then((res) => console.log(res.data));
    } catch (e) {}
  };
  return (
    <>
      <Modal
        isCentered
        size={"xl"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="1px"
        />
        <ModalContent>
          <ModalHeader my={"20px"} fontSize={"30px"} textAlign={"center"}>
            Join Medium.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="First name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last name"
              />
            </FormControl>
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
              onClick={onSignUp}
            >
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
