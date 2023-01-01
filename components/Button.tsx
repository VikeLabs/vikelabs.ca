import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const Shared = css`
  border: none;
  border-radius: var(--br);
  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;
  box-shadow: 2px 2px 3px rgb(0, 0, 0, 0.15);
  transition: 0.3s ease;
  :hover {
    filter: brightness(0.75) contrast(1.3);
    box-shadow: 0 0 4px rgb(0, 0, 0, 0.4);
  }
`;

const SmallButton = styled.button`
  ${Shared};
  font-weight: 500;
  padding: calc(1 * var(--sm)) calc(1.5 * var(--sm));
`;

const DefaultButton = styled.button`
  ${Shared};
  font-weight: 500;
  font-size: var(--md);
  padding: calc(1.5 * var(--sm)) var(--md);
`;

const LargeButton = styled.button`
  ${Shared};
  font-weight: 600;
  font-size: var(--lg);
  padding: calc(1.5 * var(--sm)) var(--md);
`;

const Button = ({ text, link, size }: { text: string; link?: string; size?: string }) => {
  switch (size) {
    case "sm":
      return (
        <a href={link || "#"}>
          <SmallButton>{text}</SmallButton>
        </a>
      );
    case "lg":
      return (
        <a href={link || "#"}>
          <LargeButton>{text}</LargeButton>
        </a>
      );
    default:
      return (
        <a href={link || "#"}>
          <DefaultButton>{text}</DefaultButton>
        </a>
      );
  }
};

export default Button;
