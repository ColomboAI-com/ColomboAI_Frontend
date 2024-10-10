"use client"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Stories from "@/components/elements/sliders/Stories"
import Sugeested from "@/components/elements/sliders/Sugeested"
import LikeThis from "@/components/elements/sliders/LikeThis"
import SectionHeading from "@/components/elements/SectionHeading"
import RenderFeed from "@/components/feed/post/RenderFeed"
import CommentSection from "@/components/comment/CommentSection"
import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import Image from "next/image"
import comment_x_button from "../../../../../public/images/icons/comment_x_button.svg"

const Feed = () => {
  const { popupImage } = useContext(GlobalContext)
  const { setPopupImage } = useContext(GlobalContext)
  const { popupVideo } = useContext(GlobalContext);
  const { setPopupVideo } = useContext(GlobalContext);
  return (
    <>
      <div className="xl:mx-[0rem] md:mx-[2rem] sm:mx-[0rem] relative">
        {popupImage != "" && <div className="z-[200] fixed top-0 left-0 right-0 bottom-0 bg-gray-100 w-full h-[40rem]">
          <Image src={comment_x_button} onClick={e => setPopupImage("")} alt="colombo"  className="absolute top-2 right-2 cursor-pointer" />
          <img src={popupImage} alt="post_image" className="w-full h-full aspect-video object-contain" />
        </div>}
        {popupVideo != "" && <div className="z-[200] fixed top-0 left-0 right-0 bottom-0 bg-gray-100 w-full h-[40rem]">
          <Image src={comment_x_button} onClick={e => setPopupVideo("")} alt="colombo"  className="absolute z-[210] top-2 right-2 cursor-pointer" />
          <video src={popupVideo} controls className="w-full h-full object-contain" />
        </div>}
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
