'use client'

import { getPosts, toggleLike } from '@/actions/post.action'
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'

type Posts = Awaited<ReturnType<typeof getPosts>>
type Post = Posts[number]

const PostCard = ({post, userId} : {post: Post; userId: string | undefined}) => {

const {user} = useUser()
const [newComment, setNewComment] = useState("")
const [isCommenting, setIsCommenting] = useState(false)
const [isLiking, setIsLiking] = useState(false)
const [isDeleting, setIsDeleting] = useState(false)
const [hasLiked, setHasLiked] = useState(post.likes.some(like => like.userId === userId))
const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes)

const handleLikes = async () => {
    if(isLiking) return

    try {
        setIsLiking(true)
        setHasLiked(prev => !prev)
        setOptimisticLikes(prev => prev + (hasLiked ? -1 : 1))
        await toggleLike(post.id)
    
    } catch (error) {
        setOptimisticLikes(post._count.likes)
        setHasLiked(post.likes.some(like => like.userId === userId))
    } finally {
       setIsLiking(false)
    }
}

const handleComment = async () => {
    
}

const handleDelete = async () => {
    
}

  return (
    <div>PostCard</div>
  )
}

export default PostCard