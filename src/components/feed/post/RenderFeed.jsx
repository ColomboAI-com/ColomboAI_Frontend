"use client";
import FooterAdComponent from "@/components/ads/Ad";
import Post from "@/components/elements/cards/Post";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { feed, FeedContext } from "@/context/FeedContext";
import { useContext, useEffect, Fragment, useRef } from "react";
import { getCookie } from "@/utlils/cookies";
import { UserProfileContext } from "@/context/UserProfileContext";
import SuggestedVibes from "@/components/layouts/SuggestedVibes";
import LargeAdComponent from "@/components/ads/LargeAd";
import VideoAd from "@/components/ads/VideoAd";

export default function RenderFeed({ filter }) {
  const { posts, getPosts, loadings, page, resetFeedValues } = useContext(FeedContext);

  const { getUserDetails } = useContext(UserProfileContext);

  // const [isFetchingMore, setIsFetchingMore] = useState(false);
  // This reference is attached to the 'Load More' button
  const loadMoreRef = useRef(null);

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
  //   const feedSection = document.getElementById("feed_section");
  //   console.log("SCROLL TRIGGERD");
  //   if (
  //     feedSection &&
  //     !loadings.getPost &&
  //     Math.ceil(feedSection.scrollTop + feedSection.clientHeight) === feedSection.scrollHeight
  //   )
  //     getPosts(filter, page);
  // };

  // useEffect(() => {
  //   const feedSection = document.getElementById("feed_section");
  //   console.log("POST INFY", feedSection);
  //   feedSection?.addEventListener("scroll", handleFeedScroll);
  //   return () => {
  //     feedSection?.removeEventListener("scroll", handleFeedScroll);
  //   };
  // }, [page, loadings.getPost]);

  // INFINTIE SCROLLING NEW CODE - START
  const handleLoadMore = () => {
    if (!loadings.getPost) {
      getPosts(filter, page);
    }
  };

  useEffect(() => {
    // Intersection Observer to automatically call handleLoadMore when the button is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          handleLoadMore(); // Automatically trigger the function when the button is visible
        }
      },
      {
        root: null, // Uses the browser viewport as the default
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the button is visible
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    // Cleanup the observer when the component unmounts or if button changes
    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [page, loadings.getPost]);

  // INFINTIE SCROLLING NEW CODE - END

  useEffect(() => {
    // Your existing useEffect logic here

    // const feedSection = document.getElementById("posts_container_infy_scroll");

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

  // // Function to handle the ad click
  // const handleAdClick = (index) => {
  //   // Collect the previous 4 postIds when the ad is clicked
  //   const postIds = posts.slice(index - 4, index).map((post) => post._id);
  //   const adRevenue = 100; // TODO - adRevenue how to calc?

  //   generateWallet(postIds, adRevenue);
  // };

  return (
    <div className="sm:px-0 md:px-0" id="posts_container_infy_scroll">
      {posts.length ? (
        posts.map((i, index) => (
          <Fragment key={index}>
            <Post post={i} index={index} />
            {(index + 1) % 4 === 0 && (
              <>
                {Math.floor((index + 1) / 4) % 2 === 0 ? (
                  // Render VideoAd for even cycles
                  <div className="overflow-x-hidden rounded-[10px] mt-5">
                    <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between py-[12px]">
                      <VideoAd />
                    </div>
                  </div>
                ) : (
                  // Render LargeAdComponent for odd cycles
                  <div
                    className="overflow-x-hidden rounded-[10px] mt-5"
                    onClick={() => handleAdClick(index + 1)}
                  >
                    <div className="flex lg:flex-row md:flex-row flex-col items-center justify-between py-[12px]">
                      <LargeAdComponent divid={`feed-ad-${index}`} />
                    </div>
                  </div>
                )}
              </>
            )}
          </Fragment>
        ))
      ) : (
        <NoDataFound className={"mt-5"} />
      )}
      {/* Invisible Load More Button */}
      <div ref={loadMoreRef} style={{ height: "1px" }}></div>
      <div style={{ color: "transparent" }}>Hello</div>
      {/* KEEP THIS DIV WITH HELLO SO THAT THE BUTTON APPEARS IN THE WINDOW FOR INFINITE SCROLL TO WORK */}
    </div>
  );
}
