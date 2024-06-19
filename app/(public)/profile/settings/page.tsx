import { get_user_data } from '@/actions/profile/get-user-data';
import { auth } from '@/auth';
import { PasswordSettingsForm } from '@/components/forms/password-settings-form';
import { ProfileSettingsForm } from '@/components/forms/profile-settings/profile-settings-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClientUser } from '@/types';
import { notFound } from 'next/navigation';
import { FC, Suspense } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';

interface ProfileSettingsProps {

}

const ProfileSettings: FC<ProfileSettingsProps> = async ({

}) => {
    const session = await auth();
    if (!session || !session?.user?.id) {
        return notFound();
    }
    const user = await get_user_data(session?.user.id);
    return (

        <Tabs className='w-full' defaultValue='account'>
            <TabsList className='gap-x-2'>
                <TabsTrigger value={'account'}>
                    Account
                </TabsTrigger>
                <TabsTrigger value={'password'}>
                    Password
                </TabsTrigger>
            </TabsList>
            <TabsContent value='account'>
                <Suspense fallback={<TbLoaderQuarter className='absolute left-1/2 -translate-x-1/2 top-10 text-xl animate-spin' />}>
                    <ProfileSettingsForm user={user as unknown as ClientUser} />
                </Suspense>
            </TabsContent>
            <TabsContent value='password'>
                <Suspense fallback={<TbLoaderQuarter className='absolute left-1/2 -translate-x-1/2 top-10 text-xl animate-spin' />}>
                    <PasswordSettingsForm user={user as unknown as ClientUser} />
                </Suspense>
            </TabsContent>
        </Tabs>
    )
}
export default ProfileSettings