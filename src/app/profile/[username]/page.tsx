import { getProfileByUsername, getUserLikedPosts, getUserPosts, isFollowing } from "@/actions/profile.action";
import NotFound from "@/app/not-found";
import ProfileComponet from "@/components/profile-component";



export async function generateMetadata({ params} : {params: {username: string}}) {
     const {username} = await params;
    const user = await getProfileByUsername(username)
    if(!user) return;

    return {
        title: `${user.name ?? user.username}`,
        description: user.bio || `Check out ${user.username} proflie`
    }
}

const profilePage = async ({params}: {params: {username: string}}) => {
  const {username} = await params;
   const user = await getProfileByUsername(username)
   if(!user) return (<NotFound />)

   const [posts, likesPosts, isCurrentUserFollowing] = await Promise.all([
    getUserPosts(user.id),
    getUserLikedPosts(user.id),
    isFollowing(user.id)
   ]); 


   return (
     <ProfileComponet
       user={user} 
       posts={posts}
       likedPosts={likesPosts}
       isFollowing={isCurrentUserFollowing}
     />
   )
}

export default profilePage