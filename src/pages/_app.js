import "@/styles/globals.css";
import Layout from "@/layout";
import { ChakraProvider } from "@chakra-ui/react";
import ModalContext from "@/Context/Modal.context";
import IsRegistered from "@/Context/isRegistered";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <IsRegistered>
        <ModalContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalContext>
      </IsRegistered>
    </ChakraProvider>
  );
}
