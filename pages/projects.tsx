import { Box, Container, Flex, Heading, Text, Link, SimpleGrid, VStack, Tag, HStack } from "@chakra-ui/react"
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
      return "gray";
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
      status: "Active",
      tech: ["TypeScript", "React", "Firebase"],
      meetingTime: "Fridays at 6-7pm",
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
      meetingTime: "Tuesdays at 4:30-5:30 PM",
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
      meetingTime: "Undecided",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  },
  {
    id: 4,
    fields: { slug: "https://github.com/VikeLabs/ecss-locker-registration" },
    frontmatter: {
      title: "ESS Locker Registration",
      description: "A website for registration and management of lockers, designed with mobile-first functionality.",
      status: "Maintained",
      tech: ["Svelte", "TypeScript", "PostgreSQL", "Docker"],
      meetingTime: "Undecided",
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
      meetingTime: "Undecided",
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
      meetingTime: "Undecided",
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
      status: "Active",
      tech: ["JavaScript", "Next.js", "CSS", "HTML"],
      meetingTime: "Undecided",
      lastUpdate: "Spring 2024",
      term: "Spring 2024"
    }
  },
  {
    id: 8,
    fields: { slug: "https://github.com/VikeLabs/StudySpaceFinder" },
    frontmatter: {
      title: "Study Space Finder",
      description: "An application to find study spaces at the University of Victoria (UVic).",
      status: "Inactive",
      tech: ["TypeScript", "React", "Python", "SQLite"],
      meetingTime: "Undecided",
      lastUpdate: "Fall 2023",
      term: "Fall 2023"
    }
  }
];

export default function Component() {
  return (
    <BaseLayout>
      <Box py="12" bgGradient="linear(to-l, #9bd4d2, #92b8ff)">
        <Container maxW="container.xl">
          <Flex direction="column" align="flex-start" color="gray.800">
            <Heading as="h1" size="3xl" mb={4} fontWeight="bold">
              Projects
            </Heading>
            <Text fontSize="xl" maxW="2xl">
              Projects are the heart and soul of VikeLabs. Here you'll find the
              various projects our members are currently working on and previous
              projects we've taken on.
            </Text>
            <Text fontSize="md" color="gray.600" mt={2}>
              Note: Meeting times shown are for Fall 2024. Times may change in future terms.
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
                  boxShadow="lg"
                  bg="white"
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
                    <Link href={`${p.fields.slug}`} color="blue.600" _hover={{ color: 'blue.800', textDecoration: "underline" }}>
                      {p.frontmatter.title}
                    </Link>
                  </Heading>
                  <Text fontSize="md" mb={4} color="gray.600">{p.frontmatter.description}</Text>
                  <Text fontWeight="medium" mb={2}>
                    Status: <Tag colorScheme={getStatusColor(p.frontmatter.status)}>{p.frontmatter.status}</Tag>
                  </Text>
                  <Text fontWeight="medium" mb={3}>
                    Project Meeting Time:{' '}
                    {p.frontmatter.meetingTime === 'Undecided' ? (
                      <Tag colorScheme="yellow">Undecided</Tag>
                    ) : (
                      <Tag colorScheme="green">{p.frontmatter.meetingTime}</Tag>
                    )}
                  </Text>
                  <Text fontWeight="medium" mb={3}>
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