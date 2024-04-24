import React from 'react'

export default function ImageBlock({ image = '/images/home/feed-banner-img.png' }) {
  return (
    <div>
      <img src={image} alt="post_image" className="w-full" />
    </div>
  )
}
