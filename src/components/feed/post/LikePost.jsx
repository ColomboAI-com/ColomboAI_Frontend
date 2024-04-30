import { LikeIcon } from "@/components/Icons"
import { FeedContext } from "@/context/FeedContext"
import { useContext, useState } from "react"

export default function LikePost({ post }) {

  const [likeCounts, setLikeCounts] = useState(post?.counts?.likes || 0)
  const [isLiked, setIsLiked] = useState(post?.actions?.isLiked || false)
  const { likePost } = useContext(FeedContext)

  const onLikePost = async () => {
    setIsLiked(!isLiked)
    if (isLiked) setLikeCounts(prev => (prev - 1))
    else setLikeCounts(prev => (prev + 1))
    await likePost(post?._id)
  }

  return (
    <div className="flex items-center gap-4">
      <div onClick={onLikePost}><LikeIcon fill={isLiked && '#E95050'} /></div>
      <p className={`font-sans text-[14px] ${isLiked ? 'text-brandprimary' : 'text-sidebarlabel'}`}>
        {likeCounts}
      </p>
    </div>
  )
}
