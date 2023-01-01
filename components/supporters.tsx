import uvss from "../public/uvss.png";
import ess from "../public/ess.png";
import uvicCivil from "../public/uvic-civil.png";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";

export const Supporters = () => {
  return (
    <Box>
      <Heading my="5">Supporters</Heading>
      <Flex justify="space-evenly">
        <Center>
          <Image
            src={uvicCivil}
            alt="University of Victoria Civil Engineering Department"
            height={100}
            width={100}
          />
        </Center>
        <Center>
          <Image src={uvss} alt="University of Victoria Student Society" height={100} width={180} />
        </Center>
        <Center>
          <Image
            src={ess}
            alt="University of Victoria Engineering Student Society"
            height={100}
            width={100}
          />
        </Center>
      </Flex>
    </Box>
  );
};
