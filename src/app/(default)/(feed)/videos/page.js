'use client';

import RenderFeed from '@/components/feed/post/RenderFeed'
import { GlobalContext } from "@/context/GlobalContext"
import { useContext } from "react"
import Image from "next/image"
import comment_x_button from "../../../../../public/images/icons/comment_x_button.svg"
import ReactPlayer from 'react-player';

export default function page() {
  const { popupVideo } = useContext(GlobalContext);
  const { setPopupVideo } = useContext(GlobalContext);
  return (
    <div className=" relative flex flex-col mx-auto justify-center sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
      {popupVideo != "" && <div className="z-[200] fixed top-0 left-0 right-0 bottom-0 bg-gray-100 w-full h-[40rem]">
          <Image src={comment_x_button} onClick={e => setPopupVideo("")} alt="colombo"  className="absolute z-[210] top-2 right-2 cursor-pointer" />
          <ReactPlayer url={popupVideo} controls={true} className="w-full h-full object-contain" />
        </div>}
      <RenderFeed filter={'video'} />
    </div>
  )
}
