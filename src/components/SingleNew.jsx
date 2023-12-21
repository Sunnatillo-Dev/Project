import axios from "axios";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { CiCircleMinus } from "react-icons/ci";
import { memo, useContext, useMemo } from "react";
import Image from "next/image";
import NewsDataFromJson from "@/data/News.json";
import { DynamicProvider } from "@/Context/dynamic";
import { useRouter } from "next/router";
function SingleNew({
  readMinutes,
  avatar,
  author,
  date,
  title,
  description,
  id,
  photo,
}) {
  let router = useRouter();
  let { userData, setNewsData, setUserData, newsData } =
    useContext(DynamicProvider);
  let getNewsData = (id) => {
    setNewsData(
      NewsDataFromJson.filter((singleNew) => {
        return singleNew.id == id;
      })
    );
    console.log(
      NewsDataFromJson.filter((singleNew) => {
        return singleNew.id == id;
      })
    );
    router.push("/new");
  };
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
        <Box mb={"12px"} gap={"10px"} display={"flex"} alignItems={"center"}>
          <Image
            width={24}
            style={{ borderRadius: "100%", height: "24px", objectFit: "cover" }}
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
          {description.split("").slice(0, 214).join("")} ...
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
              opacity={0.7}
              _hover={{ opacity: 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="#6B6B6B"
              >
                <path
                  d="M18 1.25C18 1.11739 18.0527 0.990215 18.1464 0.896447C18.2402 0.802678 18.3674 0.75 18.5 0.75C18.6326 0.75 18.7598 0.802678 18.8536 0.896447C18.9473 0.990215 19 1.11739 19 1.25V3.75H21.5C21.6326 3.75 21.7598 3.80268 21.8536 3.89645C21.9473 3.99021 22 4.11739 22 4.25C22 4.38261 21.9473 4.50979 21.8536 4.60355C21.7598 4.69732 21.6326 4.75 21.5 4.75H19V7.25C19 7.38261 18.9473 7.50979 18.8536 7.60355C18.7598 7.69732 18.6326 7.75 18.5 7.75C18.3674 7.75 18.2402 7.69732 18.1464 7.60355C18.0527 7.50979 18 7.38261 18 7.25V4.75H15.5C15.3674 4.75 15.2402 4.69732 15.1464 4.60355C15.0527 4.50979 15 4.38261 15 4.25C15 4.11739 15.0527 3.99021 15.1464 3.89645C15.2402 3.80268 15.3674 3.75 15.5 3.75H18V1.25ZM7 5.75C7 5.48478 7.10536 5.23043 7.29289 5.04289C7.48043 4.85536 7.73478 4.75 8 4.75H11.5C11.6326 4.75 11.7598 4.69732 11.8536 4.60355C11.9473 4.50979 12 4.38261 12 4.25C12 4.11739 11.9473 3.99021 11.8536 3.89645C11.7598 3.80268 11.6326 3.75 11.5 3.75H8C7.46957 3.75 6.96086 3.96071 6.58579 4.33579C6.21071 4.71086 6 5.21957 6 5.75V19.75C6 19.8429 6.02586 19.9339 6.07467 20.0129C6.12349 20.0919 6.19334 20.1557 6.27639 20.1972C6.35945 20.2387 6.45242 20.2563 6.5449 20.248C6.63738 20.2396 6.72572 20.2057 6.8 20.15L12.5 15.75L18.2 20.15C18.2743 20.2057 18.3626 20.2396 18.4551 20.248C18.5476 20.2563 18.6406 20.2387 18.7236 20.1972C18.8067 20.1557 18.8765 20.0919 18.9253 20.0129C18.9741 19.9339 19 19.8429 19 19.75V11.25C19 11.1174 18.9473 10.9902 18.8536 10.8964C18.7598 10.8027 18.6326 10.75 18.5 10.75C18.3674 10.75 18.2402 10.8027 18.1464 10.8964C18.0527 10.9902 18 11.1174 18 11.25V18.73L12.8 14.73C12.7135 14.6651 12.6082 14.63 12.5 14.63C12.3918 14.63 12.2865 14.6651 12.2 14.73L7 18.73V5.75Z"
                  fill="#6B6B6B"
                />
              </svg>
            </Button>
            <Button
              transition={"all .2s"}
              background={"none"}
              border={"none"}
              opacity={0.5}
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
        style={{ width: "112px", height: "112px", objectFit: "cover" }}
        height={112}
        objectFit={"cover"}
        src={photo}
      />
    </GridItem>
  );
}
export default memo(SingleNew);
