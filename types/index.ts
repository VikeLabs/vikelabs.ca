import { Project, ProjectInfo, User } from "@prisma/client";

export type ProjectLiveView = Pick<Project, "id" | "order"> & {
  projectInfo: ProjectInfo;
};

export type ProjectEditorForm = Omit<
  ProjectInfo,
  "id" | "updatedBy" | "updatedAt" | "approvedBy" | "approvedAt"
> & {
  members: ProjectMemberInfo[] | MemberInfo[];
};

export type ProjectMemberInfo = { id: string; role: string };

export type ProjectUpdateDataNoImages = Omit<
  ProjectUpdateData,
  "imageUrlsToDelete" | "imageFilesToAdd"
>;

export type ProjectUpdateData = ProjectEditorForm & {
  id: string;
  isDraft: boolean;
  needApproval: boolean;
  defaultImages: string[];
  imageUrlsToDelete: string[];
  imageFilesToAdd: File[];
};

export type ImageToDelete = { id: string; url: string };
export type ImageToAdd = { label: string; file: File };

export type UserEditorForm = Omit<GetLoggedInUserResponse, "id" | "role">;

export type PublicUser = Omit<User, "vId" | "firstName" | "lastName" | "role">;
export type UserSearchResult = Omit<PublicUser, "github" | "discord">;

export type AdminReviewRequest = {
  feedback?: string;
  approved: boolean;
  projectId: number;
  draftId: string;
};

export type ImageInfo = {
  file?: File;
  url?: string;
  name?: string;
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
  isCredited?: boolean;
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
