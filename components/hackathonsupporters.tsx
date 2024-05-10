import ieee from "../public/ieee.jpeg";
import gsdc from "../public/gsdc.png";
import redbull from "../public/redbull.png";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";

export const Supporters = () => {
  return (
    <Box>
      <Heading my="5">Hackathon Supporters</Heading>
      <Flex justify="space-evenly">
        {/* <Center>
          <Image
            src={uvicCivil}
            alt="University of Victoria Civil Engineering Department"
            height={100}
            width={100}
          />
        </Center> */}
        {/* <Center>
          <Image
            src={uvss}
            alt="University of Victoria Student Society"
            height={100}
            width={180}
          />
        </Center> */}
        {/* <Center>
          <Image
            src={gsdc}
            alt="UVic Google Student Developer Club"
            height={100}
            width={100}
          />
        </Center> */}
        <Center>
          <Image
            src={ieee}
            alt="UVic IEEE Student Branch"
            height={100}
            width={100}
          />
        </Center>
        <Center>
          <Image src={redbull} alt="Redbull" height={100} width={100} />
        </Center>
      </Flex>
    </Box>
  );
};
