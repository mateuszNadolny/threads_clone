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
  return user;
};

export const editUserProfile = async (id: string, biogram: string, link: string) => {
  const user = await prisma.user.update({
    where: {
      id: id
    },
    data: {
      biogram: biogram,
      link: link
    }
  });
  revalidatePath('/(dashboard)/(profile)/[username]', 'layout');
};
