import {
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Wrap,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { ImageInfo } from "../../types";
import FileUploader from "../FileUploader";

const ImageCustomizer = ({
  finalRef,
  isOpen,
  onSubmit,
  onClose,
}: {
  finalRef: React.RefObject<{ focus(options?: FocusOptions): void }>;
  isOpen: boolean;
  onSubmit: (image: ImageInfo) => void;
  onClose: () => void;
}) => {
  const [imageFile, setImageFile] = useState<File>(undefined);
  const [imageName, setImageName] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imagePreviewURL, setImagePreviewURL] = useState("");

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewURL("");
      return;
    }

    // create the preview
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewURL(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    // TODO: Compress / Resize images
    // setImageName(acceptedFiles.name.replaceAll(" ", "_"))

    setImageFile(acceptedFiles[0]);
    setImageName(acceptedFiles[0].path);

    // TODO: Check for errors
  }, []);

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={() => {
        setImageFile(undefined);
        setImageCaption("");
        setImageName("");
        setImagePreviewURL("");
        onClose();
      }}
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Image Customizer</ModalHeader>
        <ModalCloseButton mt={1.5} />
        <ModalBody pb={6}>
          <SimpleGrid spacing={6} columns={2}>
            {imageFile ? (
              <Image
                alt={imageCaption.length ? imageCaption : "caption missing"}
                src={imagePreviewURL}
              />
            ) : (
              <FileUploader onDrop={onDrop} accept={{ "image/*": [".png", ".jpeg", ".jpg"] }} />
            )}
            <Wrap>
              <Input
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="image_name.jpg"
                isDisabled={!imageFile}
              />
              <Input
                value={imageCaption}
                onChange={(e) => setImageCaption(e.target.value)}
                placeholder="Image Alt Text"
                isDisabled={!imageFile}
              />
              <Spacer />
              <Spacer />
              <Button
                colorScheme="blue"
                onClick={() => {
                  setImageFile(undefined);
                  setImageName("");
                  setImageCaption("");
                  setImagePreviewURL("");
                  onSubmit({
                    label: imageCaption,
                    fileName: imageName,
                    file: imageFile,
                    isPending: true,
                  });
                  onClose();
                }}
                isDisabled={!imageFile || !imageCaption.length || !imageName.length}
                width="100%"
              >
                Add Image
              </Button>
            </Wrap>
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageCustomizer;
