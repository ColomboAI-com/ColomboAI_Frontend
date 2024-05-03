import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import LikePost from "./LikePost"
import RePost from "./RePost"
import SavePost from "./SavePost"
import Modal from "@/components/elements/Modal"
import { useState } from "react"

import CommentSection from "@/components/comment/CommentSection"

export default function PostActions({ post }) {

  const { setIsShareOpen, setIsCommentOpen } = useContext(GlobalContext)
  // sconst [isCommentOpen] = useState(false)

  return (
    <><div className="flex items-center justify-between">
      <div className="flex items-center gap-[19px]">
        <LikePost post={post} />
        <div className="flex items-center gap-4">
          <button onClick={() => setIsCommentOpen(true)}>
            <img src="/images/icons/ChatCircleDots.svg" alt="comment_image" />
          </button>
          <p className="text-sidebarlabel font-sans text-[14px]">{post?.counts?.comments || 0}</p>
        </div>
        <RePost post={post} />
        <div className="flex items-center">
          <img src="/images/icons/sidebar/gen-ai-icon.svg" alt="magic_pen_button_image" />
        </div>
      </div>
      <div className="flex items-center gap-[19px]">
        <button onClick={() => setIsShareOpen(true)} className="flex items-center gap-4">
          <img src="/images/home/Arrow.png" alt="share_button_image" />
        </button>
        <SavePost post={post} />
      </div>
    </div></>
  )
}

