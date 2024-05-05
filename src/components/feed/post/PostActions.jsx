import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import LikePost from "./LikePost"
import RePost from "./RePost"
import SavePost from "./SavePost"
import { MagicPenIcon } from "@/components/Icons"

export default function PostActions({ post }) {

  const { setIsShareOpen, setIsCommentOpen, setSpecificPostId, setPosts } = useContext(GlobalContext)

  const handleShare = (postId) => {
    setIsShareOpen(true)
    setSpecificPostId(postId)
    setPosts(post)
  }

  const handleComments = (postId) => {
    setSpecificPostId(postId)
    setPosts(post)
    setIsCommentOpen(true)
  }

  return (
    <><div className="flex items-center justify-between">
      <div className="flex items-center gap-[19px]">
        <LikePost post={post} />
        <div className="flex items-center gap-4">
          <button onClick={() => handleComments(post._id)}>
            <img src="/images/icons/ChatCircleDots.svg" alt="comment_image" />
          </button>
          <p className="text-sidebarlabel font-sans text-[14px]">{post?.counts?.comments || 0}</p>
        </div>
        <RePost post={post} />
        <div onClick={() => handleComments(post._id)}><MagicPenIcon /></div>
      </div>
      <div className="flex items-center gap-[19px]">
        <button onClick={() => handleShare(post._id)} className="flex items-center gap-4">
          <img src="/images/home/Arrow.png" alt="share_button_image" />
        </button>
        <SavePost post={post} />
      </div>
    </div></>
  )
}

