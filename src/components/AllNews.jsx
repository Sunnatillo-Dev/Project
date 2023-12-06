import React, { useEffect, useState } from "react";
import { Grid, Text } from "@chakra-ui/react";
import axios from "axios";
import SingleNew from "@/components/SingleNew";
import InfiniteScroll from "react-infinite-scroll-component";
import { v4 } from "uuid";
import { Audio } from "react-loader-spinner";
import Loader from "@/components/Loader";
export default function AllNews() {
  let [data, setData] = useState([]);
  let [hasMore, setHasMore] = useState(true);
  let [num, setNum] = useState(7);
  let [fromNum, setFromNum] = useState(0);
  let [dataLength, setDataLength] = useState(1);

  let fetchData = () => {
    setTimeout(() => {
      axios
        .get("api/newsapi", {
          id: v4(),
        })
        .then((res) => setData([...data, ...res.data.slice(fromNum, num)]));
      setNum((prev) => prev + 4);
      setFromNum(num);
      if (dataLength == data.length) {
        setHasMore(false);
      }
    }, 1100);
  };
  useEffect(() => {
    axios
      .get("api/newsapi")
      .then((res) => (dataLength = setDataLength(res.data.length)));
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<Loader />}
    >
      <Grid my={"20px"} gap={"30px"} templateColumns={"repeat(1,1fr)"}>
        {data?.slice(0, num).map((item) => {
          return (
            <SingleNew
              readMinutes={item.readMinutes}
              key={item.id}
              id={item.id}
              photo={item.photo}
              avatar={item.avatar}
              author={item.author}
              title={item.title}
              date={item.date}
              description={item.description}
            />
          );
        })}
      </Grid>
    </InfiniteScroll>
  );
}
