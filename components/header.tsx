import { Box, Center, Container, Flex, Heading, Text } from "@chakra-ui/layout";

import { IconButton } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Divider } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/icon";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import Link from "next/link";

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
    title: "Kick Off 2024",
    to: "/kickoff",
  },
  // {
  //   title: "Blog",
  //   to: "/blog",
  // },
  // {
  //   title: "Projects",
  //   to: "/projects",
  // },
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
    {items.map(({ title, to }) =>
      to === "/kickoff" ? (
        <Link href={to} key={title}>
          <a>
            <Box key={title} m="2" bg="#e8d095" p={2} borderRadius="md">
              <Text fontFamily="Raleway">{title}</Text>
            </Box>
          </a>
        </Link>
      ) : (
        <Link href={to} key={title}>
          <a>
            <Box key={title} m="2">
              <Text fontFamily="Raleway">{title}</Text>
            </Box>
          </a>
        </Link>
      )
    )}
  </Flex>
);

const NofiticationBar = () => (
  <Box bg="green.600" py="1">
    <Container maxW="container.xl">
      <Center>
        <a
          href="https://discord.gg/gRK5XZ5r?event=1022675053009178717"
          target={"_blank"}
        >
          <Text fontWeight="extrabold" color="white">
            Kick-off event is happening Sept, 28th, 2022 at 6pm. RSVP now!
          </Text>
        </a>
      </Center>
    </Container>
  </Box>
);

export const Header = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box as="header">
      <Container maxW="container.xl" my="2">
        <Flex align="center" justify="space-between">
          <Link href="/">
            <a>
              <Logo />
            </a>
          </Link>
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
      {/* <NofiticationBar /> */}
    </Box>
  );
};
