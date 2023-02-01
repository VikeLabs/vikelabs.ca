import {
  Box,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useMenuItem,
} from "@chakra-ui/react";
import React from "react";
import { DebounceInput } from "react-debounce-input";
import { LinkTag, TechTag, UserSearchResult } from "../../types";
import { mockData } from "../../utils/mockData";
import LinkTagCustomizer from "./LinkTagCustomizer";
import TechTagCustomizer from "./TechTagCustomizer";

const navigationKeys = ["ArrowUp", "ArrowDown", "Escape"];

const MenuInput = (props) => {
  const { role, ...rest } = useMenuItem(props);
  return (
    <Box px="3" role={role}>
      <Input
        mb="2"
        placeholder="Enter technology"
        size="sm"
        {...rest}
        onKeyDown={(e) => {
          if (!navigationKeys.includes(e.key)) {
            e.stopPropagation();
          }
        }}
      />
    </Box>
  );
};

export const CustomLinkTag = ({
  search,
  isOpen,
  onOpen,
  finalRef,
  linkColor,
  onSubmit,
  onClose,
}: {
  search: string;
  isOpen: boolean;
  onOpen: () => void;
  finalRef: React.MutableRefObject<any>;
  linkColor: string;
  onSubmit: (item: LinkTag) => void;
  onClose: () => void;
}) => (
  <MenuItem onClick={onOpen}>
    <LinkTagCustomizer
      label={!search.length ? "" : search}
      colorScheme={linkColor}
      url=""
      finalRef={finalRef}
      isOpen={isOpen}
      onSubmit={onSubmit}
      onClose={onClose}
    />
    <Tag size="sm" variant="subtle" borderRadius="sm" colorScheme={linkColor} cursor="pointer">
      {!search.length ? "Custom" : search}
    </Tag>
  </MenuItem>
);

export const CustomTechTag = ({
  search,
  addItem,
  isOpen,
  onOpen,
  onClose,
  finalRef,
}: {
  search: string;
  addItem: (item: TechTag | LinkTag) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  finalRef: React.MutableRefObject<any>;
}) => (
  <MenuItem onClick={onOpen}>
    <TechTagCustomizer
      label={!search.length ? "" : search}
      finalRef={finalRef}
      isOpen={isOpen}
      // TODO: Callback?
      onSubmit={(item: TechTag) => addItem(item)}
      onClose={onClose}
    />
    <Tag size="sm" variant="solid" borderRadius="sm" bgColor="#333" cursor="pointer">
      {!search.length ? "Custom" : search}
    </Tag>
  </MenuItem>
);

export const PresetTechTags = ({
  search,
  onClick,
}: {
  search: string;
  onClick: (item: TechTag) => void;
}) => (
  <>
    {mockData.presetStack.map((item: TechTag, index: number) => {
      if (item.label.toLowerCase().includes(search.toLowerCase())) {
        return (
          <MenuItem key={index} onClick={() => onClick(item)}>
            <Tag
              size="sm"
              variant="solid"
              borderRadius="sm"
              colorScheme={item.color}
              cursor="pointer"
            >
              {item.label}
            </Tag>
          </MenuItem>
        );
      }
    })}
  </>
);

export const PresetLinkTags = ({
  search,
  onClick,
}: {
  search: string;
  onClick: (label: string, color: string) => void;
}) => (
  <>
    {mockData.presetLinks.map((item: LinkTag, index: number) => {
      if (item.label.toLowerCase().includes(search.toLowerCase())) {
        return (
          <MenuItem key={index} onClick={() => onClick(item.label, item.color)}>
            <Tag
              size="sm"
              variant="subtle"
              borderRadius="sm"
              colorScheme={item.color}
              cursor="pointer"
            >
              {item.label}
            </Tag>
          </MenuItem>
        );
      }
    })}
  </>
);

export const UserSelect = ({
  data,
  onClick,
}: {
  data: UserSearchResult[];
  onClick: (user: UserSearchResult) => void;
}) => {
  // TODO: Query specific users, debounce
  return (
    <>
      {data?.map((searchResult: UserSearchResult, index: number) => (
        <MenuItem key={index} onClick={() => onClick(searchResult)}>
          <div key={index}>
            <Text>
              {searchResult.displayName}
              {searchResult.displayName && " "}@{searchResult.username}
            </Text>
          </div>
        </MenuItem>
      ))}
    </>
  );
};

export const SearchMenu = ({
  setSearch,
  children,
}: {
  setSearch: (value: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <Menu placement="right-start">
      <MenuButton as={Button}>Add New</MenuButton>
      <MenuList p="2">
        <Input
          // w={300}
          as={DebounceInput}
          minLength={2}
          debounceTimeout={300}
          onChange={(e) => setSearch(e.target.value)}
        />
        {children}
      </MenuList>
    </Menu>
  );
};

const PresetMenu = ({
  search,
  setSearch,
  children,
}: {
  search: string;
  setSearch: (value: string) => void;
  children: React.ReactNode;
}) => {
  return (
    <Menu placement="right-start">
      <MenuButton as={Button}>Add New</MenuButton>
      <MenuList>
        <MenuInput type="title" onChange={(e) => setSearch(e.target.value)} value={search} />
        {children}
      </MenuList>
    </Menu>
  );
};

export default PresetMenu;
