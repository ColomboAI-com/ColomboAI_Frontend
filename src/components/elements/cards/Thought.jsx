/* eslint-disable @next/next/no-img-element */
const Thought = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
            <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
            <div className="flex items-center">
                <img src="/images/home/avtar-img.png" className="w-[42px]" alt="user_avatar" />
                <p className="pl-[17px] c">acch._.hhsn</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="font-sans text-sidebarlabel tex-[12px]">
                2 mins ago
                </p>
                <img src="/images/home/more_horiz.png" alt="more_option_image" />
            </div>
            </div>
            <div className="py-[27px] pl-[37px] pr-[41px]">
            <p className="text-[#515151] tex-[24px] font-sans font-[450]">
                Nature reminds us of life&apos;s simple joys and the beauty in
                every moment. Grateful for moments of peace and wonder amidst the
                chaos.
            </p>
            <p className="text-brandprimary mt-4 font-sans">#NatureInspires</p>
            </div>
            <div className="pl-[37px] pt-[10px] pr-[41px] pb-[17px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[19px]">
                <div className="flex items-center gap-4">
                    <img src="/images/home/wishlist.png" alt="like_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">121</p>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/images/home/Chat.png" alt="comment_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">88</p>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/images/home/refresh.png" alt="repost_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">23</p>
                </div>
                <div className="flex items-center">
                    <img src="/images/home/Magic-pen.png" alt="magic_pen_button_image" />
                </div>
                </div>
                <div className="flex items-center gap-[19px]">
                <div className="flex items-center gap-4">
                    <img src="/images/home/Arrow.png" alt="share_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">10</p>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/images/home/bookmark.png" alt="save_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">40</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Thought;