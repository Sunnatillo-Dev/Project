import { DynamicProvider } from "@/Context/dynamic";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import NewsDataFromJson from "@/data/News.json";
import { useUser } from "@clerk/nextjs";
import Comments from "@/components/comments";

const New = () => {
  let router = useRouter();
  let { user } = useUser();
  let [isSaved, setIsSaved] = useState(false);
  let { newsData, setNewsData } = useContext(DynamicProvider);
  let { setOpenComment, refreshForCommment } = useContext(DynamicProvider);
  let [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios
      .get("/api/saved")
      .then((res) =>
        res?.data[user?.id]?.some((item) => {
          return item.id == newsData[0]?.id;
        })
      )
      .then((res) => {
        setIsSaved(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [newsData[0]?.id, user?.id, isSaved, refresh, refreshForCommment]);
  let onDelete = async (id) => {
    try {
      await axios
        .delete("/api/saved", {
          data: {
            userId: user.id,
            id,
          },
        })
        .then(() => {
          setRefresh((prevRefresh) => !prevRefresh);
        });
    } catch (error) {
      console.error("Error deleting news item:", error.message);
    }
  };
  let writeComment = () => {
    setOpenComment(true);
  };
  let saveData = (data) => {
    axios
      .post("/api/saved", {
        userId: user?.id,
        data,
      })
      .finally(() => {
        setRefresh((prevRefresh) => !prevRefresh);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    let getData = async () => {
      setNewsData(
        await NewsDataFromJson.filter((item) => {
          return item.id == router.query.new;
        })
      );
    };
    getData();
  }, [router.query.new]);
  return (
    <Container pt={"100px"} maxW={"680px"}>
      <Text
        width={"100%"}
        fontSize={{ base: "20px", sm: "42px" }}
        fontWeight={"bold"}
        mb={"0px"}
      >
        {newsData[0]?.title}
      </Text>
      <Text color={"gray"} fontSize={"25px"} my={"20px"}>
        {newsData[0]?.description.split("").slice(0, 100)}
        {newsData[0]?.description?.length < 100 ? "" : "..."}
      </Text>
      <Flex mb={"20px"} alignItems={"center"} gap={"15px"}>
        <Image
          alt="img"
          src={newsData[0]?.avatar}
          width={44}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
          }}
          height={44}
        />
        <Box>
          <Flex gap={"10px"}>
            <Text display={"flex"} as={"div"}>
              {newsData[0]?.author}
            </Text>
            <Text>-</Text>
            <Text color={"green"}>Follow</Text>
          </Flex>

          <Flex gap={"7px"}>
            <Text as={"div"} display={"flex"} gap={"5px"}>
              <Text fontWeight={"bold"}>Category:</Text> {newsData[0]?.category}
            </Text>{" "}
            - <Text>{newsData[0]?.readMinutes} min read</Text> -
            <Text>{newsData[0]?.date}</Text>
          </Flex>
        </Box>
      </Flex>
      <Box
        borderTop={"1px solid #dbdbdb"}
        py={"10px"}
        borderBottom={"1px solid #dbdbdb"}
        display={"flex"}
        alignItems={"center"}
        gap="10px"
      >
        <Button
          onClick={
            user
              ? () =>
                  isSaved ? onDelete(newsData[0]?.id) : saveData(newsData[0])
              : () => router.push("/")
          }
          variant={"unstyled"}
        >
          {!isSaved ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 25 24"
              fill="#6B6B6B"
            >
              <path
                d="M18 1.25C18 1.11739 18.0527 0.990215 18.1464 0.896447C18.2402 0.802678 18.3674 0.75 18.5 0.75C18.6326 0.75 18.7598 0.802678 18.8536 0.896447C18.9473 0.990215 19 1.11739 19 1.25V3.75H21.5C21.6326 3.75 21.7598 3.80268 21.8536 3.89645C21.9473 3.99021 22 4.11739 22 4.25C22 4.38261 21.9473 4.50979 21.8536 4.60355C21.7598 4.69732 21.6326 4.75 21.5 4.75H19V7.25C19 7.38261 18.9473 7.50979 18.8536 7.60355C18.7598 7.69732 18.6326 7.75 18.5 7.75C18.3674 7.75 18.2402 7.69732 18.1464 7.60355C18.0527 7.50979 18 7.38261 18 7.25V4.75H15.5C15.3674 4.75 15.2402 4.69732 15.1464 4.60355C15.0527 4.50979 15 4.38261 15 4.25C15 4.11739 15.0527 3.99021 15.1464 3.89645C15.2402 3.80268 15.3674 3.75 15.5 3.75H18V1.25ZM7 5.75C7 5.48478 7.10536 5.23043 7.29289 5.04289C7.48043 4.85536 7.73478 4.75 8 4.75H11.5C11.6326 4.75 11.7598 4.69732 11.8536 4.60355C11.9473 4.50979 12 4.38261 12 4.25C12 4.11739 11.9473 3.99021 11.8536 3.89645C11.7598 3.80268 11.6326 3.75 11.5 3.75H8C7.46957 3.75 6.96086 3.96071 6.58579 4.33579C6.21071 4.71086 6 5.21957 6 5.75V19.75C6 19.8429 6.02586 19.9339 6.07467 20.0129C6.12349 20.0919 6.19334 20.1557 6.27639 20.1972C6.35945 20.2387 6.45242 20.2563 6.5449 20.248C6.63738 20.2396 6.72572 20.2057 6.8 20.15L12.5 15.75L18.2 20.15C18.2743 20.2057 18.3626 20.2396 18.4551 20.248C18.5476 20.2563 18.6406 20.2387 18.7236 20.1972C18.8067 20.1557 18.8765 20.0919 18.9253 20.0129C18.9741 19.9339 19 19.8429 19 19.75V11.25C19 11.1174 18.9473 10.9902 18.8536 10.8964C18.7598 10.8027 18.6326 10.75 18.5 10.75C18.3674 10.75 18.2402 10.8027 18.1464 10.8964C18.0527 10.9902 18 11.1174 18 11.25V18.73L12.8 14.73C12.7135 14.6651 12.6082 14.63 12.5 14.63C12.3918 14.63 12.2865 14.6651 12.2 14.73L7 18.73V5.75Z"
                fill="#6B6B6B"
              />{" "}
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="#008000" 
              style={{marginTop:"5px"}}
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          )}
        </Button>
        <Button
          onClick={() => {
            writeComment();
          }}
          variant={"unstyled"}
        >
          <svg fill="#6B6B6B" width="30" height="30" viewBox="0 0 24 24">
            <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
          </svg>
        </Button>
      </Box>
      <Box>
        <Text my={"20px"} fontSize={"20px"}>
          {newsData[0]?.description}
        </Text>
        <Image
          alt="img"
          src={newsData[0]?.photo}
          width={680}
          height={500}
          style={{ width: "100%", padding: "20px 0 20px 0" }}
        />
        <Text fontSize={"20px"}>{newsData[0]?.article}</Text>
      </Box>
      <Comments dataForComments={newsData} />
    </Container>
  );
};

export default New;
