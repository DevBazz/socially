import { getPosts } from '@/actions/post.action'
import { getDbUserId } from '@/actions/user.actions'
import CreatePost from '@/components/create-post'
import PostCard from '@/components/post-card'
import WhoToFollow from '@/components/who-to-follow'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'


const HomePage = async () => {

const user = await currentUser()
const posts = await getPosts()
 const userId = await getDbUserId()

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 gap-6'>
      <div className='lg:col-span-6'>
        {user ? <CreatePost /> : null}

        <div className='space-y-6'>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} userId={userId}/>
          ))}
        </div>
      </div>

      <div className='hidden lg:block lg:col-span-4 sticky top-20'>
        {user ? <WhoToFollow /> : null}
      </div>
    </div>
  )
}

export default HomePage