"use client";

import {
  createComment,
  deletePost,
  getPosts,
  toggleLike,
} from "@/actions/post.action";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

type Posts = Awaited<ReturnType<typeof getPosts>>;
type Post = Posts[number];

const PostCard = ({
  post,
  userId,
}: {
  post: Post;
  userId: string | undefined;
}) => {
  const { user } = useUser();
  const [newComment, setNewComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasLiked, setHasLiked] = useState(
    post.likes.some((like) => like.userId === userId),
  );
  const [optimisticLikes, setOptimisticLikes] = useState(post._count.likes);

  const handleLikes = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setHasLiked((prev) => !prev);
      setOptimisticLikes((prev) => prev + (hasLiked ? -1 : 1));
      await toggleLike(post.id);
    } catch (error) {
      setOptimisticLikes(post._count.likes);
      setHasLiked(post.likes.some((like) => like.userId === userId));
    } finally {
      setIsLiking(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || isCommenting) return;
    try {
      setIsCommenting(true);
      const result = await createComment(post.id, newComment);
      if (result?.success) {
        toast.success("Comment posted successfully");
        setNewComment("");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add comment");
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDeletePost = async () => {
    if (isDeleting) return;
    try {
      setIsDeleting(true);
      const result = await deletePost(post.id);
      if (result.success) toast.success("Post deleted successfully");
      else throw new Error(result.error);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete post");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4 ">
          <div className="flex space-x-3 sm:space-x-4">
            <Link href={`/post/${post.author.username}`}>
            <Avatar className="size sm:w-10 sm:h-10">
             <AvatarImage src={post.author.image || "/avatar.png"}/>
            </Avatar>
            </Link>

            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
