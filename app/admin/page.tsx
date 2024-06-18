import Link from 'next/link'
import React from 'react'
import { FaUsers } from 'react-icons/fa'

const AdminPage = async () => {
    return (
        <div className='flex flex-wrap gap-x-5 items-center justify-center mt-10'>
            <Link href={'/admin/users'} className='bg-muted font-medium rounded-lg aspect-square hover:bg-muted/50 grid items-center justify-center px-5'>
                <FaUsers className='w-full' size={30}/>
                <div>
                    Users table
                </div>
            </Link>
        </div>
    )
}

export default AdminPage