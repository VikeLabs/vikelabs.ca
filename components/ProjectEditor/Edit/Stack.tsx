import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { TechTag } from "../../../types";
import DragAndDrop, { DraggableTechTags } from "../DragAndDrop";
import { ProjectEditorForm } from "../../../types/index";
import PresetMenu, { CustomTechTag, PresetTechTags } from "../PresetMenu";

const Stack = ({
  value,
  getValues,
  setStack,
}: {
  value: TechTag[];
  getValues: UseFormGetValues<ProjectEditorForm>;
  setStack: (items: TechTag[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const reorder = (list: TechTag[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const items = getValues().stack as TechTag[];
    if (!result.destination) {
      return;
    }
    setStack(reorder(items, result.source.index, result.destination.index));
  };

  const removeTag = (index: number) => {
    const items = getValues().stack as TechTag[];
    items.splice(index, 1);
    setStack(items);
    setSearch("");
  };

  const addTag = (itemToAdd: TechTag) => {
    const items = getValues().stack as TechTag[];
    items.push(itemToAdd);
    setStack(items);
    setSearch("");
  };

  return (
    <>
      <PresetMenu search={search} setSearch={(value: string) => setSearch(value)}>
        <CustomTechTag
          search={search}
          addItem={(item: TechTag) => addTag(item)}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          finalRef={finalRef}
        />
        <PresetTechTags search={search} onClick={(item: TechTag) => addTag(item)} />
      </PresetMenu>
      <DragAndDrop pt={3} onDragEnd={(result: any) => onDragEnd(result)}>
        <DraggableTechTags items={value} onRemoveItem={(index: number) => removeTag(index)} />
      </DragAndDrop>
    </>
  );
};

export default Stack;
