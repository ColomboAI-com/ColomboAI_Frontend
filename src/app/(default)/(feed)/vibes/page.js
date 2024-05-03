/* eslint-disable @next/next/no-img-element */
import { GenAiIcon, VibesCommentIcon, VibesLikesIcon, VibesRepostIcon, VibesSaveIcon, VibesShareIcon, VibesViewIcon } from '@/components/Icons';
import RenderFeed from '@/components/feed/post/RenderFeed'
import { IoIosMusicalNotes } from "react-icons/io";

export default function Vibes() {
  return (
    <div className='border- border-green-400 h-[calc(100vh_-_380px)] md:h-[calc(100vh_-_247px)] max-h-[calc(100vh_-_380px)] md:max-h-[calc(100vh_-_247px)] mx-[-24px] md:mx-[-40px] lg:mx-[-80px] text-white font-sans '>
      <div className=' flex items-center justify-center object-contain w-full bg-black '>
        {/* Main Content */}
        <div className=" relative border- border-green-400 max-h-[calc(100vh_-_380px)] md:max-h-[calc(100vh_-_246px)] aspect-[9/16]">
          <img src={`/images/home/vibes.png`} className=' w-full h-full' alt="vibes_content" />
          <div className=' absolute bottom-0 left-0'>
            <div className='flex items-center gap-2  '>
              <img src="/images/home/profile-img.png" alt="profile-image" className="w-[36px] rounded-full" />
              <p>@tanaka_haruto</p>
            </div>
            <div className='flex flex-wrap mx-4'>
              <p>Dancing through the moments that make our hearts sing. ✨ #LetTheMusicMoveYou</p>
              <div className='flex gap-2 my-1'>
                <IoIosMusicalNotes className='w-[20px] h-[20px]' />
                <p>Madness - by Moonbin and Sanha</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side Options */}
        <div className='relative w-[45px] flex justify-center text-[12px] ml-4 h-[calc(100vh_-_380px)] md:h-[calc(100vh_-_246px)]'>
          <div className=' absolute bottom-0 lg:bottom-8 flex flex-col gap-[5px] md:gap-4 justify-center items-center text-[12px]'>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesViewIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesLikesIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesCommentIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesRepostIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesShareIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='flex flex-col items-center gap-[2px] md:gap-1'>
              <VibesSaveIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
            <div className='bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B] p-[4px] rounded-full'>
              <GenAiIcon w={30} h={30} fill={"#ffffff"} />
            </div>
            <div>
              <img src="/images/vibes/vibes_music.jpeg" alt="vibes-music" className="w-[41px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
