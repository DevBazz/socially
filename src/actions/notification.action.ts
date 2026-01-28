"use server";

import { prisma } from "@/lib/prisma";
import { getDbUserId } from "./user.actions";

export async function getNotifications() {
  try {
    const userId = await getDbUserId();
    console.log("DEBUG: userId from getDbUserId:", userId);
    if (!userId) {
      console.log("DEBUG: No userId found, returning empty array");
      return []; 
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        type: true,
        read: true,
        createdAt: true,
        creator: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
        post: {
          select: {
            id: true,
            content: true,
            image: true,
          },
        },
        comment: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("DEBUG: notifications fetched:", notifications.length);
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }
}

export async function markNotificationsAsRead(notificationIds: string[]) {
  try {
    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
      data: {
        read: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return { success: false };
  }
}