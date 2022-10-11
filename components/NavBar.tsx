import styled from "@emotion/styled";
import React from "react";
import NavItem from "./NavItem";

export type NavigationLink = {
  name: string;
  path: string;
};

const NavRow = styled.div`
  height: 100;
  display: flex;
  align-items: center;
`;

const NavBar = ({ navLinks }: { navLinks: NavigationLink[] }) => (
  <NavRow>
    {navLinks.map((navLink: NavigationLink) => (
      <NavItem navLink={navLink} />
    ))}
  </NavRow>
);

export default NavBar;