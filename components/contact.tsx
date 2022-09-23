import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Heading } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import { GoMarkGithub } from "react-icons/go";
import { GrInstagram, GrLinkedin, GrYoutube } from "react-icons/gr";
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

const InstagramIcon = (
  <Icon as={GrInstagram} color="black" title="Instagram logo" boxSize="2rem" />
);

const YouTubeIcon = (
  <Icon as={GrYoutube} color="black" title="YouTube logo" boxSize="2rem" />
);

const discordInvite = "https://discord.gg/Znse6XaVNu";
const github = "vikelabs";
const linkedin = "vikelabs";
const instagram = "vikelabs";
const youtube = "https://www.youtube.com/channel/UCKAAXo4bqb034PZYR6ZhpQw";

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
              as={"a"}
              href={`https://github.com/${github}`}
              // makes the link open in a new tab
              target="_blank"
              // specifies the icon
              icon={GitHubIcon}
              isRound
              aria-label="vikelabs github"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={`https://www.linkedin.com/company/${linkedin}`}
              target="_blank"
              icon={LinkedInIcon}
              aria-label="vikelabs linkedin"
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              icon={InstagramIcon}
              aria-label="vikelabs instagram"
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={youtube}
              target="_blank"
              icon={YouTubeIcon}
              aria-label="vikelabs youtube"
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
          </Box>
        </Box>
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
    </Box>
  );
};
