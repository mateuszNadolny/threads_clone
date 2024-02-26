import { UserProfile } from '@clerk/nextjs';

const UserProfilePage = () => {
  return (
    <div className="flex justify-center items-center">
      <UserProfile path="/user-profile" routing="path" />
    </div>
  );
};

export default UserProfilePage;
