import styled from "@emotion/styled";
import React from "react";
import { useAuthContext } from "./AuthProvider";
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

const NavBar = ({ navLinks }: { navLinks: NavigationLink[] }) => {
  const {user} = useAuthContext();
  return (
    <NavRow>
      {navLinks.map((navLink: NavigationLink) => (
        <NavItem navLink={navLink} />
      ))}
      {user && user.token && <NavItem navLink={{name: "Dashboard", path: "/dashboard"}} />}
    </NavRow>
  )
}
export default NavBar;