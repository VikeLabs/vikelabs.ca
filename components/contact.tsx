import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/button";
import { Heading, useMediaQuery, useColorMode } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icon";
import { GoMarkGithub } from "react-icons/go";
import { GrInstagram, GrLinkedin, GrYoutube } from "react-icons/gr";
import { SiDiscord, SiGoogledrive } from "react-icons/si";

export const GitHubIcon = (
  <Icon as={GoMarkGithub} color="black" title="GitHub logo" boxSize="2rem" />
);

export const DiscordIcon = (
  <Icon as={SiDiscord} color="white" title="Discord logo" boxSize="1.5rem" />
);

export const GoogleIcon = (
  <Icon
    as={SiGoogledrive}
    color="white"
    title="Discord logo"
    boxSize="1.5rem"
  />
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

export const discordInvite = "https://discord.gg/Znse6XaVNu";
const github = "vikelabs";
const linkedin = "vikelabs";
const instagram = "vikelabs";
const youtube = "https://www.youtube.com/channel/UCKAAXo4bqb034PZYR6ZhpQw";

export const Contact = () => {
  const { colorMode } = useColorMode();
  const iconColor = colorMode === "light" ? "black" : "white";
  const [isSmall] = useMediaQuery("(max-width: 600px)");
  return (
    <Box my="8">
      <Heading>Contact Us</Heading>
      <Flex align="center" justify="space-between">
        <Box>
          {!isSmall && (
            <Text my="2">
              Looking for your next great co-op? Have feedback about the
              website? Interested in sponsoring the club? Let us know!
            </Text>
          )}
          <Box>
            <IconButton
              as={"a"}
              href={`https://github.com/${github}`}
              target="_blank"
              icon={<Icon as={GoMarkGithub} color={iconColor} boxSize="2rem" />}
              isRound
              aria-label="vikelabs github"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={`https://www.linkedin.com/company/${linkedin}`}
              target="_blank"
              icon={<Icon as={GrLinkedin} color={iconColor} boxSize="2rem" />}
              aria-label="vikelabs linkedin"
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              icon={<Icon as={GrInstagram} color={iconColor} boxSize="2rem" />}
              aria-label="vikelabs instagram"
              boxSize="2rem"
              variant="unstyled"
              mr="2"
            />
            <IconButton
              as={"a"}
              href={youtube}
              target="_blank"
              icon={<Icon as={GrYoutube} color={iconColor} boxSize="2rem" />}
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
            leftIcon={<Icon as={SiDiscord} color={iconColor} boxSize="1.5rem" />}
            as="a"
            href={discordInvite}
            _hover={{ bg: "gray.700", color: "white" }}
          >
            Join Our Discord!
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
