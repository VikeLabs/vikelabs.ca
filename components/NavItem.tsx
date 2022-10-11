import React from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { NavigationLink } from "./NavBar";
import { useRouter } from 'next/router'

const Item = styled.div`
  display: inline-flex;
  align-content: center;
  padding: var(--md);
  font-weight: 500;
  cursor: pointer;
`

const NavItem = ({ navLink }: { navLink: NavigationLink }) => {
  const router = useRouter();
  const location = router.pathname;
  if (location === navLink.path) {
    return (
      <Item>{navLink.name}</Item>
    );
  }
  return (
    <Link href={navLink.path}>
      <Item>{navLink.name}</Item>
    </Link>
  );
}

export default NavItem;