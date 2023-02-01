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
import React, { useEffect, useState } from "react";
import { UseFormGetValues } from "react-hook-form";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import { useUserSearch } from "../../../hooks/useUserSearch";
import { MemberInfo, UserSearchResult } from "../../../types";
import { useAuthContext } from "../../AuthContextProvider";
import { ProjectEditorForm } from "../../ProjectEditor";
import DragAndDrop, { DraggableMember } from "../DragAndDrop";
import MemberCustomizer from "../MemberCustomizer";
import PresetMenu, { MemberSelect, SearchMenu, UserSelect } from "../PresetMenu";
import { DebounceInput } from "react-debounce-input";
import Loading from "../../Loading";

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

  const { user } = useAuthContext();
  const [search, setSearch] = useState("");

  const userSearch = useUserSearch(search, user?.token);

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
    <>
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
      <SearchMenu setSearch={setSearch}>
        {/* {userSearch.isLoading && <Loading />} */}
        {!userSearch.data?.length && !userSearch.isLoading && <div>no matching users</div>}
        <UserSelect data={userSearch.data} onClick={(user: UserSearchResult) => addMember(user)} />
      </SearchMenu>
      <DragAndDrop pt={2} onDragEnd={onDragEnd}>
        <DraggableMember
          items={value}
          onOpen={(index: number, data: MemberInfo) => {
            setSelectedMember({ index, data });
            onOpen();
          }}
          onRemoveItem={(index: number) => removeMember(index)}
        />
      </DragAndDrop>
    </>
  );
};

export default Members;
