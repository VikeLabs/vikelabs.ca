import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  HStack,
  IconButton,
  Image,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ImageInfo, LinkTag, MemberInfo, TechTag } from "../../types";
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
            pb="2"
          >
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete position"
              icon={<DeleteIcon />}
              onClick={() => onRemoveItem(index)}
              variant="ghost"
            />
            <Tag
              size="md"
              variant="subtle"
              borderRadius="sm"
              colorScheme="blackAlpha"
              cursor="grab"
              height="auto"
            >
              {position}
            </Tag>
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
            pb="2"
          >
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete tech tag"
              icon={<DeleteIcon />}
              onClick={() => onRemoveItem(index)}
              variant="ghost"
            />
            <Tag
              size="md"
              variant="solid"
              borderRadius="sm"
              colorScheme={tech.color.includes("#") ? undefined : tech.color}
              bgColor={tech.color.includes("#") ? tech.color : undefined}
              cursor="grab"
              height="auto"
            >
              {tech.label}
            </Tag>
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
            pb="2"
          >
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete link tag"
              icon={<DeleteIcon />}
              onClick={() => onRemoveItem(index)}
              variant="ghost"
            />
            <Tag
              size="md"
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
            pb="2"
          >
            <IconButton
              ml="1"
              size="1xs"
              aria-label="delete image"
              icon={<DeleteIcon />}
              onClick={() => onRemoveItem(index)}
              variant="ghost"
            />
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              w="full"
            >
              <VStack alignItems="flex-start" justifyContent="center" spacing="0">
                <Image
                  alt={image.label}
                  src={image.url}
                  w={0}
                  h={0}
                  style={{ width: "auto", height: "108px" }}
                />
                <Text px="1" position="absolute" bottom="0" w="full" bgColor="rgb(255,255,255,0.8)">
                  <Center h="full" justifyContent="flex-start" fontSize="sm">
                    {image.label}
                  </Center>
                </Text>
              </VStack>
            </Card>
          </HStack>
        )}
      </Draggable>
    ))}
  </>
);

export const DraggableMember = ({
  items,
  onOpen,
  onRemoveItem,
}: {
  items: MemberInfo[];
  onOpen: (index: number, data: MemberInfo) => void;
  onRemoveItem: (index: number) => void;
}) => {
  return (
    <Box>
      {(!!items.length ? (items as MemberInfo[]) : []).map((member: MemberInfo, index: number) => (
        <Draggable key={`${member.id}/${index}`} draggableId={String(index)} index={index}>
          {(provided) => (
            <HStack
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              spacing={1}
              pb="2"
            >
              <IconButton
                ml="1"
                size="1xs"
                aria-label="delete image"
                icon={<DeleteIcon />}
                onClick={() => onRemoveItem(index)}
                variant="ghost"
              />
              <Card
                size="sm"
                key={`${member.id}/${index}`}
                variant={member.isCredited ? "solid" : "filled"}
                opacity={member.isCredited ? 1 : 0.5}
                w={200}
              >
                <CardBody>
                  <Flex>
                    <Avatar src={member.imageUrl} name={member.displayName ?? member.username} />
                    <Box ml="2.5" w="full">
                      <Text fontWeight="600" p="0" m="0" noOfLines={1}>
                        {member.displayName ?? member.username}
                      </Text>
                      <Text fontSize="sm" p="0" m="0" noOfLines={1}>
                        {member.role ?? "Member"}
                      </Text>
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
              <Button onClick={() => onOpen(index, member)}>Edit</Button>
            </HStack>
          )}
        </Draggable>
      ))}
    </Box>
  );
};

const DragAndDrop = ({
  pt,
  onDragEnd,
  children,
}: {
  pt: number;
  onDragEnd: (result: any) => void;
  children: React.ReactNode;
}) => {
  // TODO: Scrolling is buggy
  return (
    <Box pt={pt}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <VStack spacing="0" align="flex-start">
                {children}
                {provided.placeholder}
              </VStack>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default DragAndDrop;
