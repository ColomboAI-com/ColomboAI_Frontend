import { useContext } from "react"
import RecentComments from "@/components/feed/post/RecentComments"
import ImageBlock from "@/components/feed/post/ImageBlock"
import PostActions from "@/components/feed/post/PostActions"
import ProfilePicture from "../ProfilePicture"
import Username from "../Username"
import { formatTimeAgo } from "@/utlils/commonFunctions"
import ContentBlock from "@/components/feed/post/ContentBlock"
import VideoBlock from "@/components/feed/post/VideoBlock"
import Link from "next/link"
import { PostMoreOptionsIcon } from "@/components/Icons"
import Dropdown from "@/components/messages/Dropdown"
import { FeedContext } from "@/context/FeedContext"
import { getCookie } from "@/utlils/cookies"

const Post = ({ post }) => {
  const { deletePost } = useContext(FeedContext);

  const handleDeletePost = async () => {
    try {
      const response = await deletePost(post._id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };
  return (
    <>
      {/* <div className="flex items-center">
        <ProfilePicture image={post?.creator?.profile_picture} className="w-[20px] h-[20px]" />
        <Username username={post?.creator?.user_name} className="text-[12px] pl-[7px]" /><span className="text-[#b3b3b3] font-sans"> reposted this</span>
      </div> */}
      <div className="border-[1px] border-brandprimary rounded-[10px] mt-5">
        <div className="flex items-center justify-between px-[16px] py-[12px]">
          <Link className="flex items-center" href={`/profile/${post?.creator?.user_name || ''}`} target="_blank">
            <ProfilePicture image={post?.creator?.profile_picture} />
            <Username username={post?.creator?.user_name} />
          </Link>
          <div className="flex items-center gap-4">
            <p className="font-sans text-sidebarlabel tex-[12px] text-[#8B8B8B]">
              {formatTimeAgo(post?.createdAt)}
            </p>
            <Dropdown
              offset={[0, 10]}
              placement="bottom-start"
              btnClassName="flex justify-center items-center rounded-full hover:text-brandprimary cursor-pointer"
              button={<PostMoreOptionsIcon w={30} h={30} fill={"#A7A7A7"} />}
            >
              <ul className="rounded bg-white shadow-md">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleDeletePost}>Delete Post</li>
              </ul>
            </Dropdown>
          </div>
        </div>

        {post?.type === 'image' && <ImageBlock image={post.media} />}
        {post?.type === 'video' && <VideoBlock video={post.media} />}
        {post?.content && <ContentBlock content={post.content} />}
        <div className="px-[16px] py-[12px]">
          {post &&
            <>
              <PostActions post={post} />
              <RecentComments comments={post.comments} />
            </>
          }
        </div>
      </div></>
  )
}

export default Post
