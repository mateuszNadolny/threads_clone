'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// --> USER RELATED ACTIONS <--

export const findUser = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username
    }
  });
  revalidatePath('/' + username);

  return user;
};

export const findUserByClerkId = async (clerkId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkId
    }
  });

  console.log(user?.id);
  return user?.id as string;
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
  revalidatePath('/(dashboard)/(profile)/[username]', 'layout');
};

// --> POSTS RELATED ACTONS <--

export const createPost = async (data: { userId: string; text: string; image: string }) => {
  const post = await prisma.post.create({
    data: {
      authorId: data.userId,
      text: data.text,
      image: data.image
    }
  });

  return post;
};
