import { Avatar, Box, Card, CardBody, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { MemberInfo } from "../../../types";

const Members = ({ value }: { value: MemberInfo[] }) => {
  return (
    <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
      {value.map((member: MemberInfo, index: number) => (
        <>
          {member.isCredited && (
            <Card size="sm" key={`${member.id}/${index}`}>
              <CardBody>
                <Flex>
                  <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
                  <Box ml="2.5">
                    <Text fontWeight="600" p="0" m="0" noOfLines={1}>
                      {member.displayName ?? member.username}
                    </Text>
                    <Text fontSize="sm" p="0" m="0" noOfLines={1}>
                      {member.role ?? "Member"}
                    </Text>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          )}
        </>
      ))}
    </SimpleGrid>
  );
};

export default Members;
