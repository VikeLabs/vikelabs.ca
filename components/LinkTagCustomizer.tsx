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
import { LinkTag, TechTag } from "../types";
import { colorShade, hexToRgbA } from "../utils/colorHelpers";

const LinkTagCustomizer = ({
  label: tagLabel,
  url: tagUrl,
  finalRef,
  isOpen,
  onSubmit,
  onUpdate,
  onClose,
}: {
  label: string;
  url: string;
  finalRef: React.RefObject<{ focus(options?: FocusOptions): void }>;
  isOpen: boolean;
  onSubmit: (tech: LinkTag) => void;
  onUpdate: (item: LinkTag, index: number) => void;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState("");
  const [color, setColor] = useState("#333333");
  const [url, setUrl] = useState("");

  // Reset everytime the modal mounts
  useEffect(() => {
    setLabel(tagLabel);
    setUrl(tagUrl);
  });

  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Technology Customizer</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody pb={6}>
          <SimpleGrid spacing={6} columns={2}>
            <HexColorPicker color={color} onChange={setColor} />
            <Wrap>
              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
              <Input
                value={url}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="https://example.com"
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
                <Tag
                  size="sm"
                  variant="subtle"
                  borderRadius="sm"
                  bgColor={hexToRgbA(color, 0.3)}
                  textColor={colorShade(color, -100)}
                >
                  {label}
                </Tag>
              </Center>
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => {
                  onSubmit({ label, color, url });
                  onClose();
                }}
                disabled={!tagLabel.length}
                width="100%"
              >
                Add Link
              </Button>
            </Wrap>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LinkTagCustomizer;
