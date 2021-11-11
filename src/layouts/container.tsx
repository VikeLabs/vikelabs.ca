import { Container } from "@chakra-ui/layout";
import React from "react";
import { chakra } from "@chakra-ui/react";

const Wrapper = (props) => (
  <Container maxW="container.xl">{props.children}</Container>
);

export const BoxContainer = chakra(Wrapper);
