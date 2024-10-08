'use client'
import FooterAdComponent from "@/components/ads/Ad"
import Post from "@/components/elements/cards/Post"
import Loader from "@/components/Loader"
import NoDataFound from "@/components/NoDataFound"
import { feed, FeedContext } from "@/context/FeedContext"
import { useContext, useEffect,Fragment } from "react"

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

  useEffect(() => {
    // Your existing useEffect logic here

    return () => {
      // Cleanup function to destroy ad slots
      posts.forEach((_, index) => {
        if ((index + 1) % 4 === 0) {
          const adSlotId = `feed-ad-${index}`;
          const adSlot = window.googletag.pubads().getSlots().find(slot => slot.getSlotElementId() === adSlotId);
          if (adSlot) {
            window.googletag.destroySlots([adSlot]);
          }
        }
      });
    };
  }, [page, loadings.getPost, posts]);
  
  if (loadings.getPost && !posts.length)
    return <Loader className={'mt-5'} />

  return (
    <div className="">
      {
        posts.length ?
          posts.map((i, index) => (
            <Fragment key={index}>
            <Post post={i} />
          {(index + 1) % 4 === 0 && <div className="border border-red-400 max-w-[100%] overflow-hidden mt-5"><FooterAdComponent divid={`feed-ad-${index}`}/></div>}
          </Fragment>
          ))
          : <NoDataFound className={'mt-5'} />
      }
    </div>
  )
}
