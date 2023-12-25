import { Box, Button, Container, GridItem, Link, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CiCircleMinus } from "react-icons/ci";

const SavedNews = () => {
  let [savedData, setSavedData] = useState([]);
  let { user } = useUser();
  let router = useRouter();
  let getNewsData = (id) => {
    router.push(`/new/${id}`);
  };
  let GetData = async () => {
    await axios.get("/api/saved").then((res) => setSavedData(res.data));
  };
  let onDelete = async (id) => {
    try {
      await axios.delete("/api/saved", {
        data: {
          userId: user.id,
          id,
        },
      });
    } catch (error) {
      console.error("Error deleting news item:", error.message);
    }
  };

  useEffect(() => {
    GetData();
  }, []);
  return (
    <Container pt={"80px"} maxW={"680px"}>
      <Text fontSize={"42px"} pb={"20px"}>
        Saved News
      </Text>
      {savedData[user?.id]?.map(
        ({
          avatar,
          author,
          date,
          title,
          description,
          readMinutes,
          photo,
          id,
        }) => {
          return (
            <GridItem
              key={id}
              borderTop={"1px solid #F2F2F2"}
              justifyContent={"space-between"}
              display={"flex"}
              alignItems={"center"}
              pt={"20px"}
            >
              <Box width={"500px"}>
                <Box
                  mb={"12px"}
                  gap={"10px"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Image
                    width={24}
                    style={{
                      borderRadius: "100%",
                      height: "24px",
                      objectFit: "cover",
                    }}
                    height={24}
                    src={avatar}
                    alt={author}
                  />
                  <Text
                    color="#242424"
                    fontFamily="Inter"
                    fontSize="13.234px"
                    fontWeight="normal"
                    lineHeight="20px"
                  >
                    {author}
                  </Text>
                  <Text
                    color="#6B6B6B"
                    fontFamily="Inter"
                    fontSize="12.906px"
                    fontWeight="normal"
                    lineHeight="20px"
                  >
                    {date}
                  </Text>
                </Box>
                <Box
                  onClick={() => {
                    getNewsData(id);
                  }}
                  cursor={"pointer"}
                  mb={"8px"}
                  color="#242424"
                  fontFamily="Inter"
                  fontSize="18.75px"
                  fontWeight="900"
                  lineHeight="24px"
                >
                  {title}
                </Box>
                <Box
                  onClick={() => {
                    getNewsData(id);
                  }}
                  cursor={"pointer"}
                  color="#242424"
                  fontSize="16px"
                  fontWeight="normal"
                  lineHeight="24px"
                >
                  {description?.split("").slice(0, 214).join("")} ...
                </Box>
                <Box
                  justifyContent={"space-between"}
                  display={"flex"}
                  alignItems={"center"}
                >
                  <Box display={"flex"} alignItems={"center"} gap={"7px"}>
                    <Text
                      color="#000"
                      fontFamily="Inter"
                      fontSize="12.289px"
                      fontWeight="normal"
                      bg={"#F2F2F2"}
                      display={"inline"}
                      padding={"3px 8px"}
                      borderRadius={"50px"}
                      lineHeight="20px"
                    >
                      {author}
                    </Text>
                    <Text
                      color="#6B6B6B"
                      fontFamily="Inter"
                      fontSize="11.883px"
                      fontWeight="normal"
                      lineHeight="20px"
                    >
                      {readMinutes} Minutes
                    </Text>
                  </Box>
                  <Box>
                    <Button
                      transition={"all .2s"}
                      background={"none"}
                      border={"none"}
                      opacity={0.5}
                      onClick={
                        user
                          ? () => {
                              onDelete(id);
                            }
                          : () => router.push("/sign-in")
                      }
                      _hover={{ opacity: 0.8 }}
                    >
                      <CiCircleMinus fontSize={24} />
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Image
                onClick={() => {
                  getNewsData(id);
                }}
                cursor={"pointer"}
                alt={"img"}
                width={112}
                style={{
                  width: "112px",
                  height: "112px",
                  objectFit: "cover",
                }}
                height={112}
                objectFit={"cover"}
                src={photo}
              />
            </GridItem>
          );
        }
      )}
      {!savedData[user?.id]?.length && (
        <Text
          height={"80vh"}
          display={"flex"}
          alignItems={"center"}
          flexDir={"column"}
          justifyContent={"center"}
          gap={"20px"}
        >
          Your Saved News is Empty !
          <Link
            display={"flex"}
            alignItems={"center"}
            flexDir={"column"}
            justifyContent={"center"}
            border={"1px solid gray"}
            width={"100px"}
            href="/"
          >
            Go Home
          </Link>
        </Text>
      )}
    </Container>
  );
};

export default SavedNews;
