import { useEffect } from "react";
import "@/styles/globals.css";
import Layout from "@/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import DynamicContext from "@/Context/dynamic";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const initializeClerk = async () => {
      // Ensure Clerk is initialized
      await fetch("/api/init-clerk"); // Assuming you have an API route to initialize Clerk
    };

    initializeClerk();
  }, []);

  return (
    <ChakraProvider>
      <ClerkProvider>
        <DynamicContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DynamicContext>
      </ClerkProvider>
    </ChakraProvider>
  );
}
