import { DynamicProvider } from "@/Context/dynamic";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Text,
  Flex,
  Textarea,
  Grid,
  GridItem,
} = require("@chakra-ui/react");

export default function Comments({ dataForComments }) {
  const btnRef = React.useRef();
  let [comment, setComment] = useState("");
  let [refresh, setRefresh] = useState(false);
  let { openComment, setOpenComment } = useContext(DynamicProvider);
  let onClose = () => {
    setOpenComment(false);
  };
  let OnComment = () => {
    setRefresh(!refresh);
    if (comment.length > 0) {
      axios.put("/api/newsapi", {
        id: dataForComments[0]?.id,
        comment,
        fullname: user?.fullName,
        userImage: user?.imageUrl,
      });
    }
    setComment("");
  };
  useEffect(() => {
    console.log(1);
  }, [comment]);
  let { user } = useUser();
  return (
    <>
      <Drawer
        isOpen={openComment}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {" "}
            Responses ({dataForComments[0]?.comments?.length})
          </DrawerHeader>

          <DrawerBody>
            <Box
              display={"flex"}
              flexDir={"column"}
              gap={"15px"}
              boxShadow={"xl"}
              p={"14px"}
              mb={"30px"}
            >
              <Flex align={"center"} gap={"10px"}>
                <Image
                  width={32}
                  height={32}
                  style={{ borderRadius: "50px" }}
                  alt={user?.firstName}
                  src={user?.imageUrl}
                />
                <Text> {user?.fullName} </Text>
              </Flex>
              <Textarea
                onChange={(e) => setComment(e.target.value)}
                variant={"unstyled"}
                border={"none"}
                value={comment}
                outline={"none"}
                placeholder="What are your thoughts ?"
              />
              <Flex justify={"end"} gap={"10px"}>
                <Button variant={"unstyled"} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  backgroundColor={"rgb(26, 137, 23)"}
                  borderRadius={"50px"}
                  color={"white"}
                  p={"5px 12px"}
                  variant={"unstyled"}
                  onClick={OnComment}
                >
                  Respond
                </Button>
              </Flex>
            </Box>
            <Grid gap={"20px"}>
              {dataForComments[0]?.comments?.map((comment) => {
                return (
                  <GridItem
                    borderBottom={"1px solid #dbdbdb"}
                    pb={"20px"}
                    display={"flex"}
                    flexDir={"column"}
                    gap={"15px"}
                  >
                    <Flex align={"center"} gap={"10px"}>
                      <Image
                        width={25}
                        height={25}
                        alt={comment?.text}
                        src={comment?.user?.userImage}
                        style={{ borderRadius: "50px" }}
                      />
                      <Flex flexDirection="column">
                        <Text fontSize={"14px"}>{comment?.user?.fullname}</Text>
                        <Text fontSize={"14px"}>{comment?.date}</Text>
                      </Flex>
                    </Flex>
                    <Text fontSize={"17px"}>{comment?.text}</Text>
                  </GridItem>
                );
              })}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
