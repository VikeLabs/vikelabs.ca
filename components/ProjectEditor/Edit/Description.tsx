import { Editor, EditorContent } from "@tiptap/react";
import React from "react";

const Description = ({
  editor,
  value,
  onChange,
}: {
  editor: Editor;
  value: string;
  onChange: () => void;
}) => <EditorContent editor={editor} value={value} onChange={onChange} />;

export default Description;
