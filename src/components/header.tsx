import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  LinkBox,
  Text,
} from "@chakra-ui/layout";
import { Link } from "gatsby";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Divider } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

type MenuItem = { title: string; to: string };

const menuItems: MenuItem[] = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Blog",
    to: "/blog",
  },
  {
    title: "Projects",
    to: "/projects",
  },
];

const Logo = () => (
  <Heading fontFamily="Raleway" fontWeight="extrabold">
    VIKELABS
  </Heading>
);

const MenuIcon = () => (
  <Icon as={GiHamburgerMenu} title="menu icon" boxSize="2rem" />
);

const CloseIcon = () => <Icon as={MdClose} title="close icon" boxSize="2rem" />;

const MenuBar = ({ items }: { items: MenuItem[] }) => (
  <Flex as="nav" direction={["column", "row", null]} align="center">
    {items.map(({ title, to }) => (
      <LinkBox key={title} m="2" as={Link} to={to}>
        <Text fontFamily="Raleway">{title}</Text>
      </LinkBox>
    ))}
  </Flex>
);

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="header">
      <Container maxW="container.xl" my="2">
        <Flex align="center" justify="space-between">
          <Logo />
          <Box display={["none", "block"]}>
            <MenuBar items={menuItems} />
          </Box>
          <Box display={["block", "none"]}>
            <IconButton
              size="sm"
              aria-label="open/close menu"
              variant="ghost"
              onClick={onToggle}
              icon={isOpen ? <CloseIcon /> : <MenuIcon />}
            />
          </Box>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Box p="1" mt="4" display={["block", "none"]}>
            <MenuBar items={menuItems} />
            <Divider />
          </Box>
        </Collapse>
      </Container>
      <Box bg="green.600" py="1">
        <Container maxW="container.xl">
          <Center>
            <Text fontWeight="extrabold" color="white">
              Want to learn React? We've go a workshop coming up.
            </Text>
          </Center>
        </Container>
      </Box>
    </Box>
  );
};
