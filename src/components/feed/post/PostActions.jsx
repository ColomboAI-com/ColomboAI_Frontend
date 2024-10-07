import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import LikePost from "./LikePost"
import RePost from "./RePost"
import SavePost from "./SavePost"
import { MagicPenIcon } from "@/components/Icons"
import post_comment from "../../../../public/images/icons/post_comment.svg"
import post_stats from "../../../../public/images/icons/post_stats.svg"
import reply_icon from "../../../../public/images/icons/reply_icon.svg"
import wallet_icon from "../../../../public/images/icons/wallet_icon.svg"
import Image from "next/image"

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
            <Image src={post_comment} alt="colombo" />
          </button>
          <p className="text-sidebarlabel font-sans text-[14px]">{post?.counts?.comments || 0}</p>
        </div>
        <Image src={post_stats} alt="colombo" />
        {/* <div onClick={() => handleComments(post._id)}></div> */}
        <button onClick={() => handleShare(post._id)} className="flex items-center gap-4">
          <Image src={reply_icon} alt="colombo" />
        </button>
      </div>
      <div className="flex items-center gap-[19px]">
        <MagicPenIcon />
        <Image src={wallet_icon} alt="colombo" />
      </div>
    </div></>
  )
}

