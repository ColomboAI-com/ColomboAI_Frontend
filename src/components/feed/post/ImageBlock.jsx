/* eslint-disable @next/next/no-img-element */
export default function ImageBlock({ image = '/images/home/feed-banner-img.png' }) {
  return (
    <div className="min-h-[466px] max-h-[466px]">
      <img src={image} alt="post_image" className="w-full h-full aspect-video object-fill bg-gray-100" />
    </div>
  )
}
