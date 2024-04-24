"use client"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Post from "@/components/elements/cards/Post"
import Stories from "@/components/elements/sliders/Stories"
import Sugeested from "@/components/elements/sliders/Sugeested"
import LikeThis from "@/components/elements/sliders/LikeThis"
import SectionHeading from "@/components/elements/SectionHeading"

const Feed = () => {
  return (
    <div>
      <Stories />
      <Post />
      <SectionHeading title="Suggested Vibes For You" />
      <Sugeested />
      <SectionHeading title="You might like these" />
      <LikeThis />
    </div>
  )
}

export default Feed
