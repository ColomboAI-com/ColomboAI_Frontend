/* eslint-disable @next/next/no-img-element */
export default function ImageBlock({ image = ['/images/home/feed-banner-img.png'] }) {
  return (
    <div className="flex md:h-[24rem] sm:h-[10rem]">
      {typeof(image) === "object" ? image.map((src) => <Img src={src} />) : <Img src={image}/> }
    </div>
  )
}

function Img({ src }) {
  return (
     <img src={src} alt="post_image" className="w-full h-full aspect-video object-contain bg-gray-100" />
  )
}
