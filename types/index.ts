export type GetLoggedInUserResponse = {
  id: string;
  vId: string;
  username: string;
  displayName: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  github: string;
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

export type UserMutation = {
  data: LoggedInUserEditForm;
  token: string;
};

export type ErrorMessage = {
  message: string;
};
