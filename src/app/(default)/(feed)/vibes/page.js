'use client'
import Post from "@/components/elements/cards/Post"
import Loader from "@/components/Loader"
import { feed } from "@/context/FeedContext"

const Vibes = () => {

  const { loadings, posts } = feed()

  return (
    <div>
      {
        loadings.getPost ? <Loader /> :
          posts?.map((i, index) =>
            <Post post={i} key={index} />
          )
      }
    </div>
  )
}

export default Vibes
