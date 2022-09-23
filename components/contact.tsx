import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import { GoMarkGithub } from "react-icons/go";
import { GrLinkedin } from "react-icons/gr";
import { SiDiscord } from "react-icons/si";

export const GitHubIcon = (
  <Icon as={GoMarkGithub} color="black" title="GitHub logo" boxSize="2rem" />
);

const DiscordIcon = (
  <Icon as={SiDiscord} color="white" title="Discord logo" boxSize="1.5rem" />
);

const LinkedInIcon = (
  <Icon as={GrLinkedin} color="black" title="LinkedIn logo" boxSize="2rem" />
);

export const Contact = () => {
  return (
    <Box my="8">
      <Heading>Contact Us</Heading>
      <Flex align="center" justify="space-between">
        <Box>
          <Text my="2">
            Looking for your next great co-op? Have feedback about the website?
            Interested in sponsoring the club? Let us know!
          </Text>
          <Box>
            <IconButton
              // make the button a link
              as={Link}
              // href={`https://github.com/${data.site.siteMetadata.github}`}
              // makes the link open in a new tab
              target="_blank"
              // specifies the icon
              icon={GitHubIcon}
              isRound
              aria-label=""
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={Link}
              // href={`https://www.linkedin.com/company/${data.site.siteMetadata.linkedin}`}
              target="_blank"
              icon={LinkedInIcon}
              aria-label=""
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
          </Box>
        </Box>
        <Box>
          <Button variant="black" leftIcon={DiscordIcon}>
            Join Our Discord!
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
