import { useEffect } from "react";
import "@/styles/globals.css";
import Layout from "@/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import DynamicContext from "@/Context/dynamic";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ClerkProvider
        {...pageProps}
        publishableKey={
          "pk_test_dWx0aW1hdGUtbGFkeWJ1Zy00Ni5jbGVyay5hY2NvdW50cy5kZXYk"
        }
      >
        <DynamicContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DynamicContext>
      </ClerkProvider>
    </ChakraProvider>
  );
}
