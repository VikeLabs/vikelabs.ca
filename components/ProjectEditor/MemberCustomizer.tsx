import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ImageInfo, MemberInfo } from "../../types";
import FileUploader from "../FileUploader";

const MemberCustomizer = ({
  member,
  finalRef,
  isOpen,
  onSubmit,
  onClose,
}: {
  member: { index: number; data: MemberInfo };
  finalRef: React.RefObject<{ focus(options?: FocusOptions): void }>;
  isOpen: boolean;
  onSubmit: (index: number, member: MemberInfo) => void;
  onClose: () => void;
}) => {
  const [memberRole, setMemberRole] = useState("");

  // Reset label everytime the modal mounts
  // Doing what the eslint error suggestions put it into an infinite loop, so ignoring it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (memberRole === "" && isOpen) {
      setMemberRole(member?.data?.role ?? "Member");
    }
  });

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setMemberRole("");
        onClose();
      }}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Member Customizer</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody pb={6}>
          <SimpleGrid spacing={6} columns={2}>
            <Center>
              <Card size="sm" key={member?.data?.id} variant="solid" w={200}>
                <CardBody>
                  <Flex>
                    <Avatar
                      src={member?.data?.imageUrl}
                      name={member?.data?.displayName ?? member?.data?.username}
                    />
                    <Box ml="2.5" w="full">
                      <Text fontWeight="600" p="0" m="0" noOfLines={1}>
                        {member?.data?.displayName ?? member?.data?.username}
                      </Text>
                      <Text fontSize="sm" p="0" m="0" noOfLines={1}>
                        {memberRole}
                      </Text>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Center>
            <Wrap>
              <Input
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                placeholder="Image Alt Text"
              />
              <Spacer />
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => {
                  onSubmit(member?.index, {
                    ...member?.data,
                    role: memberRole,
                  });
                  setMemberRole("");
                  onClose();
                }}
                isDisabled={!memberRole}
                width="100%"
              >
                Update Member
              </Button>
            </Wrap>
          </SimpleGrid>
        </ModalBody>
        {!member?.data?.isCredited && (
          <ModalFooter>
            <Text>
              {member?.data?.displayName ?? member?.data?.username} has not granted permission to
              show their contribution. Please remind them to allow crediting onto this project.
            </Text>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default MemberCustomizer;
