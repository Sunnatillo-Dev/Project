import { Container } from "@chakra-ui/react";
import AllNews from "@/components/AllNews";
import { useUser } from "@clerk/nextjs";
import Guest from "@/components/for guests/guest";
import GuestCatigory from "@/components/for guests/guestCatigory";
export default function HomePage() {
  let { user } = useUser();
  return (
    <>
      {!user && <Guest />}
      <Container
        display={"flex"}
        justifyContent={"space-between"}
        m={"0 auto"}
        maxW={"1280px"}
        position={"relative"}
      >
        <AllNews />
        <GuestCatigory />
      </Container>
    </>
  );
}
