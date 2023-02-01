import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { MemberInfo } from "../../../types";
import { ProjectEditorForm } from "../../ProjectEditor";
import DragAndDrop, { DraggableMember } from "../DragAndDrop";
import MemberCustomizer from "../MemberCustomizer";

const Members = ({
  value,
  getValues,
  setMembers,
}: {
  value: MemberInfo[];
  getValues: UseFormGetValues<ProjectEditorForm>;
  setMembers: (items: MemberInfo[]) => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [selectedMember, setSelectedMember] = useState<{ index: number; data: MemberInfo }>(
    undefined
  );

  const reorder = (list: MemberInfo[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const items = getValues().members as MemberInfo[];
    if (!result.destination) {
      return;
    }
    setMembers(reorder(items, result.source.index, result.destination.index));
  };

  const updateMember = (index: number, itemToUpdate: MemberInfo) => {
    const items = getValues().members as MemberInfo[];
    items[index] = itemToUpdate;
    setMembers(items);
  };

  const removeMember = (index: number) => {
    const items = getValues().members as MemberInfo[];
    items.splice(index, 1);
    setMembers(items);
  };

  const addMember = (itemToAdd: MemberInfo) => {
    const items = getValues().members as MemberInfo[];
    items.push(itemToAdd);
    setMembers(items);
  };

  return (
    <SimpleGrid pt="2" spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))">
      <MemberCustomizer
        member={selectedMember}
        finalRef={finalRef}
        isOpen={isOpen}
        onSubmit={(index: number, item: MemberInfo) => updateMember(index, item)}
        onClose={() => {
          setSelectedMember(undefined);
          onClose();
        }}
      />
      <DragAndDrop pt={3} onDragEnd={onDragEnd}>
        <DraggableMember
          items={value}
          onOpen={(index: number, data: MemberInfo) => {
            setSelectedMember({ index, data });
            onOpen();
          }}
          onRemoveItem={(index: number) => removeMember(index)}
          onUpdateItem={(index: number, item: MemberInfo) => updateMember(index, item)}
        />
      </DragAndDrop>
    </SimpleGrid>
  );
};

export default Members;
