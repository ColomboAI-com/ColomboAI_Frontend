/* eslint-disable @next/next/no-img-element */
const Trending = () => {
    return (
        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[220px] bg-cover ml-[5px] mr-[5px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
            <div className="flex items-center pl-[9px] absolute bottom-2">
            <img src="/images/home/play-icon.svg" alt="play_icon" />
            <h6 className="text-[14px] font-[450px] font-sans text-white">
                154k
            </h6>
            </div>
        </div>
    );
}

export default Trending;