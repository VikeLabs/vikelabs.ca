import { Box } from "@chakra-ui/react";
import {
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Contact, DiscordIcon, discordInvite } from "../components/contact";
import { BaseLayout as Layout } from "../layouts/base";
import { Metadata } from "../components/metadata";
import { Button, ButtonGroup } from "@chakra-ui/button";
import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import vikeLabsPhoto from "../public/vikelabs.jpg";
import Wrapper from "../components/wrapper";

const connect =
  "Network with like-minded, passionate other students and professionals within the industry. We're active in on Discord and GitHub.";
const learn =
  "Learn new skills and technologies through workshops and events. Work with peers to build projects and applications.";
const build =
  "Build projects and applications that you can add to your portfolio and resume. ";

export const Index: NextPage = () => {
  return <Wrapper>stub</Wrapper>;
};

export default Index;
