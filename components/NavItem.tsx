import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { NavigationLink } from "./NavBar";

const FlexContainer = styled.div`
  display: inline-flex;
  align-content: center;
`;

const NavItem = ({ navLink }: { navLink: NavigationLink }) => (
  <Link href={navLink.path}>
    <FlexContainer>{navLink.name}</FlexContainer>
  </Link>
);

export default NavItem;