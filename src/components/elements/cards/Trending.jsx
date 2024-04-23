/* eslint-disable @next/next/no-img-element */
const Trending = () => {
    return (
        // <div className="bg-[url('/images/home/reel-img.svg')] relative h-[220px] bg-cover ml-[5px] mr-[5px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
        //     <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
        //     <div className="flex items-center pl-[9px] absolute bottom-2">
        //     <img src="/images/home/play-icon.svg" />
        //     <h6 className="text-[14px] font-[450px] font-sans text-white">
        //         154k
        //     </h6>
        //     </div>
        // </div>

        // <div className="bg-[url('/images/home/reel-img.svg')] relative h-[220px] bg-contain mx-2 bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
        //     <img className=" w-full  " src="/images/home/reel-img.svg" />
        //     <div className="h-full rounded-[10px]  bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
        //     <div className="flex items-center pl-[9px] absolute bottom-2">
        //     <img src="/images/home/play-icon.svg" />
        //     <h6 className="text-[14px] font-[450px] font-sans text-white">
        //         154k
        //     </h6>
        //     </div>
        // </div>

        <div className="relative max-w-xl mx-2 mt-2 border-[0.25px] border-brandprimary rounded-lg shadow-[1px_1px_2px_0px_#0000004D">
            <img className="h- w-full object-cover rounded-l" src="/images/home/reel-img.svg" alt="Random image"/>
            <div className="absolute inset-0 rounded-l  bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
            <div className="flex items-center pl-2 absolute bottom-2">
            <img src="/images/home/play-icon.svg" alt="play_icon" />
            <h6 className="text-[14px] font-[450px] pl-[1px] font-sans text-white">
                154k
            </h6>
            </div>
            
        </div>
    );
}

export default Trending;