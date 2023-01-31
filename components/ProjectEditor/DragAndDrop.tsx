import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Tag, Wrap } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";
import { LinkTag, TechTag } from "../../types";
import { colorShade, hexToRgbA } from "../../utils/colorHelpers";

export const DraggableTechTags = ({
  items,
  onRemoveItem,
}: {
  items: TechTag[];
  onRemoveItem: (index: number) => void;
}) => (
  <>
    {(!!items.length ? (items as TechTag[]) : []).map((tech: TechTag, index: number) => (
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
              cursor="grab"
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

export const DraggableLinkTags = ({
  items,
  onRemoveItem,
}: {
  items: TechTag[];
  onRemoveItem: (index: number) => void;
}) => (
  <>
    {(!!items.length ? (items as LinkTag[]) : []).map((link: LinkTag, index: number) => (
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
              variant="subtle"
              borderRadius="sm"
              colorScheme={link.color.includes("#") ? undefined : link.color}
              bgColor={link.color.includes("#") ? hexToRgbA(link.color, 0.3) : undefined}
              textColor={link.color.includes("#") ? colorShade(link.color, -100) : undefined}
              cursor="grab"
              height="auto"
            >
              {link.label}
            </Tag>
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete link tag"
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

const DragAndDrop = ({
  pt,
  direction,
  onDragEnd,
  children,
}: {
  pt: number;
  direction: string;
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
}) => {
  // TODO: Scrolling is buggy
  return (
    <Box pt={pt}>
      <ScrollContainer className="list mb-1 flex overflow-auto" hideScrollbars={false}>
        <div className="flex-shrink-0 mx-4 overflow-hidden rounded bg-placeholder-light">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction={direction}>
              {(provided) => (
                <>
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Wrap p={0} m={0} spacing={3} pr={48}>
                      {children}
                    </Wrap>
                  </div>
                  <span style={{ position: "absolute" }}>{provided.placeholder}</span>
                </>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </ScrollContainer>
    </Box>
  );
};

export default DragAndDrop;
