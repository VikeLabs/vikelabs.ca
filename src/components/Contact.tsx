import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { GrFacebook, GrGithub, GrInstagram, GrLinkedin } from "react-icons/gr";
import { FaDiscord } from "react-icons/fa";
import { Box } from "./Box";
import { Text } from "./Text";
import { Button } from "./Button";
import { SubHeading } from "./Heading";

const IconContainer = styled.div`
  color: black;
  margin-right: 15px;
`;

const ContactContainer = styled.footer``;

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
        }
      }
    }
  `);
  return (
    <ContactContainer id="contact">
      <SubHeading>Contact Us</SubHeading>
      <Box
        display="flex"
        flexDirection={{ sm: "column", md: "row" }}
        justifyContent="space-between"
      >
        <Box>
          <Text>
            Looking for your next great co-op? Have feedback about the website?
            Interested in sponsoring the club? Let us know!
          </Text>
          <Box display="flex">
            <a
              href={`https://github.com/${data.site.siteMetadata.github || ""}`}
            >
              <IconContainer>
                <GrGithub size="40px" />
              </IconContainer>
            </a>
            <a href={data.site.siteMetadata.discord || "#"}>
              <IconContainer>
                <FaDiscord size="40px" />
              </IconContainer>
            </a>
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
          </Box>
        </Box>
        <Box display="flex" flexDirection="column">
          <Button mb="3">Say hello!</Button>
          <Button>Join Our Discord!</Button>
        </Box>
      </Box>
    </ContactContainer>
  );
};
