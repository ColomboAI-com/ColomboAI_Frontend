const VideoPost = () => {
    return (
        <div className="border-[1px] border-brandprimary rounded-[10px]">
            <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
            <div className="flex items-center">
                <img src="/images/home/avtar-img.png" alt="user_avatar" className="w-[42px]" />
                <p className="pl-[17px] c">acch._.hhsn</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="font-sans text-sidebarlabel tex-[12px]">
                2 mins ago
                </p>
                <img src="/images/home/more_horiz.png" alt="more_option_image" />
            </div>
            </div>
            {/* Video embed */}
            <div id="video" className="sm:col-span-3 h-min">
                <div className="aspect-w-16 aspect-h-9 ">
                    <iframe className="absolute inset-0 w-full h-full" src="https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>

            <div className="pl-[37px] pt-[10px] pr-[41px] pb-[17px]">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-[19px]">
                <div className="flex items-center gap-4">
                    <img src="/images/home/wishlist.png" alt="like_button_image" />
                    <p className="text-sidebarlabel font-sans text-[14px]">121</p>
                </div>
                <div className="flex items-center gap-4">
                    <img src="/images/home/Chat.png" alt="comment_image" />
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
            <div className="flex items-center gap-4">
                <p className="text-[#333333] tex-[16px] font-sans font-[700]">
                Anna
                </p>
                <p className="text-[#515151] tex-[16px] font-sans font-[450]">
                Most beautiful view of my trip
                </p>
            </div>
            </div>
        </div>
    );
}

export default VideoPost;