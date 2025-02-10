import { Box, Container, Flex, Heading, Text, Link, SimpleGrid, Tag, useColorModeValue } from "@chakra-ui/react"
import { Contact } from "../components/contact"
import { BaseLayout } from "../layouts/base"
import { Metadata } from "../components/metadata"

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "green";
    case "Maintained":
      return "blue";
    case "Complete":
      return "purple";
    case "Inactive":
      return "red";
    case "Undecided":
      return "orange";
    default:
      return "yellow";
  }
};

const projects = [
  {
    id: 1,
    fields: { slug: "https://github.com/VikeLabs/courseup" },
    frontmatter: {
      title: "CourseUp",
      description: "A website built to simplify the experience of searching courses and building timetables for the University of Victoria (UVic).",
      status: "Inactive",
      tech: ["TypeScript", "React", "Firebase"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  },
  {
    id: 2,
    fields: { slug: "https://github.com/VikeLabs/coopme" },
    frontmatter: {
      title: "CoopMe",
      description: "A website built to simplify the experience of searching for co-op placements for students in British Columbia.",
      status: "Active",
      tech: ["Next.js", "TypeScript", "Tailwind", "Prisma", "PostgreSQL"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Spring 2024",
      term: "Spring 2024"
    }
  },
  {
    id: 3,
    fields: { slug: "https://github.com/VikeLabs/scholar-u" },
    frontmatter: {
      title: "Scholarship Finder",
      description: "A web application that allows users to search for scholarships based on various filters such as type of scholarship, faculty, and gender.",
      status: "Active",
      tech: ["React", "Node.js", "MongoDB"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  },
  {
    id: 4,
    fields: { slug: "https://github.com/VikeLabs/ecss-locker-registration" },
    frontmatter: {
      title: "ESS Locker Registration",
      description: "A website for registration and management of lockers, designed with mobile-first functionality. Now maintained by the UVic ECSS.",
      status: "Maintained",
      tech: ["Svelte", "TypeScript", "PostgreSQL", "Docker"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Spring 2024",
      term: "Spring 2024"
    }
  },
  {
    id: 5,
    fields: { slug: "https://github.com/VikeLabs/uvic-course-scraper" },
    frontmatter: {
      title: "UVic Course Scraper",
      description: "A Node.js library that parses information from UVic course calendars and schedules, using Cheerio for HTML parsing.",
      status: "Maintained",
      tech: ["Node.js", "Cheerio", "TypeScript"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  },
  {
    id: 6,
    fields: { slug: "https://github.com/VikeLabs/VikeEats" },
    frontmatter: {
      title: "VikeEats",
      description: "A map web application for tracking food establishments on campus, showing food offerings and dietary warnings.",
      status: "Active",
      tech: ["React", "Flask", "SQLite", "Beautiful Soup"],
      meetingTime: "Fridays at 4:15pm",
      lastUpdate: "Summer 2024",
      term: "Summer 2024"
    }
  },
  {
    id: 7,
    fields: { slug: "https://github.com/VikeLabs/study-sprints" },
    frontmatter: {
      title: "Study Sprints",
      description: "A browser extension using the Pomodoro technique to encourage good study habits, studying in 26-65 minute intervals and tracking past habits.",
      status: "Inactive",
      tech: ["JavaScript", "Next.js", "CSS", "HTML"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Spring 2024",
      term: "Spring 2024"
    }
  },
  {
    id: 8,
    fields: { slug: "https://github.com/VikeLabs/StudySpaceFinder" },
    frontmatter: {
      title: "Study Space Finder",
      description: "An application to find study spaces at the University of Victoria (UVic). Information is based on the class schedule gathered by UVic Course Scraper, and does not include room bookings by clubs or external groups.",
      status: "Inactive",
      tech: ["TypeScript", "React", "Python", "SQLite"],
      meetingTime: "No Meetings Planned",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  }
];

export default function Component() {
  const boxBg = useColorModeValue("white", "gray.700");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const textColor = useColorModeValue("gray.800", "gray.200");
  const linkColor = useColorModeValue("blue.600", "blue.300");
  const linkHoverColor = useColorModeValue("blue.800", "blue.500");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const gradientColor = useColorModeValue("linear(to-l, #9bd4d2, #ffc6e3)", "linear(to-l, #9bafd9, #103783)");

  return (
    <BaseLayout>
      <Box py="12" bgGradient={gradientColor}>
        <Container maxW="container.xl">
          <Flex direction="column" align="flex-start" color={textColor}>
            <Heading as="h1" size="3xl" mb={4} fontWeight="bold">
              Projects
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Projects are the heart and soul of VikeLabs. Here you'll find the
              various projects our members are currently working on and previous
              projects we've taken on.
            </Text>
            <Text fontSize="md" color={descriptionColor} mt={2}>
              Note: Meeting times shown are for Spring 2025. Times may change in future terms.
            </Text>
          </Flex>
        </Container>
      </Box>
      <Box minHeight="100vh">
        <Metadata title="Projects" />
        <Box py="10">
          <Container maxW="container.xl">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {projects.map((p) => (
                <Box
                  key={p.id}
                  as="section"
                  borderWidth={1}
                  borderRadius="lg"
                  p={6}
                  boxShadow={boxShadow}
                  bg={boxBg}
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    height="4px"
                    bgGradient="linear(to-r, blue.400, purple.500)"
                  />
                  <Heading as="h2" size="lg" mb={3}>
                    <Link href={`${p.fields.slug}`} color={linkColor} _hover={{ color: linkHoverColor, textDecoration: "underline" }}>
                      {p.frontmatter.title}
                    </Link>
                  </Heading>
                  <Text fontSize="md" mb={4} color={descriptionColor}>{p.frontmatter.description}</Text>
                  <Text fontWeight="medium" mb={2} color={textColor}>
                    Status: <Tag colorScheme={getStatusColor(p.frontmatter.status)}>{p.frontmatter.status}</Tag>
                  </Text>
                  <Text fontWeight="medium" mb={3} color={textColor}>
                    Project Meeting Time:{' '}
                    {p.frontmatter.meetingTime === 'No Meetings Planned' ? (
                      <Tag colorScheme="blue">No Meetings Planned</Tag>
                    ) : (
                      <Tag colorScheme="green">{p.frontmatter.meetingTime}</Tag>
                    )}
                  </Text>
                  <Text fontWeight="medium" mb={3} color={textColor}>
                    Last Major Update: <Tag colorScheme="purple">{p.frontmatter.lastUpdate}</Tag>
                  </Text>
                  <Flex wrap="wrap" gap={2} mt={4}>
                    {p.frontmatter.tech.map((tech) => (
                      <Tag key={`${p.id}-${tech}`} colorScheme="gray" fontSize="xs" fontWeight="medium">
                        {tech}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              ))}
            </SimpleGrid>
            <Box mt={16}>
              <Contact />
            </Box>
          </Container>
        </Box>
      </Box>
    </BaseLayout>
  )
}
