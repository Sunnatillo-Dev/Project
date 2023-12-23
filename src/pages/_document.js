import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Fira+Sans&family=Inter&family=Montserrat&family=Poppins&display=swap"
          rel="stylesheet"
        />
        <title>Medium</title>
      </Head>
      <body
        style={{ fontFamily: "Inter" }}
        marginwidth={0}
        marginheight={0}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
