import { useContext } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import ReactPlayer from "react-player";

export default function VideoBlock({ video = ['https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv'] }) {
  const { setPopupVideo } = useContext(GlobalContext);
  return (
    <div onClick={e => setPopupVideo(video[0])} id="video" className="sm:col-span-3">
      <div className="object-cover md:h-[30rem] sm:h-[30rem]">
        {typeof(video) === "object" ? video.map((src) => <ReactPlayer url={src} />) : <ReactPlayer urlc={video} />}
      </div>
    </div>
  )
}

function Video({ src }) {
  return (
    <ReactPlayer className="inset-0 object-cover w-full h-full" url={src} controls={true} />
  )
} 
