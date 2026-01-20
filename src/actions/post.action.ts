'use server'

import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./user.actions"
import { revalidatePath } from "next/cache"

export async function createPost(content: string, image: string){
   try {
    const userId = await getDbUserId()

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