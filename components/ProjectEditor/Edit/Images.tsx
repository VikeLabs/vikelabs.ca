import { Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { UseFormGetValues } from "react-hook-form";
import { ImageInfo } from "../../../types";
import { ProjectEditorForm } from "../../../types/index";
import DragAndDrop, { DraggableImages } from "../DragAndDrop";
import ImageCustomizer from "../Customizers/ImageCustomizer";

const Images = ({
  value,
  getValues,
  setImages,
}: {
  value: ImageInfo[];
  getValues: UseFormGetValues<ProjectEditorForm>;
  setImages: (items: ImageInfo[]) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const reorder = (list: ImageInfo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const items = getValues().imageUrls as ImageInfo[];
    if (!result.destination) {
      return;
    }
    setImages(reorder(items, result.source.index, result.destination.index));
  };

  const removeImage = (index: number) => {
    const items = getValues().imageUrls as ImageInfo[];
    items.splice(index, 1);
    setImages(items);
  };

  const addImage = (itemToAdd: ImageInfo) => {
    const items = getValues().imageUrls as ImageInfo[];
    items.push(itemToAdd);
    setImages(items);
  };

  return (
    <>
      <Button onClick={onOpen}>Add New</Button>
      <ImageCustomizer
        finalRef={finalRef}
        isOpen={isOpen}
        onSubmit={(image: File) => addImage(image)}
        onClose={onClose}
      />
      <DragAndDrop pt={3} onDragEnd={(result: any) => onDragEnd(result)}>
        <DraggableImages items={value} onRemoveItem={(index: number) => removeImage(index)} />
      </DragAndDrop>
    </>
  );
};

export default Images;
