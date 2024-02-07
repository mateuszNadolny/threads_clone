'use client';

import { useState, useEffect } from 'react';

import { findUser } from '@/app/actions/dbActions';

import { UserProps } from '@/lib/types';

import ProfileSection from '@/components/profile-section';
import BlindAlley from '@/components/blind-alley';

interface ProfilePageLayoutProps {
  children: React.ReactNode;
  params: { username: string };
}

const ProfilePageLayout = ({ children, params }: ProfilePageLayoutProps) => {
  const { username } = params;
  const [user, setUser] = useState<UserProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await findUser(username);
        if (fetchedUser) {
          console.log(fetchedUser);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      {isLoading && <div>loading...</div>}
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
