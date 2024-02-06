'use client';

import { useUser } from '@clerk/nextjs';

import { findUser } from '@/app/actions/clerkActions';

const UserProfileLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useUser();

  const userExists = async () => {
    await findUser(user?.username as string);
  };

  if (!userExists) {
    return (
      <body className="flex w-screen h-screen justify-center items-center">
        <h1>Such user does not exist sadface</h1>
        {children}
      </body>
    );
  }

  return (
    <body className="flex w-screen h-screen justify-center items-center">
      <h1>THis is a profile of {user?.username} </h1>
      {children}
    </body>
  );
};

export default UserProfileLayout;
