import {
  Button,
  Center,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { TechTag } from "../../types";

const TechTagCustomizer = ({
  label: techLabel,
  finalRef,
  isOpen,
  onSubmit,
  onClose,
}: {
  label: string;
  finalRef: React.RefObject<{ focus(options?: FocusOptions): void }>;
  isOpen: boolean;
  onSubmit: (tech: TechTag) => void;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("#333333");

  // Reset label everytime the modal mounts
  // Doing what the eslint error suggestions put it into an infinite loop, so ignoring it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (label === "" && isOpen) {
      setLabel(techLabel);
    }
  });

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setLabel("");
        onClose();
      }}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Technology Customizer</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody pb={6}>
          <SimpleGrid spacing={6} columns={2}>
            <HexColorPicker color={color} onChange={setColor} />
            <Wrap>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Language / Tools"
              />
              <Input
                value={color}
                onChange={(e) => {
                  if (!e.target.value.includes("#")) {
                    setColor("#" + e.target.value);
                  } else {
                    setColor(e.target.value);
                  }
                }}
              />
              <Spacer />
              <Center width="100%" height="auto">
                <Tag size="sm" variant="solid" borderRadius="sm" bgColor={color}>
                  {label}
                </Tag>
              </Center>
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => {
                  setLabel("");
                  onSubmit({ label, color });
                  onClose();
                }}
                isDisabled={!techLabel.length}
                width="100%"
              >
                Add Technology
              </Button>
            </Wrap>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TechTagCustomizer;
