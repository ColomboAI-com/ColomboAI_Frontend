import RenderFeed from "../feed/post/RenderFeed"
import ProfileRenderFeed from "./ProfileRenderFeed";

const Thought = () => {
  return (
    <>
      <ProfileRenderFeed filter={'thought'} />
    </>
  )
}

export default Thought;