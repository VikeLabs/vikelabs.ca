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
  typography,
  TypographyProps,
} from "styled-system";

const FooterContainer = styled.footer<SpaceProps | LayoutProps | FlexboxProps>`
  ${space}
  ${flexbox}
  ${layout}
  display: flex;
  padding: 0;
  margin: 35px 0 35px 0;
`;

const StyledTitle = styled.span<TypographyProps>`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 2em;
  font-weight: 300;
  ${typography}
`;

const CopyrightText = styled.span`
  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 300;
`;

const LogoWrapper = styled(Box)`
  padding-top: 20px;
  /* hides the logo when smaller than lg */
  @media (max-width: ${(props) => props.theme.breakpoints.lg}) {
    display: none;
  }
`;

export const Footer = () => {
  return (
    <FooterContainer my="6" flexDirection={{ sm: "column", md: "row" }}>
      {/* TODO: logo / title */}
      <LogoWrapper>
        <VikeLabs />
      </LogoWrapper>
      {/* TODO: thin styling */}
      {/* TODO: make uvic into a hyperlink */}
      <Box px="4" borderRight={{ md: "2px gray solid" }}>
        <Box maxWidth="620px">
          <StyledTitle fontSize={{ sm: "1.5em", md: "1.5em", lg: "2em" }}>
            VikeLabs is based at the{" "}
            <a href="https://uvic.ca">University of Victoria.</a>
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
        <CopyrightText>© {new Date().getFullYear()} VikeLabs</CopyrightText>
      </Box>
    </FooterContainer>
  );
};
