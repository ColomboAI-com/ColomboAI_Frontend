import { useContext } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import ReactPlayer from "react-player";

export default function VideoBlock({ video = ['https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv'] }) {
  const { setPopupVideo } = useContext(GlobalContext);
  return (
    <div id="video" className="sm:col-span-3">
      <div className="object-cover md:h-[24rem] sm:h-[30rem]">
        {typeof (video) === "object" ?
          video.map((src) => <ReactPlayer url={src} playing={true} width="100%"
            height="100%" style={{ objectFit: "cover" }} controls={true} />)
          :
          <ReactPlayer url={video} playing={true} width="100%" height="100%" style={{ objectFit: "cover" }}/>
        }
      </div>
    </div>
  )
}

function Video({ src }) {
  return (
    <ReactPlayer className="inset-0 object-cover w-full h-full min-w-full" url={src} controls={true} />
  )
} 
