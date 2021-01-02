import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import styled from "styled-components";
import { Box } from "./Box";
import { Text } from "./Text";
import { VikeLabs } from "./Logo";
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from "styled-system";

const FooterContainer = styled.footer<SpaceProps | LayoutProps | FlexboxProps>`
  ${space}
  ${flexbox}
  ${layout}
  display: flex;
`;

const StyledTitle = styled.span`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 2em;
  font-weight: 300;
`;

export const Footer = () => {
  return (
    <FooterContainer my="6" flexDirection={{ sm: "column", md: "row" }}>
      {/* TODO: logo / title */}
      <Box>
        <VikeLabs />
      </Box>
      {/* TODO: thin styling */}
      {/* TODO: make uvic into a hyperlink */}
      <Box px="4" borderRight="2px gray solid">
        <Box maxWidth="620px">
          <StyledTitle>
            VikeLabs is based at the University of Victoria.
          </StyledTitle>
          <Text>
            We acknowledge with respect the Lekwungen peoples on whose
            traditional territory the University of Victoria stands, and the
            Songhees, Esquimalt and W̱SÁNEĆ peoples whose historical
            relationships with the land continue to this day.
          </Text>
        </Box>
      </Box>
      <Box p="4">
        {/* TODO: sitemap */}
        {/* TODO: copyright */}
        <span>© {new Date().getFullYear()} VikeLabs</span>
      </Box>
    </FooterContainer>
  );
};
