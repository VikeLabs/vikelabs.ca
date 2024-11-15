// _app.tsx
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";

import "@fontsource/kanit";
// import "@fontsource/raleway";
import "@fontsource/raleway/700.css";
// import "@fontsource/raleway/800.css";
// import "@fontsource/raleway/900.css";

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Include ColorModeScript for color mode management */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default App;