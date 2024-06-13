import Link from 'next/link'
import React from 'react'

const AdminPage = async () => {
    return (
        <div className='flex flex-wrap gap-x-5'>
            <Link href={'/admin/users'}>
                Users table
            </Link>
        </div>
    )
}

export default AdminPage