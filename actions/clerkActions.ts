import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const upsertUser = async (
  id: string,
  first_name: string,
  last_name: string,
  image_url: string,
  email_addresses: { email_address: string }[],
  username: string
) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        clerkId: id
      },
      update: {},
      create: {
        clerkId: id,
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        profilePic: image_url,
        username: username
      }
    });
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteUser = async (id: string) => {
  try {
    await prisma.user.delete({
      where: {
        clerkId: id
      }
    });
  } catch (error) {
    console.log(error);
    return;
  }
};
