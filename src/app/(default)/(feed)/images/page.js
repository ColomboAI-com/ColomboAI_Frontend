'use client';

import RenderFeed from "@/components/feed/post/RenderFeed"
import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import Image from "next/image"
import comment_x_button from "../../../../../public/images/icons/comment_x_button.svg"

export default function Images() {
  const { popupImage } = useContext(GlobalContext);
  const { setPopupImage } = useContext(GlobalContext);
  return (
    <div className="flex justify-center">
    <div className="sm:mx-[0rem] md:mx-[2.5rem] xl:mx-[0rem]  sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
      {popupImage != "" && <div className="z-[200] fixed top-0 left-0 right-0 bottom-0 bg-gray-100 w-full h-[40rem]">
          <Image src={comment_x_button} onClick={e => setPopupImage("")} alt="colombo"  className="absolute top-2 right-2 cursor-pointer" />
          <img src={popupImage} alt="post_image" className="w-full h-full aspect-video object-contain" />
        </div>}
      <RenderFeed filter={'image'} />
    </div>
    </div>
  )
}
