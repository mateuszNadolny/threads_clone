'use client';

import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';

import { UserProps } from '@/lib/types';

import { cn } from '@/lib/utils';

const ProfileSection = ({ currentUser }: { currentUser: UserProps }) => {
  const { username, image, biogram, link, id, clerkId } = currentUser;
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();

  return (
    <div className="w-[90%] pt-[80px] lg:pt-[95px] max-w-[572px]">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-2xl">{username}</div>
        <Image
          src={image as string}
          unoptimized
          width={65}
          height={65}
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
          <Button className="w-full h-[35px] rounded-lg" variant="outline">
            Edit profile
          </Button>
        </div>
      )}
      {user?.id !== clerkId && isSignedIn && (
        <div className="flex w-full gap-4">
          <Button className="w-1/2 h-[35px] rounded-lg">Folow</Button>{' '}
          <Button className="w-1/2 h-[35px] rounded-lg" variant="outline">
            Mention
          </Button>
        </div>
      )}
      {!isSignedIn && <></>}
      <div className="flex w-full mt-5">
        <div
          className={cn(
            'text-[#777777] h-[40px] flex-1 w-1/3 flex justify-center items-center border-b-2',
            pathname === `/${user?.username}` && 'border-primary text-primary'
          )}>
          <Link href={`/${user?.username}`}>Threads</Link>
        </div>
        <div
          className={cn(
            'text-[#777777] h-[40px] flex-1 w-1/3 flex justify-center items-center border-b-2',
            pathname === `/${user?.username}/replies` && 'border-primary text-primary'
          )}>
          <Link href={`/${user?.username}/replies`}>Replies</Link>
        </div>
        <div
          className={cn(
            'text-[#777777] h-[40px] flex-1 w-1/3 flex justify-center items-center border-b-2',
            pathname === `/${user?.username}/reposts` && 'border-primary text-primary'
          )}>
          <Link href={`/${user?.username}/reposts`}>Reposts</Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
