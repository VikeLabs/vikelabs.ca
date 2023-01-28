import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Tag, Wrap } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { LinkTag, TechTag } from "../types";

const DragAndDrop = ({
  pt,
  direction,
  type,
  items,
  onDragEnd,
  onRemoveItem,
}: {
  pt: number;
  direction: string;
  type: "stack" | "links";
  items: TechTag[] | LinkTag[];
  onDragEnd: (result: any) => void;
  onRemoveItem: (index: number) => void;
}) => {
  const DragContent = () => {
    switch (type) {
      case "stack":
        return (
          <>
            {items.map((tech: TechTag, index: number) => (
              <Draggable key={index} draggableId={String(index)} index={index}>
                {(provided) => (
                  <HStack
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    key={index}
                    spacing={1}
                  >
                    <Tag
                      size="sm"
                      variant="solid"
                      borderRadius="sm"
                      colorScheme={tech.color.includes("#") ? undefined : tech.color}
                      bgColor={tech.color.includes("#") ? tech.color : undefined}
                      cursor="pointer"
                      height="auto"
                    >
                      {tech.label}
                    </Tag>
                    <IconButton
                      ml="1"
                      size="1xs"
                      aria-label="delete tech tag"
                      icon={<DeleteIcon />}
                      onClick={() => onRemoveItem(index)}
                      variant="ghost"
                    />
                  </HStack>
                )}
              </Draggable>
            ))}
          </>
        );
      case "links":
        return <></>;
    }
  };

  return (
    <Box pt={pt}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction={direction}>
          {(provided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Wrap p={0} m={0} spacing={3}>
                  <DragContent />
                </Wrap>
              </div>
              <span style={{ position: "absolute" }}>{provided.placeholder}</span>
            </>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DragAndDrop;
