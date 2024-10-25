/* eslint-disable @next/next/no-img-element */
import { useContext } from "react"
import { GlobalContext } from "@/context/GlobalContext"

export default function ImageBlock({ image = ['/images/home/feed-banner-img.png'] }) {
  const { setPopupImage } = useContext(GlobalContext);
  return (
    <div onClick={e => setPopupImage(image[0])} className={`flex ${image[0] ? `md:h-[30rem] sm:h-[30rem]` : `h-[0rem]`}`}>
      {typeof(image) === "object" ? image.map((src) => <Img src={src} />) : <Img src={image}/> }
    </div>
  )
}


function Img({ src }) {
  return (
     <img src={src} alt="post_image" className="inset-0 w-full h-full object-cover bg-white" />
  )
}