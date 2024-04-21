/* eslint-disable @next/next/no-img-element */
const Sponsored = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px] ml-[15px]">
            <div className="flex items-center justify-between px-[10px] py-[12px]">
                <div className="flex items-center">
                <img src="/images/home/add-logo.png" className="w-[30px]" />
                <div>
                    <p className="pl-[4px] text-[#333333] text-[14px] font-sans">
                    dior
                    </p>
                    <p className="pl-[4px] text-[#D1D1D1] text-[8px] font-sans">
                    Sponsored
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-4">
                <img src="/images/home/more_horiz.png" />
                </div>
            </div>
            <img src="/images/home/add-image.png" alt="sponsored_image" className="w-full" />
            <div className="px-[10px] py-[12px]">
                <p className="text-[#333333] text-[12px] font-sans font-[700]">
                Dior Official
                </p>
                <p className="text-[#646464] text-[12px] font-sans font-[450]">
                Inspired by Christian Dior&apos;s superstitions, Lucky
                whispers the tale of his devotion to the lily-of-the-valley,
                his lucky flower
                </p>
            </div>
        </div>
    );
}

export default Sponsored;