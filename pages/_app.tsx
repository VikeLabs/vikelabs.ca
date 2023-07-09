import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme";
import "../styles/globals.css";
import "@fontsource/kanit";
import "@fontsource/raleway/700.css";
import { AuthContextProvider } from "../components/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
