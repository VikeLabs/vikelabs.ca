import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { Footer } from "./Footer";
import { Header } from "./Header";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Main = styled.main`
  margin: 0;
  padding: 0;
  max-width: 1440px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const InnerMain = styled.div``;

type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => (
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
