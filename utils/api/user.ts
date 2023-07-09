import { PrismaClient, User } from "@prisma/client";

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
