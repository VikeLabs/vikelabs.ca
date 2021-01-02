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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding-left: 20px;
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
  return (
    <HeaderContainer py="20px">
      <Box>
        {/* <VikeLabsLogo color="green" /> */}
        <VikeLabs />
      </Box>
      <Box>
        {/* TODO: menu */}
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
        </Nav>
        {/* TODO: dark/light mode button */}
      </Box>
    </HeaderContainer>
  );
};
