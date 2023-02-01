import { ProjectInfo } from "@prisma/client";

export type UserEditorForm = Omit<GetLoggedInUserResponse, "id" | "role">;

export type ImageInfo = {
  label: string;
  file?: any;
  url?: string;
  isPending?: boolean;
};

export type TechTag = {
  label: string;
  color: string;
};

export type LinkTag = TechTag & {
  url: string;
};

export type ProjectInfoWithMembers = ProjectInfo & {
  members?: any;
};

export type ProjectInfoLeadView = Omit<ProjectInfo, "approvedBy">;

export type GetProjectEditViewResponse = {
  id: number;
  live: ProjectInfoLeadView;
  draft?: ProjectInfoLeadView;
  members?: MemberInfo[];
};

export type MemberInfo = {
  id: string;
  username: string;
  displayName?: string;
  imageUrl?: string;
  github?: string;
  discord?: string;
  isCredited: boolean;
  role?: string;
};

export type GetLoggedInUserResponse = {
  id: string;
  vId: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  github?: string;
  discord?: string;
  role: string;
};

export type ErrorMessage = {
  message: string;
};

export type CreateUserRequest = {
  vId: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  github: string;
  discord: string;
  imageUrl: string;
};
