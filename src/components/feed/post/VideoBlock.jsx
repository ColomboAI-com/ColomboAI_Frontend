import { useContext } from "react"
import { GlobalContext } from "@/context/GlobalContext"

export default function VideoBlock({ video = ['https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv'] }) {
  const { setPopupVideo } = useContext(GlobalContext);
  return (
    <div onClick={e => setPopupVideo(video[0])} id="video" className="sm:col-span-3">
      <div className="object-contain md:h-[24rem] sm:h-[10rem]">
        {typeof(video) === "object" ? video.map((src) => <Video src={src} />) : <Video src={video} />}
      </div>
    </div>
  )
}

function Video({ src }) {
  return (
    <video className="inset-0 object-contain w-full h-full" src={src} controls>Your browser does not support the video tag.</video>
  )
} 
