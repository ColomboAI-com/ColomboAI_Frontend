import { RePostIcon } from "@/components/Icons"
import { FeedContext } from "@/context/FeedContext"
import { useState, useContext } from "react"
import Modal from "@/components/elements/Modal"
import RepostModal from "@/components/RepostModal"
import { MessageBox } from "@/components/MessageBox"

export default function RePost({ post }) {

  const [repostCounts, setRepostCounts] = useState(post?.counts?.reposts || 0)
  const [isReposted, setIsReposted] = useState(post?.interactions?.isReposted || false)
  const { rePost } = useContext(FeedContext)
  const [isRepostOpen, setIsRepostOpen] = useState(false)

  const onRepost = async () => {
    const res = await rePost(post?._id)
    if (res) {
      setIsReposted(true)
      setRepostCounts(prev => (prev + 1))
      setIsRepostOpen(false)
      MessageBox('success', res.message)
    }
  }  
  return (  
    <div className="flex items-center gap-4">
      <div onClick={() => {
        if (isReposted) return
        setIsRepostOpen(true)
      }}>
        <RePostIcon fill={'#646464'} />
      </div>
      <p className={`font-sans text-[14px] ${isReposted ? 'text-brandprimary' : 'text-sidebarlabel'}`}>
        {repostCounts}
      </p>
      <Modal
        isOpen={isRepostOpen}
        setIsOpen={setIsRepostOpen}
        className="w-full absolute bottom-0 sm2:w-auto md:w-auto sm2:relative md:relative max-w-4xl transform overflow-hidden align-middle shadow-xl transition-all md:shadow-none"
      >
        <RepostModal
          post={post}
          onRepost={onRepost}
          setIsRepostOpen={setIsRepostOpen}
        />
      </Modal>
    </div>
  )
}
