import { Button, HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { ProjectEditorForm } from "../../ProjectEditor";
import DragAndDrop, { DraggableRecruitingPositions } from "../DragAndDrop";

const RecruitingFor = ({
  value,
  getValues,
  setPositions,
}: {
  value: string[];
  getValues: UseFormGetValues<ProjectEditorForm>;
  setPositions: (items: string[]) => void;
}) => {
  const [input, setInput] = useState("");
  const [isInput, setIsInput] = useState(false);

  const reorder = (list: string[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result: any) => {
    const items = getValues().recruitingFor as string[];
    if (!result.destination) {
      return;
    }
    setPositions(reorder(items, result.source.index, result.destination.index));
  };

  const removePosition = (index: number) => {
    const items = getValues().recruitingFor as string[];
    items.splice(index, 1);
    setPositions(items);
    setInput("");
  };

  const addPosition = (itemToAdd: string) => {
    const items = getValues().recruitingFor as string[];
    (items as string[]).push(itemToAdd as string);
    setPositions(items);
    setInput("");
  };

  return (
    <>
      {isInput ? (
        <HStack>
          <Input onChange={(e) => setInput(e.target.value)} value={input} w={300} />
          <Button
            onClick={() => {
              addPosition(input);
              setInput("");
              setIsInput(false);
            }}
          >
            Add
          </Button>
          <Button
            onClick={() => {
              setInput("");
              setIsInput(false);
            }}
          >
            Cancel
          </Button>
        </HStack>
      ) : (
        <Button onClick={() => setIsInput(true)}>Add New</Button>
      )}{" "}
      <DragAndDrop pt={3} onDragEnd={(result: any) => onDragEnd(result)}>
        <DraggableRecruitingPositions
          items={value}
          onRemoveItem={(index: number) => removePosition(index)}
        />
      </DragAndDrop>
    </>
  );
};

export default RecruitingFor;
