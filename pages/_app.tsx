import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

import "@fontsource/kanit";
// import "@fontsource/raleway";
import "@fontsource/raleway/700.css";
import { KickOffModal } from "./kickoff";
// import "@fontsource/raleway/800.css";
// import "@fontsource/raleway/900.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <KickOffModal />
    </ChakraProvider>
  );
}

export default App;
