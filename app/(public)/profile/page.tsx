import { get_user_data } from '@/actions/profile/get-user-data';
import { auth } from '@/auth';
import ProfileCard from '@/components/profile/profile-card';
import { ClientUser } from '@/types';
import { notFound } from 'next/navigation';
import { FC } from 'react';

interface ProfilePageProps {

}

const ProfilePage: FC<ProfilePageProps> = async ({

}) => {
  const session = await auth();
  const userData = await get_user_data(session?.user.id!);
  if (!userData) {
    return notFound();
  }
  return (
    <div className='max-w-screen-lg'>
      <ProfileCard isOwner={!!session && userData.id === session.user.id} userData={userData as unknown as ClientUser} />
    </div>
  )
}
export default ProfilePage