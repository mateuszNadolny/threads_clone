'use client';

import { useUser } from '@clerk/nextjs';

import Image from 'next/image';

import { Button } from './ui/button';

import { UserProps } from '@/lib/types';
const ProfileSection = ({ currentUser }: { currentUser: UserProps }) => {
  const { username, image, biogram, link, id, clerkId } = currentUser;
  const { user, isSignedIn } = useUser();

  console.log('this is user.id: ' + user?.id);
  console.log('this is clerkId: ' + clerkId);
  return (
    <div className="w-[90%] pt-[80px] lg:pt-[95px]">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">{username}</div>
        <Image
          src={image as string}
          unoptimized
          width={55}
          height={55}
          alt="profile"
          className="rounded-full"
        />
      </div>
      <div className="text-[15px] mb-4">{biogram}</div>
      <div className="flex gap-4 justify-start text-[#777777] text-[15px] mb-5">
        <p>1999 followers</p>
        <p>{link}</p>
      </div>
      {user?.id === clerkId && isSignedIn && (
        <div className="flex w-full gap-4">
          <Button className="w-full h-[30px] rounded-lg">Edit profile</Button>
        </div>
      )}
      {user?.id !== clerkId && isSignedIn && (
        <div className="flex w-full gap-4">
          <Button className="w-1/2 h-[30px] rounded-lg">Folow</Button>{' '}
          <Button className="w-1/2 h-[30px] rounded-lg" variant="outline">
            Mention
          </Button>
        </div>
      )}

      {!isSignedIn && <div>sign in to follow</div>}
    </div>
  );
};

export default ProfileSection;
