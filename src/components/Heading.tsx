import React from "react";
import styled from "styled-components";
import { typography, TypographyProps } from "styled-system";

// TODO: simplier heading component (using single Heading component rather than multiple via a level / variants)
export const Heading = styled.h1<TypographyProps>`
  ${typography};

  font-family: ${(props) => props.theme.fontFamily};
  font-size: 3.5em;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const SubHeading = styled.h2<TypographyProps>`
  ${typography};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 2.5em;
  font-weight: 500;
  padding: 0;
  margin: 0;
`;
