"use client";
import FooterAdComponent from "@/components/ads/Ad";
import Post from "@/components/elements/cards/Post";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { feed, FeedContext } from "@/context/FeedContext";
import { useContext, useEffect, Fragment, use } from "react";
import { getCookie } from "@/utlils/cookies";
import { UserProfileContext } from "@/context/UserProfileContext";

export default function RenderFeed({ filter }) {
  const { posts, getPosts, loadings, page, resetFeedValues } = useContext(FeedContext);

  const { getUserDetails } = useContext(UserProfileContext);

  const userName = getCookie("username");

  useEffect(() => {
    getPosts(filter);
    return () => resetFeedValues();
  }, [filter]);

  useEffect(() => {
    getUserDetails(userName);
    return () => resetFeedValues();
  }, [userName]);
  // const handleFeedScroll = () => {
  //   const feedSection = document.getElementById('feed_section')
  //   if (
  //     feedSection && !loadings.getPost &&
  //     Math.ceil(feedSection.scrollTop + feedSection.clientHeight) === feedSection.scrollHeight
  //   ) getPosts(filter, page)
  // }

  // useEffect(() => {
  //   const feedSection = document.getElementById('feed_section')
  //   feedSection?.addEventListener('scroll', handleFeedScroll)
  //   return () => { feedSection?.removeEventListener('scroll', handleFeedScroll) }
  // }, [page, loadings.getPost])

  useEffect(() => {
    // Your existing useEffect logic here

    return () => {
      // Cleanup function to destroy ad slots
      posts.forEach((_, index) => {
        if ((index + 1) % 4 === 0) {
          const adSlotId = `feed-ad-${index}`;
          const adSlot = window.googletag
            .pubads()
            .getSlots()
            .find((slot) => slot.getSlotElementId() === adSlotId);
          if (adSlot) {
            window.googletag.destroySlots([adSlot]);
          }
        }
      });
    };
  }, [page, loadings.getPost, posts]);

  if (loadings.getPost && !posts.length) return <Loader className={"mt-5"} />;

  return (
    <div className="sm:px-0 md:px-0">
      {posts.length ? (
        posts.map((i, index) => (
          <Fragment key={index}>
            <Post post={i} />
            {(index + 1) % 4 === 0 && (
              // <div className="border border-red-400 max-w-[100%] overflow-hidden mt-5">
              //   <FooterAdComponent divid={`feed-ad-${index}`}/>
              // </div>
              <div className="overflow-x-hidden border-[1px] border-brandprimary rounded-[10px] mt-5">
                <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between px-[16px] py-[12px]">
                  Sponsored Ad
                </div>
                <div className=" max-w-[100%] overflow-hidden ">
                  <FooterAdComponent divid={`feed-ad-${index}`} />
                </div>
              </div>
            )}
          </Fragment>
        ))
      ) : (
        <NoDataFound className={"mt-5"} />
      )}
    </div>
  );
}
