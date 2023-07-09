import { PrismaClient, User } from "@prisma/client";
import { CreateUserRequest, UserSearchResult } from "../../types";

const prisma = new PrismaClient();

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
}

export async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}

export async function updateUser(id: string, data: User) {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  return user;
}

export async function getSearchUsers(search: string) {
  const userSearchResults: UserSearchResult[] = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: search, mode: "insensitive" } },
        { displayName: { contains: search, mode: "insensitive" } },
      ],
    },
    select: {
      id: true,
      username: true,
      displayName: true,
      imageUrl: true,
      isCredited: true,
    },
  });
  return userSearchResults;
}

export async function getUserIfExist(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (e) {
    // user does not exist
    return undefined;
  }
}

export async function createNewUser(id: string, userFromInput: CreateUserRequest) {
  const data: User = {
    id,
    vId: userFromInput.vId,
    username: userFromInput.username,
    displayName: userFromInput.displayName,
    firstName: userFromInput.firstName,
    lastName: userFromInput.lastName,
    github: userFromInput.github,
    discord: userFromInput.discord,
    imageUrl: userFromInput.imageUrl,
    isCredited: false,
    role: "member",
  };
  const createdUser = await prisma.user.create({
    data,
  });
  return createdUser;
}
