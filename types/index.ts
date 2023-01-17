import { Prisma } from "@prisma/client";

export type GetLoggedInUserResponse = {
  id: string;
  vId: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  github?: string;
  discord?: string; // TODO
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
