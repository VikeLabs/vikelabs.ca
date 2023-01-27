import { ProjectHasMembers, ProjectInfo } from "@prisma/client";

export type ProjectInfoWithMembers = ProjectInfo & {
  members?: any;
};

export type GetProjectEditViewResponse = {
  id: number;
  live: ProjectInfo;
  draft?: ProjectInfo;
  members?: MemberInfo[];
};

export type MemberInfo = {
  id: string;
  username?: string;
  displayName?: string;
  imageUrl?: string;
  github?: string;
  discord?: string;
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

export type PostEditUserResponse = {
  user: LoggedInUserEditForm;
};

export type LoggedInUserEditForm = {
  vId: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  github: string;
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
