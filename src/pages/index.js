import { Container } from "@chakra-ui/react";
import AllNews from "@/components/AllNews";
export default function HomePage() {
  return (
    <Container m={"0 auto"} maxW={"1280px"}>
      <AllNews />
    </Container>
  );
}
