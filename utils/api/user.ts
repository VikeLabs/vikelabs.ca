import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserRole(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user.role;
}
