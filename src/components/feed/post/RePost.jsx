import { RePostIcon } from "@/components/Icons"
import { FeedContext } from "@/context/FeedContext"
import { useContext, useState } from "react"

export default function RePost({ post }) {

  const [repostCounts, setRepostCounts] = useState(post?.counts?.reposts || 0)
  const [isReposted, setIsReposted] = useState(post?.actions?.isReposted || false)
  const { rePost } = useContext(FeedContext)

  const onRepost = async () => {
    if (isReposted) return
    setIsReposted(true)
    setRepostCounts(prev => (prev + 1))
    await rePost(post?._id)
  }

  return (
    <div className="flex items-center gap-4">
      <div onClick={() => {
        // @pankaj here open repost modal
      }}><RePostIcon fill={isReposted && '#0AA853'} /></div>
      <p className={`font-sans text-[14px] ${isReposted ? 'text-brandprimary' : 'text-sidebarlabel'}`}>
        {repostCounts}
      </p>
    </div>
  )
}
