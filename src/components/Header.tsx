import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Box } from "./Box";
import { VikeLabs, VikeLabsLogo } from "./Logo";

const HeaderContainer = styled.header`
  ${space}
  display: flex;
  justify-content: space-between;
  align-content: center;
`;

const NavLinkContainer = styled.span`
  padding-left: 20px;
  padding-right: 20px;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 1.5em;
  font-weight: 500;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const Header = () => {
  return (
    <HeaderContainer py="20px">
      <Box>
        <VikeLabsLogo color="green" />
        <VikeLabs />
      </Box>
      <Box>
        {/* TODO: menu */}
        <Nav>
          <Link to="/">
            <NavLinkContainer>Home</NavLinkContainer>
          </Link>
          <Link to="/projects">
            <NavLinkContainer>Projects</NavLinkContainer>
          </Link>
        </Nav>
        {/* TODO: dark/light mode button */}
      </Box>
    </HeaderContainer>
  );
};
