'use client'

import { getProfileByUsername, getUserLikedPosts, getUserPosts } from "@/actions/profile.action"

type User = Awaited<ReturnType<typeof getProfileByUsername>>
type Posts = Awaited<ReturnType<typeof getUserPosts >>
type LikedPosts = Awaited<ReturnType<typeof getUserLikedPosts >>

interface ProfileProps {
    user: User
    posts: Posts
    likedPosts: LikedPosts
    isFollowing: boolean
}

const ProfileComponet = ({user, posts, likedPosts, isFollowing: intialFollowing}: ProfileProps) => {
  return (
    <div>ProfileComponet</div>
  )
}

export default ProfileComponet