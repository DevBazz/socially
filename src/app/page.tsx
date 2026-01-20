import CreatePost from '@/components/create-post'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'


const HomePage = async () => {

const user = await currentUser()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-6'>
        {user ? <CreatePost /> : null}
      </div>

      <div className='hidden lg:hidden lg:col-span-4 sticky top-20'></div>
    </div>
  )
}

export default HomePage