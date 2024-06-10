import { auth } from '@/auth';
import { FC } from 'react';

interface ProfilePageProps {

}

const ProfilePage: FC<ProfilePageProps> = async ({

}) => {
  const session = await auth();
  return (
    <div className='max-w-screen-lg py-2 px-5'>
      <pre>
        {JSON.stringify(session, null, 3)}
      </pre>
    </div>
  )
}
export default ProfilePage