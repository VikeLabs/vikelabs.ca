// header.tsx
import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  Text,
  IconButton,
  Collapse,
  useColorMode,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons
import vikelabs from "../public/vikelabs-trans.png";
import Image from "next/image";
import Link from "next/link";

type MenuItem = { title: string; to: string };

const menuItems: MenuItem[] = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  // { title: "Hackathon", to: "/hackathon" },
  // { title: "Kick Off 2024", to: "/kickoff" },
  // { title: "Blog", to: "/blog" },
  { title: "Projects", to: "/projects" },
];

const Logo = () => (
  <Heading
    fontFamily="Raleway"
    fontWeight="extrabold"
    display="flex"
    alignItems="center"
    gap={4}
  >
    <Image
      alt="Three VikeLabs members"
      placeholder="blur"
      height={45}
      width={45}
      src={vikelabs}
      style={{}}
    />
    VIKELABS
  </Heading>
);

const MenuIcon = () => (
  <Icon as={GiHamburgerMenu} title="menu icon" boxSize="2rem" />
);

const CloseIcon = () => (
  <Icon as={MdClose} title="close icon" boxSize="2rem" />
);

const MenuBar = ({ items }: { items: MenuItem[] }) => (
  <Flex as="nav" direction={["column", "row", null]} align="center">
    {items.map(({ title, to }) => (
      <Link href={to} key={title}>
        <a href={to}>
          <Box key={title} m="2">
            <Text fontFamily="Raleway">{title}</Text>
          </Box>
        </a>
      </Link>
    ))}
  </Flex>
);

const NofiticationBar = () => (
  <Box bg="green.600" py="1">
    <Container maxW="container.xl">
      <Center>
        <a
          href="https://discord.gg/gRK5XZ5r?event=1022675053009178717"
          target={"_blank"}
          rel="noopener noreferrer"
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
  const { colorMode, toggleColorMode } = useColorMode(); // Use useColorMode hook

  return (
    <Box as="header">
      <Container maxW="container.xl" my="2">
        <Flex align="center" justify="space-between">
          <Link href="/">
            <a href="/">
              <Logo />
            </a>
          </Link>
          <Flex align="center">
            {/* Desktop Menu */}
            <Box display={["none", "block"]}>
              <MenuBar items={menuItems} />
            </Box>

            {/* Toggle Color Mode Button */}
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              onClick={toggleColorMode}
              icon={
                colorMode === "light" ? (
                  <Icon as={FaMoon} />
                ) : (
                  <Icon as={FaSun} />
                )
              }
              ml="2"
            />

            {/* Mobile Menu Icon */}
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