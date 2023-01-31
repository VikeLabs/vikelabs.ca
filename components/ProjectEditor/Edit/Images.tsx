import { Button } from "@chakra-ui/react";
import React from "react";
import FileUploader from "../../FileUploader";

const Images = () => {
  return (
    <div>
      <Button onClick={() => console.log("should open FileCustomizerModal")}>Add New</Button>
      <FileUploader />
      <div>TODO: Image reorder/previewer</div>
    </div>
  );
};

export default Images;
