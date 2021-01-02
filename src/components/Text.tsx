import styled from "styled-components";
import { typography, TypographyProps } from "styled-system";

export const Text = styled.p<TypographyProps>`
  ${typography}
  font-family: ${(props) => props.theme.fontFamily}, Arial;
  font-weight: 300;
  font-style: normal;
  font-size: 1.2em;
`;
