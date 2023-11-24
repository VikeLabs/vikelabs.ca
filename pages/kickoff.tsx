import { SimpleGrid } from "@chakra-ui/layout";
import {
  Box,
  Flex,
  Grid,
  Container,
  Heading,
  Text,
  Button,
  Modal,
  useDisclosure,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ButtonGroup,
} from "@chakra-ui/react";
import { NextPage } from "next";
import Image from "next/image";
import { Contact, DiscordIcon } from "../components/contact";
import { Metadata } from "../components/metadata";
import { BaseLayout } from "../layouts/base";

import kickoff2021 from "../public/kickoff2021.jpg";
import vikelabsLogo from "../public/goldlogo.png";
import { useState } from "react";
import { useRouter } from "next/router";

export const discordInvite = "https://discord.gg/Znse6XaVNu";

export const KickOffModal = () => {
  const { isOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });

  const { pathname } = useRouter();
  const path = pathname.split("/")[1];
  if (path === "kickoff") {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent bg="#28282A">
        <ModalHeader color="white" fontSize="5xl">
          VikeLabs AGM 
        </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Flex
            w="full"
            justifyContent="space-between"
            gap={5}
            flexDirection={["column", "row"]}
          >
            <Heading fontSize="3xl" color="white">
              <Heading as="span" color="#e8d095" fontSize="3xl">
                Connect
              </Heading>{" "}
              with coders;
              <br />
              <Heading as="span" color="#e8d095" fontSize="3xl">
                Learn
              </Heading>{" "}
              new skills;
              <br />
              <Heading as="span" color="#e8d095" fontSize="3xl">
                Build
              </Heading>{" "}
              something awesome;
            </Heading>
            <Box>
              <Image
                alt="Gold VikeLabs logo"
                placeholder="blur"
                height="100%"
                width="120%"
                src={vikelabsLogo}
              />
            </Box>
          </Flex>
          <Flex w="full" justifyContent="end" my={6} gap={5} textAlign="right">
            <Box>
              <Heading color="#e8d095" fontSize="3xl">
                December 5th @ 6:30 PM
              </Heading>
              <Heading color="#e8d095" fontSize="3xl">
                Location: ECS 116
                {/* <a href="https://discord.gg/jrCzA49n?event=1153433953303265291" target="_blank" style={{ textDecoration: 'underline' }}>Discord</a> */}
              </Heading>
            </Box>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <ButtonGroup isAttached>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="orange" as="a" href="/kickoff">
              Learn more
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const KickOff: NextPage = () => {
  return (
    <BaseLayout>
      <Metadata
        title="VikeLabs Annual General Meeting"
        description="Learn more about VikeLabs, it's mission and it's members."
      />
      <Box bgGradient="linear(to-l, #9bd4d2, #ffc6e3)">
        <Container maxW="container.xl">
          <Flex>
            <Flex direction="column" justifyContent="center" gap={4} p={8}>
              <Heading
                as="h1"
                fontSize={["3em", "4em", "5em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                VikeLabs Annual General Meeting
              </Heading>
              <Heading
                as="h2"
                fontSize={["2em", "2em", "3em"]}
                color="gray.700"
                lineHeight={[1, 1, 1.15]}
              >
                Fall 2023
              </Heading>
              <Box my={4}>
                <Heading color="white">December 5th @ 6:30 PM</Heading>
                <Heading color="white">
                Location: ECS 116
                 {/* <a href="https://discord.gg/jrCzA49n?event=1153433953303265291" target="_blank" style={{ textDecoration: 'underline' }}>Discord</a> */}
                 </Heading>
              </Box>
              {/* <Text
                fontSize={["2em", "3em", "3em"]}
                color="orange.400"
                fontWeight="bold"
              >
                Connect; Learn; Build;
              </Text> */}
              <Box>
                <Button
                  variant="black"
                  leftIcon={DiscordIcon}
                  as="a"
                  href={discordInvite}
                >
                  Join Our Discord!
                </Button>
              </Box>
            </Flex>
            <Flex
              direction="column"
              justifyContent="center"
              display={["none", "none", "flex"]}
            >
              <Image
                alt="three VikeLabs members"
                placeholder="blur"
                height={450}
                width={600}
                src={kickoff2021}
                style={{
                  borderRadius: "20px",
                }}
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box py="10" bg="#108091" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading
              color="white"
              fontSize={["5xl", "6xl", "7xl"]}
              pl={4}
              alignSelf="center"
            >
              Connect;
            </Heading>
            <Text color="white" fontSize={["lg", "xl", "2xl"]}>
              Link up with fellow enthusiasts, brainstorm, and kick off some
              awesome collabs. Because when we connect, great things happen! 🤝
            </Text>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py="10" bg="#f28022" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading
              color="white"
              fontSize={["5xl", "6xl", "7xl"]}
              pl={4}
              alignSelf="center"
            >
              Learn;
            </Heading>
            <Text color="white" fontSize={["lg", "xl", "2xl"]}>
              Whether you're just starting out or you're the unofficial "tech
              guru" among your friends, there's always something new to pick up
              here. 📚 Let's level up together!
            </Text>
          </SimpleGrid>
        </Container>
      </Box>

      <Box py="10" bg="#d88af2" my="5">
        <Container maxW="container.xl">
          <SimpleGrid columns={[1, 1, 2]} spacing={10}>
            <Heading
              color="white"
              fontSize={["5xl", "6xl", "7xl"]}
              pl={4}
              alignSelf="center"
            >
              Build;
            </Heading>
            <Text color="white" fontSize={["lg", "xl", "2xl"]}>
              Got a wild idea? Let's make it happen! 🚀 At VikeLabs, we're all
              about turning those late-night "what if" thoughts into something
              real. Bring your ideas, and let's get crafting!
            </Text>
          </SimpleGrid>
        </Container>
      </Box>
      <Box py="10">
        <Container maxW="container.xl">
          <Contact />
        </Container>
      </Box>
    </BaseLayout>
  );
};

export default KickOff;
