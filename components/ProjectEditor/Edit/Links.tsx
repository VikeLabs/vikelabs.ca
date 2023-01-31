import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { LinkTag } from "../../../types";
import DragAndDrop, { DraggableLinkTags } from "../DragAndDrop";
import { ProjectEditorForm } from "../../ProjectEditor";
import PresetMenu, { CustomLinkTag, PresetLinkTags } from "../PresetMenu";

const Links = ({
  value,
  getValues,
  setLinks,
}: {
  value: LinkTag[];
  getValues: UseFormGetValues<ProjectEditorForm>;
  setLinks: (items: LinkTag[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const [linkColor, setLinkColor] = useState("blackAlpha");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const reorder = (list: LinkTag[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const items = getValues().links as LinkTag[];
    if (!result.destination) {
      return;
    }
    setLinks(reorder(items, result.source.index, result.destination.index));
  };

  const removeTag = (index: number) => {
    const items = getValues().links as LinkTag[];
    items.splice(index, 1);
    setLinks(items);
    setSearch("");
  };

  const addTag = (itemToAdd: LinkTag) => {
    const items = getValues().links as LinkTag[];
    items.push(itemToAdd);
    setLinks(items);
    setSearch("");
  };

  return (
    <>
      <PresetMenu search={search} setSearch={setSearch}>
        <CustomLinkTag
          search={search}
          isOpen={isOpen}
          onOpen={onOpen}
          finalRef={finalRef}
          linkColor={linkColor}
          onSubmit={(item: LinkTag) => {
            addTag(item);
            setLinkColor("blackAlpha");
          }}
          onClose={() => {
            onClose();
            setLinkColor("blackAlpha");
          }}
        />
        <PresetLinkTags
          search={search}
          onClick={(label: string, color: string) => {
            setSearch(label);
            setLinkColor(color);
            onOpen();
          }}
        />
      </PresetMenu>
      <DragAndDrop pt={3} onDragEnd={(result: any) => onDragEnd(result)} direction="horizontal">
        <DraggableLinkTags items={value} onRemoveItem={(index: number) => removeTag(index)} />
      </DragAndDrop>
    </>
  );
};

export default Links;
