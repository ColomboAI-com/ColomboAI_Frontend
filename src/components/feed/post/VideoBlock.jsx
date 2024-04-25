export default function VideoBlock({ video = 'https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv' }) {
  return (
    <div id="video" className="sm:col-span-3 h-min">
      <div className="aspect-w-16 aspect-h-9">
        <video className='inset-0 w-full h-full' src={video} controls>
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
