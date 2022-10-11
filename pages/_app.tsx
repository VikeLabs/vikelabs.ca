import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import "../styles/globals.css";

import "@fontsource/kanit";
// import "@fontsource/raleway";
import "@fontsource/raleway/700.css";
// import "@fontsource/raleway/800.css";
// import "@fontsource/raleway/900.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
