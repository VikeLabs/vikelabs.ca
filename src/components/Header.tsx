import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { flexbox, FlexboxProps, space, SpaceProps } from "styled-system";
import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Flex } from "./Box";
import { VikeLabs, VikeLabsLogo } from "./Logo";

const HeaderContainer = styled.header<SpaceProps | FlexboxProps>`
  ${space}
  ${flexbox}
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
`;

const Nav = styled.nav<FlexboxProps>`
  ${flexbox}
  display: flex;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  /* padding-left: 20px; */
  padding-right: 20px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5em;
  font-weight: 500;
  text-decoration: none;

  color: black;
  &:hover {
    text-decoration: none;
  }
`;

export const Header = () => {
  // const pathname = typeof window !== undefined ? window.location.pathname : "";

  return (
    <HeaderContainer
      mx={{ sm: "20px", md: "30px", lg: "40px" }}
      py="20px"
      flexDirection={{ sm: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Flex justifyContent="flex-start">
        {/* <VikeLabsLogo color="green" /> */}
        <VikeLabs />
      </Flex>
      <Box mt={{ sm: "20px", md: "0px", lg: "0px" }}>
        {/* TODO: menu */}
        <Nav justifyContent="flex-start">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          {/* <GiHamburgerMenu size="1.5em" /> */}
        </Nav>
        {/* TODO: dark/light mode button */}
      </Box>
    </HeaderContainer>
  );
};
