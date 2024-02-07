'use client';

import { useState, useEffect } from 'react';

import { findUser } from '@/app/actions/dbActions';

import { UserProps } from '@/lib/types';

import ProfileSection from '@/components/profile-section';

const ProfilePage = ({ params }: { params: { username: string } }) => {
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
        </div>
      )}
      {!user && !isLoading && (
        <div className="h-screen w-screen flex justify-center items-center">user not found</div>
      )}
    </div>
  );
};

export default ProfilePage;
