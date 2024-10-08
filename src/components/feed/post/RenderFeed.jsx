'use client'
import Post from "@/components/elements/cards/Post"
import Loader from "@/components/Loader"
import NoDataFound from "@/components/NoDataFound"
import { feed, FeedContext } from "@/context/FeedContext"
import { useContext, useEffect } from "react"

export default function RenderFeed({ filter }) {

  const { posts, getPosts, loadings, page, resetFeedValues } = useContext(FeedContext)

  useEffect(() => {
    getPosts(filter)
    return () => resetFeedValues()
  }, [filter])

  const handleFeedScroll = () => {
    const feedSection = document.getElementById('feed_section')
    if (
      feedSection && !loadings.getPost &&
      Math.ceil(feedSection.scrollTop + feedSection.clientHeight) === feedSection.scrollHeight
    ) getPosts(filter, page)
  }

  useEffect(() => {
    const feedSection = document.getElementById('feed_section')
    feedSection?.addEventListener('scroll', handleFeedScroll)
    return () => { feedSection?.removeEventListener('scroll', handleFeedScroll) }
  }, [page, loadings.getPost])

  if (loadings.getPost && !posts.length)
    return <Loader className={'mt-5'} />

  return (
    <div className="sm:px-2 md:px-0">
      {
        posts.length ?
          posts.map((i, index) =>
            <Post post={i} key={index} />
          )
          : <NoDataFound className={'mt-5'} />
      }
    </div>
  )
}
