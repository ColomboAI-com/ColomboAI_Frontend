"use client";

import Slider from "react-slick";
import Sponsored from "../elements/cards/Sponsored";
import Events from "../elements/cards/Events";
import Advertisement from "../elements/cards/Advertisement";
import Trendings from "../elements/sliders/Trendings";
import SideTopAdComponent from "../ads/SideTopAd";
import SideAdComponent from "../ads/SideAd";

var trending = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.5,
  slidesToScroll: 1,
  gutterSpace: 16,
  responsive: [
    {
      breakpoint: 1200,
      setting: {
        slidesToShow: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 1000,
      setting: {
        slidesToShow: 2,
        arrows: false,
      },
    },
    {
      breakpoint: 650,
      setting: {
        slidesToShow: 2,
        arrows: false,
      },
    },
  ],
};

const RightSidebar = () => {
  return (
    <div className="w-[100%] h-full overflow-y-scroll">  {/* This ensures the sidebar is scrollable */}
      <div className="px-[22px]">
        <div className="">
          <h5 className="text-[19px] font-sans text-[#333333] font-[700]">
            Trending Vibes
            {/* <span className="text-[#E3E3E3]">(Sponsored Vibes)</span> */}
          </h5>
        </div>
      </div>
      <Trendings />
      <div className="xl:border-0 xl:rounded-none xl:mt-0 overflow-x-hidden border-[1px] border-brandprimary rounded-[10px] mt-5">
        <div className="xl:hidden flex lg:flex-row md:flex-row flex-col items-center justify-between px-[16px] py-[12px]">
          Sponsored Ad
        </div>
        <div className="px-[18px] overflow-hidden flex flex-col items-center">
          <SideTopAdComponent divid="maindsidetop" />
          {/* <SideAdComponent divid="mainsidemid" /> */}
          <SideTopAdComponent divid="mainsidebottom" />
          {/* <Sponsored/>
                <Events/>
                <Advertisement/> */}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
