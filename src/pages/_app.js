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
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
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
