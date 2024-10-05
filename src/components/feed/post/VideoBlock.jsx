export default function VideoBlock({ video = ['https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv'] }) {
  return (
    <div id="video" className="sm:col-span-3 h-min">
      <div className="aspect-w-16 aspect-h-9">
        {typeof(video) === "object" ? video.map((src) => <Video src={src} />) : <Video src={video} />}
      </div>
    </div>
  )
}

function Video({ src }) {
  return (
    <video className="inset-0 w-full h-full" src={src} controls>Your browser does not support the video tag.</video>
  )
} 
