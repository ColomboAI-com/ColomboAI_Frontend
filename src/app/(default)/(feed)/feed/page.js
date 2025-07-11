"use client"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Stories from "@/components/elements/sliders/Stories"
import Sugeested from "@/components/elements/sliders/Sugeested"
import LikeThis from "@/components/elements/sliders/LikeThis"
import SectionHeading from "@/components/elements/SectionHeading"
import RenderFeed from "@/components/feed/post/RenderFeed"
// import CommentSection from "@/components/comment/CommentSection" // CommentSection seems unused here
import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
// import Image from "next/image" // No longer needed for old popup
// import comment_x_button from "../../../../../public/images/icons/comment_x_button.svg" // No longer needed
// import ReactPlayer from "react-player" // No longer needed for old popup
import AdvancedMediaViewer from "@/components/media-viewer/AdvancedMediaViewer" // Import new viewer

const Feed = () => {
  // const { popupImage } = useContext(GlobalContext) // Old state
  // const { setPopupImage } = useContext(GlobalContext) // Old state
  // const { popupVideo } = useContext(GlobalContext); // Old state
  // const { setPopupVideo } = useContext(GlobalContext); // Old state
  const { mediaViewerState, closeMediaViewer } = useContext(GlobalContext);

  return (
    <>
      <div className=" relative flex flex-col mx-auto justify-center sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
        {/* Old popups removed */}
        <Stories />

        <RenderFeed />

      </div>
      <AdvancedMediaViewer
        open={mediaViewerState.open}
        close={closeMediaViewer}
        slides={mediaViewerState.slides}
        index={mediaViewerState.currentIndex}
      />
    </>
  )
}
// Removed commented out code for brevity
// {/* {loadings.getPost ? <Loader /> :
         posts?.map((i, index) => <Post post={i} key={index} />
         )}
       <SectionHeading title="Suggested Vibes For You" />
       <Sugeested />
       <SectionHeading title="You might like these" />
       <LikeThis /> */}
        {/* <div className="flex justify-center"> */}
        <RenderFeed />
        {/* </div> */}
        {/* <SectionHeading title="Suggested Vibes For You" /> */}
        {/* <Sugeested /> */}
        {/* <SectionHeading title="You might like these" /> */}
        {/* <LikeThis /> */}

      </div>
    </>
  )
}

export default Feed
