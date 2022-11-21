import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import "../styles/globals.css";

import "@fontsource/kanit";
import "@fontsource/raleway/700.css";
import { useEffect, useState } from "react";
import { AuthContextProvider } from "../components/AuthContextProvider";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;
