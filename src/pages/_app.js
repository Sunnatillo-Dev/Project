import { useEffect } from "react";
import "@/styles/globals.css";
import Layout from "@/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import DynamicContext from "@/Context/dynamic";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ClerkProvider {...pageProps}>
        <DynamicContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DynamicContext>
      </ClerkProvider>
    </ChakraProvider>
  );
}
