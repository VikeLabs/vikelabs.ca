import { Box } from "@chakra-ui/layout";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export const BaseLayout = ({ children }) => {
  return (
    <Box p="0" m="0">
      <Header />
      <main>{children}</main>
      <Footer />
    </Box>
  );
};
