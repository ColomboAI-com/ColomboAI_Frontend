import ProfileRenderFeed from "./ProfileRenderFeed";
import VideoCard from "./cards/VideoCard";

const Video = ({username}) => {
  return (
    <>
    <div className="border-y-2 py-4 border-gray-300">
      <ProfileRenderFeed username={username} filter={'video'} />
    </div>
      {/* <div className="grid grid-cols-3 overflow-auto border-brandprimary border-2 bg-gray-700">
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
        <VideoCard/>
      </div> */}
    </>
  )
}

export default Video;