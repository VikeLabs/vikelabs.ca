import { Box, Center, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
  onDrop,
  accept,
}: {
  onDrop: (acceptedFiles: any) => void;
  accept: { [key: string]: string[] };
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept,
  });

  return (
    <Box
      w="full"
      h="full"
      bgColor="cyan.100"
      borderColor="cyan.400"
      borderWidth="3px"
      borderRadius="8"
      borderStyle="dashed"
      color="cyan.600"
      px="3"
      py="2"
      _hover={{
        background: "cyan.100",
        borderColor: "cyan.600",
        color: "cyan.800",
      }}
      {...getRootProps()}
    >
      <Center h="full">
        <VStack textAlign="center" alignItems="center" spacing="0">
          <input {...getInputProps()} />
          {isDragActive ? (
            <Text as="h3" fontWeight="600">
              Drop
            </Text>
          ) : (
            <>
              <Text as="h3" fontWeight="600">
                Upload
              </Text>
              <Text as="h3" fontWeight="600">
                {Object.keys(accept)
                  .map((key: string) => accept[key])[0]
                  .join(", ")}
              </Text>
            </>
          )}
        </VStack>
      </Center>
    </Box>
  );
};

export default FileUploader;
