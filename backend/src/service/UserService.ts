// user service
import prisma from "../utils/prismaClient";

export async function findbyEmail(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}
