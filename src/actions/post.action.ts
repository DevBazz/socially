'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.actions"
import { revalidatePath } from "next/cache"

export async function createPost(content: string, image: string){
   try {
    const userId = await getDbUserId()

    if (!userId) {
      return {success: false, error: "User not authenticated"}
    }

    const post = await prisma.post.create({
        data: {
            content,
            image,
            authorId: userId
        }
    })

    revalidatePath("/")
    return {success: true, post}
   } catch (error) {
      console.log("Failed to create Post:", error)
      return {success: false, error: "Failed to create Post"}
   }
}

export async function getPosts(){
    try {
       const posts  = prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    name: true,
                    username: true,
                    image: true
                }
            },
            comments: {
                include: {
                    author: {
                        select: {
                            id: true,
                            username: true,
                            name: true,
                            image: true
                        },
                    },
                },
                orderBy: {
                    createdAt: "asc"
                }
            },
            likes: {
                select: {
                    userId: true
                }
            },
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            }
        }
       }) 
       return posts
    } catch (error) {
        console.log("Error in fetching posts", error)
        throw new Error ("Failed to fetch Posts")
    }
}

export async function toggleLike(postId) {
    
}