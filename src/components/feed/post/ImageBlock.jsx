/* eslint-disable @next/next/no-img-element */
export default function ImageBlock({ image = '/images/home/feed-banner-img.png' }) {
  return (
    <div className="">
      <img src={image} alt="post_image" className="w-full h-full aspect-video object-contain bg-gray-100" />
    </div>
  )
}
