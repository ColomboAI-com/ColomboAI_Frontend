import ProfileRenderFeed from "./ProfileRenderFeed";
import PostCard from "./cards/PostCard";

const Post = ({username}) => {
  return (
    <>
      <ProfileRenderFeed username={username} filter={'image'} />
      {/* <div className="grid grid-cols-3 overflow-auto max-h-screen border-brandprimary border-2">
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div> */}
    </>
  );
};

export default Post;
