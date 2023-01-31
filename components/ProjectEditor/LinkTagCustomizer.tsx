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
import { LinkTag } from "../../types";
import { colorShade, hexToRgbA } from "../../utils/colorHelpers";

const LinkTagCustomizer = ({
  label: tagLabel,
  colorScheme,
  url: tagUrl,
  finalRef,
  isOpen,
  onSubmit,
  onClose,
}: {
  label: string;
  colorScheme: string;
  url: string;
  finalRef: React.RefObject<{ focus(options?: FocusOptions): void }>;
  isOpen: boolean;
  onSubmit: (tech: LinkTag) => void;
  onClose: () => void;
}) => {
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("");

  // Reset everytime the modal mounts
  // Doing what the eslint editor suggests will run an infinite loop, so disabling it
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (url === "" && isOpen) {
      setUrl(tagUrl);
    }
    if (label === "" && isOpen) {
      setLabel(tagLabel);
    }
    if (color === "" && isOpen && !colorScheme) {
      setColor("#333333");
    }
  });

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setLabel("");
        setUrl("");
        setColor("");
        onClose();
      }}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Link Customizer</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody pb={6}>
          <SimpleGrid spacing={6} columns={2}>
            <HexColorPicker color={color} onChange={setColor} />
            <Wrap>
              <Input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Link Label"
              />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
                  colorScheme={colorScheme}
                  bgColor={!color ? undefined : hexToRgbA(color, 0.3)}
                  textColor={!color ? undefined : colorShade(color, -100)}
                >
                  {label}
                </Tag>
              </Center>
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => {
                  setLabel("");
                  setUrl("");
                  setColor("");
                  onSubmit({ label, color: color ? color : colorScheme, url });
                  onClose();
                }}
                isDisabled={!label.length || !url.length}
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
