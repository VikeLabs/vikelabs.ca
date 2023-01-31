import { Avatar, Box, Card, CardBody, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { MemberInfo } from "../../../types";

const Members = ({ value }: { value: MemberInfo[] }) => {
  return (
    <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
      {value.map((member: MemberInfo, index: number) => (
        // TODO: values does not have users where isCredited is false
        // TODO: Need to change backend to return info to the lead about values
        // TODO: We only need the isCredited for public project view endpoint

        <Card
          size="sm"
          key={`${member.id}/${index}`}
          variant={member.isCredited ? "solid" : "filled"}
          opacity={member.isCredited ? 1 : 0.5}
        >
          <CardBody>
            <Flex>
              <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
              <Box ml="2.5" w="full">
                <Text fontWeight="600" p="0" m="0" noOfLines={1}>
                  {member.displayName ?? member.username}
                </Text>
                <Text fontSize="sm" p="0" m="0" noOfLines={1}>
                  Member
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Members;
