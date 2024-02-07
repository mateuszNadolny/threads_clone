'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  return user;
};
