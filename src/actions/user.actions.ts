'use server'

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function syncUser() {
    try {
        const {userId} = await auth()
        const user = await currentUser()

        if(!userId || !user) return;

        const existingUser = await prisma.user.findUnique({
            where: {
                clerkId: userId,
            }
        })

       if(existingUser) return existingUser;
       
       const dbUSer = await prisma.user.create({
        data: {
            clerkId: userId,
            name: `${user.firstName || ""} ${user.lastName}`,
            username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
            email: user.emailAddresses[0].emailAddress,
            image: user.imageUrl
        }
       })

       return dbUSer
    } catch (error) {
        console.log("Error creating user", error)
    }
}

export async function getUserByClerkId(clerkId: string){
  const user = prisma.user.findUnique({
    where: {
        clerkId
    },
    include: {
      _count: {
        select: {
            followers: true,
            following: true,
            posts: true
        },
      },
    },
  });

  return user;
}

export async function getDbUserId() {
    const {userId:clerkId} = await auth()
    if(!clerkId) return ;

    const user = await getUserByClerkId(clerkId)
    if(!user) return; 
        
    return user.id    
}

export async function getRandomUsers(){
    const userId = await getDbUserId()

    try {
        const randomUsers = await prisma.user.findMany({
        where: {
            AND: [
                {
                    NOT: {id: userId}},
                {
                    NOT: {
                        followers: {
                            some: {
                                followerId: userId
                            }
                        }
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            username:true,
            image:true,
            _count: {
                select: {
                    followers: true
                }
            }
        },
        take: 3
    })
    return randomUsers
    } catch (error) {
        console.log("Error fetching Users", error)
        return []
    }
}

export async function toggleFollow(targetUserId: string){
   try {
    const userId= await getDbUserId()

   if(!userId || userId === targetUserId) throw new Error("Cannot Follow yourself")

   const existingFollow = await prisma.follows.findUnique({
    where: {
        followerId_followingId: {
            followerId: userId,
            followingId: targetUserId
        }
    }
   })
   
   if(existingFollow){
     // unfollow
     await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: userId,
                followingId: targetUserId
            }
        }
     })
   }
   else {
    // follow
  await prisma.$transaction([
        prisma.follows.create({
            data: {
                followerId: userId,
                followingId: targetUserId
            }
        }),

        prisma.notification.create({
            data: {
                type: "FOLLOW",
                userId: targetUserId, // user being followed
                creatorId: userId // user who is following
            }
        })
    ])
   }
   
   revalidatePath("/")
   return {success: true}
   } catch (error) {
    console.log("Error following User", error)
    return {success: false}
   }
}