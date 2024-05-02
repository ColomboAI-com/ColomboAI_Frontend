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

const Post = ({ post }) => {
  return (
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
          <button>
            <PostMoreOptionsIcon w={30} h={30} fill={"#A7A7A7"}/>
          </button>
        </div>
      </div>
      
      {post?.type === 'image' && <ImageBlock image={post.media} />}
      {post?.type === 'video' && <VideoBlock video={post.media} />}
      {post?.content && <ContentBlock content={post.content} />}
      <div className="px-[16px] py-[12px]">
        <PostActions post={post} />
        <RecentComments comments={post.comments} />
      </div>
    </div>
  )
}

export default Post