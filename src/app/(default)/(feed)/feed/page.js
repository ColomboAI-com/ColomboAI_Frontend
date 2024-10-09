"use client"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Stories from "@/components/elements/sliders/Stories"
import Sugeested from "@/components/elements/sliders/Sugeested"
import LikeThis from "@/components/elements/sliders/LikeThis"
import SectionHeading from "@/components/elements/SectionHeading"
import RenderFeed from "@/components/feed/post/RenderFeed"
import CommentSection from "@/components/comment/CommentSection"

const Feed = () => {

  return (
    <>
      <div className="xl:mx-[0rem] md:mx-[2rem] sm:mx-[1rem]">
        <Stories />

        {/* {loadings.getPost ? <Loader /> :
         posts?.map((i, index) => <Post post={i} key={index} />
         )}
       <SectionHeading title="Suggested Vibes For You" />
       <Sugeested />
       <SectionHeading title="You might like these" />
       <LikeThis /> */}

        <RenderFeed />
        {/* <SectionHeading title="Suggested Vibes For You" /> */}
        {/* <Sugeested /> */}
        {/* <SectionHeading title="You might like these" /> */}
        {/* <LikeThis /> */}

      </div>
    </>
  )
}

export default Feed
