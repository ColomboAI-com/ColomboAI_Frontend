export default function Home() {
  return (
    <><header className="shadow-[0px_2px_4px_0px_#0000001A]">
      <div className="">
        <img src="/images/home/ColomboAI-logo.png" className="mx-auto"/>
      </div>
    </header>
    <div className="flex">
      <div className="w-[88px] border-r-[1px] border-brandprimary">
        <div className="mb-[46px] mt-[20px]">
          <img src="/images/home/profile-img.png" className="w-[58px] mx-auto" />
        </div>
        <div className="mb-12">
          <img src="/images/home/gen-ai.png" className="w-[29px] mx-auto"/>
          <p className="text-sidebarlabel text-center tex-[14px] mt-3 font-sans">Gen AI</p>
        </div>
        <div className="mb-12">
          <img src="/images/home/task-bot.png" className="w-[29px] mx-auto"/>
          <p className="text-sidebarlabel text-center tex-[14px] mt-3 font-sans">Task bot</p>
        </div>
        <div className="mb-12">
          <img src="/images/home/feed.png" className="w-[29px] mx-auto"/>
          <p className="text-sidebarlabel text-center tex-[14px] mt-3 font-sans">Feed</p>
        </div>
        <div className="mb-12">
          <img src="/images/home/Cart.png" className="w-[29px] mx-auto"/>
          <p className="text-sidebarlabel text-center tex-[14px] mt-3 font-sans">Shop</p>
        </div>
        <div>
          <img src="/images/home/news.png" className="w-[29px] mx-auto"/>
          <p className="text-sidebarlabel text-center tex-[14px] mt-3 font-sans">News</p>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between shadow-[0px_2px_4px_0px_#0000001A] pt-9 pb-7">
          <ul className="flex items-center ml-[86px]">
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Feed</a></li>
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Video</a></li>
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Vibes</a></li>
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Thoughts</a></li>
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Images</a></li>
            <li className="mr-[75px]"><a className="text-[20px] text-sidebarlabel font-sans">Explore</a></li>
            <li><a className="text-[20px] text-sidebarlabel font-sans">Profile</a></li>
          </ul>
          <div className="flex items-center">
            <img src="/images/home/Search.png" className="w-[26px] mr-[35px]"/>
            <img src="/images/home/plus-circle.png" className="w-[26px] mr-[35px]"/>
            <img src="/images/home/Notification-icon.png" className="w-[26px] mr-[35px]"/>
            <img src="/images/home/icon _chat_bubble.png" className="w-[26px] mr-[35px]"/>
          </div>
        </div>
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
      </div>
    </div></>

  )
}
