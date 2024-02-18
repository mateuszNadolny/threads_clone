'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

export const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  revalidatePath('/' + username);

  return user;
};

export const editUserProfile = async (data: { id: string; biogram: string; link: string }) => {
  const user = await prisma.user.update({
    where: {
      id: data.id
    },
    data: {
      biogram: data.biogram,
      link: data.link
    }
  });
  revalidatePath('/' + user.username);
};
