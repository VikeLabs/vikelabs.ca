import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import "../styles/globals.css";

import "@fontsource/kanit";
// import "@fontsource/raleway";
import "@fontsource/raleway/700.css";
import Wrapper from "../components/Wrapper";
import { AuthContextProvider } from "../components/AuthProvider";
// import "@fontsource/raleway/800.css";
// import "@fontsource/raleway/900.css";

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
