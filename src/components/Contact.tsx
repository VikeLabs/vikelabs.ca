import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { GrFacebook, GrGithub, GrInstagram, GrLinkedin } from "react-icons/gr";
import { FaDiscord } from "react-icons/fa";
import { Box, Flex } from "./Box";
import { Text } from "./Text";
import { Button } from "./Button";
import { SubHeading } from "./Heading";

const IconContainer = styled.div`
  color: black;
  margin-right: 15px;
`;

const ContactContainer = styled.footer``;

const Wave = () => {
  const [index, setIndex] = React.useState(0);
  // TODO: shuffle/randomize order
  const hands = ["👋", "👋🏻", "👋🏼", "👋🏽", "👋🏾", "👋🏿"];

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIndex((index + 1) % hands.length);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [index]);

  return <span>{hands[index]}</span>;
};

export const Contact = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          github
          discord
          linkedin
          facebook
          instagram
          discordInviteURL
        }
      }
    }
  `);
  return (
    <ContactContainer id="contact">
      <SubHeading>Contact Us</SubHeading>
      <Flex
        flexDirection={{ sm: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box maxWidth="620px">
          <Text>
            Looking for your next great co-op? Have feedback about the website?
            Interested in sponsoring the club? Let us know!
          </Text>
          <Flex
            flexDirection="row"
            justifyContent={{ sm: "space-between", md: "flex-start" }}
            my="4"
          >
            <a
              href={`https://github.com/${data.site.siteMetadata.github || ""}`}
            >
              <IconContainer>
                <GrGithub size="40px" />
              </IconContainer>
            </a>
            {/* <a href={data.site.siteMetadata.discord || "#"}>
              <IconContainer>
                <FaDiscord size="40px" />
              </IconContainer>
            </a> */}
            <a
              href={`https://ca.linkedin.com/company/${data.site.siteMetadata.linkedin}`}
            >
              <IconContainer>
                <GrLinkedin size="40px" />
              </IconContainer>
            </a>
            <a
              href={`https://www.facebook.com/${
                data.site.siteMetadata.facebook || ""
              }`}
            >
              <IconContainer>
                <GrFacebook size="40px" />
              </IconContainer>
            </a>
            <a
              href={`https://instagram.com/${
                data.site.siteMetadata.instagram || ""
              }`}
            >
              <IconContainer>
                <GrInstagram size="40px" />
              </IconContainer>
            </a>
          </Flex>
        </Box>
        <Flex
          flexDirection={{ sm: "row", md: "column" }}
          justifyContent={{ sm: "space-between", md: "flex-start" }}
        >
          {/* <a href={data.site.siteMetadata.discordInviteURL}>
            <Button mb="3" minWidth="200">
              Say hello! <Wave />
            </Button>
          </a> */}
          <a href={data.site.siteMetadata.discordInviteURL || "#"}>
            <Button minWidth="200px">Join Our Discord!</Button>
          </a>
        </Flex>
      </Flex>
    </ContactContainer>
  );
};
