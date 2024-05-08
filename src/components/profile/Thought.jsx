import RenderFeed from "../feed/post/RenderFeed"
import ProfileRenderFeed from "./ProfileRenderFeed";

const Thought = ({username}) => {
  return (
    <>
      <ProfileRenderFeed username={username} filter={'thought'} />
    </>
  )
}

export default Thought;