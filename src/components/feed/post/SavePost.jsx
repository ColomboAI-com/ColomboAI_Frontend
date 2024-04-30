import { SaveIcon } from "@/components/Icons"
import { FeedContext } from "@/context/FeedContext"
import { useContext, useState } from "react"

export default function SavePost({ post }) {

  const [savedCounts, setSavedCounts] = useState(post?.counts?.saved || 0)
  const [isSaved, setIsSaved] = useState(post?.actions?.isSaved || false)
  const { savePost } = useContext(FeedContext)

  const onSavePost = async () => {
    setIsSaved(!isSaved)
    if (isSaved) setSavedCounts(prev => (prev - 1))
    else setSavedCounts(prev => (prev + 1))
    await savePost(post?._id)
  }

  return (
    <div className="flex items-center gap-4">
      <div onClick={onSavePost}><SaveIcon fill={isSaved && '#1E71F2'} /></div>
      <p className={`font-sans text-[14px] ${isSaved ? 'text-brandprimary' : 'text-sidebarlabel'}`}>
        {savedCounts}
      </p>
    </div>
  )
}
