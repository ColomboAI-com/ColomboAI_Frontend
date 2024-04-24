import React from 'react'

export default function VideoBlock({ video = 'https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv' }) {
  return (
    <div id="video" className="sm:col-span-3 h-min">
      <div className="aspect-w-16 aspect-h-9 ">
        <iframe className="absolute inset-0 w-full h-full" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
  )
}
