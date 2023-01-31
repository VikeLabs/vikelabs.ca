import { Avatar, Box, Card, CardBody, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { MemberInfo } from "../../../types";

const Members = ({ value }: { value: MemberInfo[] }) => {
  return (
    <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
      {value.map((value: MemberInfo) => (
        // TODO: values does not have users where isCredited is false
        // TODO: Need to change backend to return info to the lead about values
        // TODO: We only need the isCredited for public project view endpoint
        <Card size="sm" key={value.id}>
          <CardBody>
            <Flex>
              <Avatar src={value.imageUrl} name={value.displayName ?? value.username} />
              <Box ml="3">
                <Text fontWeight="bold">{value.displayName ?? value.username}</Text>
                <Text fontSize="sm">Member</Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Members;
