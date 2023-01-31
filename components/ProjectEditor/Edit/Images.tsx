import { Button, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { ImageInfo } from "../../../types";
import { ProjectEditorForm } from "../../ProjectEditor";
import DragAndDrop, { DraggableImages } from "../DragAndDrop";
import ImageCustomizer from "../ImageCustomizer";

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
  const [imagePreviewInfo, setImagePreviewInfo] = useState<ImageInfo[]>([]);

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

  useEffect(() => {
    if (value.length === 0) {
      setImagePreviewInfo([]);
      return;
    }

    // create the previews
    const mappedImagePreviewInfo: ImageInfo[] = value.map((image: ImageInfo) => ({
      label: image.label,
      fileName: image.fileName,
      file: image.file,
      url: image.url ?? URL.createObjectURL(image.file),
      isPending: image.url ? false : true,
    }));
    setImagePreviewInfo(mappedImagePreviewInfo);

    // free memory when ever this component is unmounted
    return () => {
      for (const mappedImagePreviewInfoItem of mappedImagePreviewInfo) {
        if (mappedImagePreviewInfoItem.isPending) {
          URL.revokeObjectURL(mappedImagePreviewInfoItem.url);
        }
      }
    };
  }, [value]);

  return (
    <>
      <Button onClick={onOpen}>Add New</Button>
      <ImageCustomizer
        finalRef={finalRef}
        isOpen={isOpen}
        onSubmit={(image: ImageInfo) => addImage(image)}
        onClose={onClose}
      />
      <DragAndDrop pt={3} onDragEnd={(result: any) => onDragEnd(result)}>
        <DraggableImages
          items={imagePreviewInfo}
          onRemoveItem={(index: number) => removeImage(index)}
        />
      </DragAndDrop>
    </>
  );
};

export default Images;
