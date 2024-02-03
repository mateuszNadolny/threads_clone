'use server';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const upsertUser = async (
  id: string,
  image_url: string,
  email_addresses: { email_address: string }[],
  username: string
) => {
  const user = await prisma.user.create({
    data: {
      clerkId: id,
      username: username,
      email: email_addresses[0].email_address,
      profilePic: image_url
    }
  });
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: {
      clerkId: id
    }
  });
};
