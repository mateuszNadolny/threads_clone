'use client';

import { useState, useEffect } from 'react';

import { findUser } from '@/app/actions/dbActions';

import { UserProps } from '@/lib/types';

import { useUserProfileStore } from '@/zustand/store';

import ProfileSection from '@/components/profile-section';
import BlindAlley from '@/components/blind-alley';
import Loader from '@/components/loader';

interface ProfilePageLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

const ProfilePageLayout = ({ children, params }: ProfilePageLayoutProps) => {
  const { username } = params;
  const [user, setUser] = useState<UserProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { zustandBiogram, setZustandBiogram, zustandLink, setZustandLink } = useUserProfileStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await findUser(username);
        if (fetchedUser) {
          setUser(fetchedUser);
          setZustandBiogram(fetchedUser.biogram as string);
          setZustandLink(fetchedUser.link as string);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [username, zustandBiogram, zustandLink, setZustandBiogram, setZustandLink]);

  return (
    <div>
      {isLoading && <Loader />}
      {user && (
        <div className="h-screen w-screen flex flex-col items-center">
          <ProfileSection currentUser={user} />
          {children}
        </div>
      )}
      {!user && !isLoading && <BlindAlley />}
    </div>
  );
};

export default ProfilePageLayout;
