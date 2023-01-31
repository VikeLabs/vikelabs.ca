import { DeleteIcon } from "@chakra-ui/icons";
import { Box, HStack, IconButton, Image, Tag, Text, Wrap } from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ScrollContainer from "react-indiana-drag-scroll";
import { ImageInfo, LinkTag, TechTag } from "../../types";
import { colorShade, hexToRgbA } from "../../utils/colorHelpers";

export const DraggableRecruitingPositions = ({
  items,
  onRemoveItem,
}: {
  items: string[];
  onRemoveItem: (index: number) => void;
}) => (
  <>
    {(!!items.length ? (items as string[]) : []).map((position: string, index: number) => (
      <Draggable key={`${position}/${index}`} draggableId={String(index)} index={index}>
        {(provided) => (
          <HStack
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            spacing={1}
          >
            <Tag
              size="sm"
              variant="subtle"
              borderRadius="sm"
              colorScheme="blackAlpha"
              cursor="grab"
              height="auto"
            >
              {position}
            </Tag>
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete position"
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

export const DraggableTechTags = ({
  items,
  onRemoveItem,
}: {
  items: TechTag[];
  onRemoveItem: (index: number) => void;
}) => (
  <>
    {(!!items.length ? (items as TechTag[]) : []).map((tech: TechTag, index: number) => (
      <Draggable key={`${tech.label}/${index}`} draggableId={String(index)} index={index}>
        {(provided) => (
          <HStack
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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
      <Draggable key={`${link.label}/${index}`} draggableId={String(index)} index={index}>
        {(provided) => (
          <HStack
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
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

// TODO: There's some flickering when images are dragged / dropped
export const DraggableImages = ({
  items,
  onRemoveItem,
}: {
  items: ImageInfo[];
  onRemoveItem: (index: number) => void;
}) => (
  <>
    {(!!items.length ? (items as ImageInfo[]) : []).map((image: ImageInfo, index: number) => (
      <Draggable key={`${image.label}/${index}`} draggableId={String(index)} index={index}>
        {(provided) => (
          <HStack
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            spacing={1}
          >
            {image.isPending && (
              <Box position="relative" zIndex="2" w="full">
                <Box position="absolute" left="0" bottom="0" bgColor="teal">
                  <Text>NEW</Text>
                </Box>
              </Box>
            )}
            <Image alt={image.label} src={image.url} w={100} h={100} />
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete image"
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
  onDragEnd,
  children,
  direction = "horizontal",
}: {
  pt: number;
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
  direction: string;
}) => {
  // TODO: Scrolling is buggy
  return (
    <Box pt={pt}>
      <ScrollContainer className="list flex" hideScrollbars={false}>
        <div className="flex-shrink-0 overflow-hidden rounded bg-placeholder-light">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction={direction}>
              {(provided) => (
                <>
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Wrap p={0} m={0} spacing={3} pr={direction === "horizontal" && 48}>
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
