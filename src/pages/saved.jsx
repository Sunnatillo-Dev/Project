import SingleNew from "@/components/SingleNew";
import { Container, Grid, Text } from "@chakra-ui/react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const SavedNews = () => {
  let [savedData, setSavedData] = useState([]);
  let [refresh, setRefresh] = useState(false);

  let { user } = useUser();

  let GetData = async () => {
    await axios
      .get("/api/saved")
      .then((res) => setSavedData(res.data))
      .finally(() => setRefresh((prevRefresh) => !prevRefresh));
  };

  useEffect(() => {
    GetData();
  }, [refresh]);
  return (
    <Container pt={"80px"} maxW={"680px"}>
      <Text fontSize={"42px"} pb={"20px"}>
        Saved News
      </Text>
      <Grid
        my={"20px"}
        gap={"30px"}
        width={"120%"}
        templateColumns={"repeat(1,1fr)"}
        maxW={"680px"}
      >
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
              <SingleNew
                id={id}
                key={id}
                avatar={avatar}
                author={author}
                date={date}
                title={title}
                description={description}
                readMinutes={readMinutes}
                photo={photo}
              />
            );
          }
        )}
      </Grid>
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
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              border: "1px solid gray",
              width: "100px",
            }}
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
