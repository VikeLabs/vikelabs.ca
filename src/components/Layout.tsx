import React from "react";
import { PageProps } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { Box } from "./Box";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "../global.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  margin: 0;
  padding: 0;
  max-width: 1080px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const InnerMain = styled(Box)`
  max-width: 1060px;
  width: 100%;
`;

type LayoutProps = {
  children?: React.ReactNode;
  location?: Extract<PageProps, "location">;
};

export const Layout = ({ children, location }: LayoutProps) => (
  <ThemeProvider theme={theme}>
    <Container>
      <Main>
        <Header />

        <InnerMain>{children}</InnerMain>
        <Footer />
      </Main>
    </Container>
  </ThemeProvider>
);
