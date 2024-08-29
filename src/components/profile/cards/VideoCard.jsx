import { VibesViewIcon } from "@/components/Icons";

const VideoCard = () => {
    return (
        <div className=" relative border-2 border-gray-300 aspect-[9/16] mx-auto bg-gray-700">
          <img src={`/images/home/vibes.png`} className=' w-full h-full' alt="videos" />
          <div className=' absolute bottom-0 left-0'>
            <div className='flex items-center gap-2 border- text-white  '>
              <VibesViewIcon w={30} h={30} fill={"#ffffff"}/>
              <p>121.5k</p>
            </div>
          </div>
        </div>
    );
}

export default VideoCard;