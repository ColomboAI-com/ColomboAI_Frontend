const PostCard = () => {
    return (
        <div className="w-[1100px] pl-[86px] pr-[147px]">
            <div className="border-[1px] border-brandprimary rounded-[10px]">
            <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
                <div className="flex items-center">
                <img src="/images/home/avtar-img.png" className="w-[42px]" />
                <p className="pl-[17px] c">acch._.hhsn</p>
                </div>
                <div className="flex items-center">
                <p className="font-sans text-sidebarlabel tex-[12px]">2 mins ago</p>
                <img src="/images/home/more_horiz.png" />
                </div>
            </div>
            <img src="/images/home/feed-banner-img.png" className="w-full" />
            </div>
        </div>
    );
}

export default PostCard;