import React from 'react';

const ProfilePage = ({ params }: { params: { username: string } }) => {
  return <div>page of {params.username}</div>;
};

export default ProfilePage;
