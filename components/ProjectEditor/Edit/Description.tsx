import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { Editor, EditorContent } from "@tiptap/react";
import React from "react";

const Description = ({ editor }: { editor: Editor }) => (
  <VStack spacing="1" w="full">
    <HStack spacing="1" w="full">
      <Button
        w="8"
        fontSize="lg"
        colorScheme={editor?.isActive("bold") ? "teal" : undefined}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        fontFamily="serif"
      >
        <b>B</b>
      </Button>
      <Button
        w="8"
        fontSize="lg"
        colorScheme={editor?.isActive("italic") ? "teal" : undefined}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        fontFamily="serif"
      >
        <i>I</i>
      </Button>
      <Button
        w="8"
        fontSize="lg"
        colorScheme={editor?.isActive("underline") ? "teal" : undefined}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        fontFamily="serif"
      >
        <u>U</u>
      </Button>
      <Button
        w="8"
        fontSize="lg"
        colorScheme={editor?.isActive("subscript") ? "teal" : undefined}
        onClick={() => editor?.chain().focus().toggleSubscript().run()}
        fontFamily="serif"
      >
        X<sub>2</sub>
      </Button>
      <Button
        w="8"
        fontSize="lg"
        colorScheme={editor?.isActive("superscript") ? "teal" : undefined}
        onClick={() => editor?.chain().focus().toggleSuperscript().run()}
        fontFamily="serif"
      >
        X<sup>2</sup>
      </Button>
    </HStack>
    <Box w="full">
      <EditorContent editor={editor} />
    </Box>
  </VStack>
);

export default Description;
