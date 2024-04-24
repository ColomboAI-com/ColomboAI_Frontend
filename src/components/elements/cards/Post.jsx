import RecentComments from "@/components/feed/post/RecentComments"
import ImageBlock from "@/components/feed/post/ImageBlock"
import PostActions from "@/components/feed/post/PostActions"
import ProfilePicture from "../ProfilePicture"
import Username from "../Username"
import { formatTimeAgo } from "@/utlils/commonFunctions"
import ContentBlock from "@/components/feed/post/ContentBlock"
import VideoBlock from "@/components/feed/post/VideoBlock"

const Post = ({ post }) => {
  return (
    <div className="border-[1px] border-brandprimary rounded-[10px]">
      <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
        <div className="flex items-center">
          <ProfilePicture image={post?.creator?.profile_picture} />
          <Username username={post?.creator?.user_name} />
        </div>
        <div className="flex items-center gap-4">
          <p className="font-sans text-sidebarlabel tex-[12px]">
            {formatTimeAgo(post?.createdAt)}
          </p>
          <img src="/images/home/more_horiz.png" alt="more_option_image" />
        </div>
      </div>
      {post?.content && <ContentBlock />}
      {post?.filetype === 'image' && <ImageBlock />}
      {post?.filetype === 'video' && <VideoBlock />}
      <div className="pl-[37px] pt-[10px] pr-[41px] pb-[17px]">
        <PostActions />
        <RecentComments />
      </div>
    </div>
  )
}

export default Post