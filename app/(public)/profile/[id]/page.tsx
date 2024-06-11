import { get_user_data } from '@/actions/profile/get-user-data';
import { auth } from '@/auth';
import ProfileCard from '@/components/profile/profile-card';
import { ClientUser } from '@/types';
import { notFound } from 'next/navigation';
import React, { FC } from 'react'

interface ProfileParams {
    params: {
        id: string
    }
}

const UserProfilePage: FC<ProfileParams> = async ({
    params
}) => {
    const session = await auth();
    const userData = await get_user_data(params.id);
    if(!userData){
        return notFound();
    }

    return (
        <div className='max-w-screen-lg py-2 px-5'>
            <ProfileCard isOwner={!!session && userData.id === session.user.id} userData={userData as unknown as ClientUser}/>
        </div>
    )
}

export default UserProfilePage