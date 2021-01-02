import React from "react";
import styled from "styled-components";
import { ButtonStyleProps, space, SpaceProps } from "styled-system";

export const Button = styled.button<ButtonStyleProps | SpaceProps>`
  ${space}
  background-color: black;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5em;
  font-weight: 300;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 25px 10px 25px;
`;
