import { get_all_users } from '@/actions/admin/users/get-all-users';
import { auth } from '@/auth'
import CustomTable from '@/components/admin/custom-table'
import { notFound } from 'next/navigation';
import React from 'react'

const AdminUsersPage = async () => {
    const session = await auth();
    if(!session || session.user.role !== 'ADMIN'){
        // TODO: create "Access denied" page
        return notFound();
    }
    const users = await get_all_users();
    return (
        <div className='mt-5 max-w-screen-md mx-auto w-full'>
            {(users && users?.length > 0) ? <CustomTable data={users}/> : <span className='w-full text-center text-xl font-medium'>No data.</span>}
        </div>
    )
}

export default AdminUsersPage