import Image from "next/image"; // Import next/image

const Sponsored = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px]">
            <div className="flex items-center justify-between px-[10px] py-[12px]">
                <div className="flex items-center">
                {/* <img src="/images/home/add-logo.png" className="w-[30px]" /> */}
                <Image src="/images/home/add-logo.png" alt="Sponsor Logo" width={30} height={30} loading="lazy" />
                <div>
                    <p className="pl-[4px] text-[#242424] text-[14px] font-sans font-[700]">
                    dior
                    </p>
                    <p className="pl-[4px] text-[#D1D1D1] text-[10px] font-sans">
                    Sponsored
                    </p>
                </div>
                </div>
                <div className="flex items-center gap-4">
                {/* <img src="/images/home/more_horiz.png" /> */}
                <Image src="/images/home/more_horiz.png" alt="More options" width={24} height={24} loading="lazy" />
                </div>
            </div>
            {/* <img src="/images/home/add-image.png" alt="sponsored_image" className="w-full" /> */}
            <div className="relative w-full h-auto" style={{ aspectRatio: '1.91/1' }}> {/* Common ad aspect ratio, adjust as needed */}
              <Image
                src="/images/home/add-image.png"
                alt="Sponsored image"
                layout="fill"
                objectFit="cover"
                loading="lazy"
                sizes="(max-width: 640px) 50vw, 200px" // Example, adjust based on card size in slider
              />
            </div>
            <div className="px-[10px] py-[12px]">
                <p className="text-[#242424] text-[12px] font-sans font-[700]">
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