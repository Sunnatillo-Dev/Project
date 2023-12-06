import "@/styles/globals.css";
import Layout from "@/layout";
import { ChakraProvider } from "@chakra-ui/react";
import ModalContext from "@/Context/Modal.context";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ModalContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalContext>
    </ChakraProvider>
  );
}
