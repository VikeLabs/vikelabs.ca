import { Box } from "@chakra-ui/layout";
import React from "react";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

export const BaseLayout = ({
  children,
  hasFooter = true,
}: {
  children: React.ReactNode;
  hasFooter?: boolean;
}) => {
  return (
    <Box p="0" m="0">
      <Header />
      <main>{children}</main>
      {hasFooter && <Footer />}
    </Box>
  );
};
