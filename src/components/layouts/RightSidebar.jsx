"use client";

import Slider from "react-slick";
import Sponsored from "../elements/cards/Sponsored";
import Events from "../elements/cards/Events";
import Advertisement from "../elements/cards/Advertisement";
import Trendings from "../elements/sliders/Trendings";
import { Plus_Jakarta_Sans } from '@next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

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
    <main className={plusJakartaSans.className}>
      <div className="w-[100%]">
        <div className="px-[22px]">
          <div className="">
            <h5 className="text-[19px]  text-[#333333] font-[700]">
              Trending vibes
              {/* <span className="text-[#E3E3E3]">(Sponsored Vibes)</span> */}
            </h5>
          </div>
        </div>
        <Trendings />
        <div className="px-[22px]">
        <img src="/images/home/new_ad.png" alt="sponsored_image" className="w-full pl-1" />
        {/* <img src="/images/home/new_ad2.png" alt="sponsored_image" className="w-full pl-1" /> */}
          {/* <Sponsored /> */}
          <Events />
          <Advertisement />
        </div>
      </div>
    </main>
  );
}

export default RightSidebar;