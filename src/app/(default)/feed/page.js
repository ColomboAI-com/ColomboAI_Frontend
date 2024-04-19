'use client';

import React from "react";
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1366,
            setting:{
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1000,
            setting:{
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 650,
            setting:{
                slidesToShow: 2,
            }
        }
    ]
  };

var sugeested = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1920,
            setting:{
                slidesToShow: 7,
            }
        },
        {
            breakpoint: 1366,
            setting:{
                slidesToShow: 4,
            }
        },
        {
            breakpoint: 1000,
            setting:{
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 650,
            setting:{
                slidesToShow: 2,
            }
        }
    ]
  };
  var trending = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    gutterSpace:16,
    responsive: [
        {
            breakpoint: 1920,
            setting:{
                slidesToShow: 3,
                arrows: false,
            }
        },
        {
            breakpoint: 1366,
            setting:{
                slidesToShow: 3,
                arrows: false,
            }
        },
        {
            breakpoint: 1000,
            setting:{
                slidesToShow: 2,
                arrows: false,
            }
        },
        {
            breakpoint: 650,
            setting:{
                slidesToShow: 2,
                arrows: false,
            }
        }
    ]
  };
const Feed = () => {
    return (
        <div className="flex">
            <div className="w-[70%] px-[82px]">
                <div className="relative pt-[26px] pb-[31px]">
                    <input type="text" placeholder="Ask or create anything..." className="w-full h-[80px] border-[1px] border-brandprimary rounded-[50px] py-[28px] px-[35px] text-[#ACACAC] text-[20px] tracking-[4px] font-sans"></input>
                    <img src="/images/home/search-icon.png" className="absolute top-[52px] right-[35px]" />
                </div>
                
                <div className="mb-8">
                    <Slider {...settings}>
                        <div className="bg-[url('/images/home/create-story.svg')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-14 px-6">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/add-new-story.svg" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center relative top-9">Create New Story</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/story-img.png')] relative h-[167px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="absolute bottom-5 px-8">
                                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                                    <img src="/images/home/story-profile-img.png" />
                                </div>
                                <h6 className="text-[12px] font-[450px] font-sans text-white text-center">@Anna_xvz</h6>
                            </div>
                        </div>
                    </Slider>
                </div>    
                
                <div className="border-[1px] border-brandprimary rounded-[10px]">
                    <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
                        <div className="flex items-center">
                            <img src="/images/home/avtar-img.png" className="w-[42px]" />
                            <p className="pl-[17px] c">acch._.hhsn</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-sans text-sidebarlabel tex-[12px]">2 mins ago</p>
                            <img src="/images/home/more_horiz.png" />
                        </div>
                    </div>
                    <img src="/images/home/feed-banner-img.png" className="w-full" />
                    <div className="pl-[37px] pt-[10px] pr-[41px] pb-[17px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[19px]">
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/wishlist.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">121</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/Chat.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">88</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/refresh.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">23</p>
                                </div>
                                <div className="flex items-center">
                                    <img src="/images/home/Magic-pen.png" />
                                </div>
                            </div>
                            <div className="flex items-center gap-[19px]">
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/Arrow.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">10</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/bookmark.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">40</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="text-[#333333] tex-[16px] font-sans font-[700]">Anna</p>
                            <p className="text-[#515151] tex-[16px] font-sans font-[450]">Most beautiful view of my trip</p>
                        </div>
                    </div>
                </div>

                {/*suggested vibes*/}
                <div className="mt-2">
                    <h5 className="text-[24px] font-sans text-[#333333] font-[700]">Suggested Vibes For You</h5>
                </div>
                <div className="mt-4 mb-4">
                    <Slider {...sugeested}>
                        
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[100px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        
                    </Slider>
                </div> 

                <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
                    <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px]">
                        <div className="flex items-center">
                            <img src="/images/home/avtar-img.png" className="w-[42px]" />
                            <p className="pl-[17px] c">acch._.hhsn</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p className="font-sans text-sidebarlabel tex-[12px]">2 mins ago</p>
                            <img src="/images/home/more_horiz.png" />
                        </div>
                    </div>
                    <div className="py-[27px] pl-[37px] pr-[41px]">
                        <p className="text-[#515151] tex-[24px] font-sans font-[450]">Nature reminds us of life's simple joys and the beauty in every moment. Grateful for moments of peace and wonder amidst the chaos.</p>
                        <p className="text-brandprimary mt-4 font-sans">#NatureInspires</p>
                    </div>
                    <div className="pl-[37px] pt-[10px] pr-[41px] pb-[17px]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-[19px]">
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/wishlist.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">121</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/Chat.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">88</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/refresh.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">23</p>
                                </div>
                                <div className="flex items-center">
                                    <img src="/images/home/Magic-pen.png" />
                                </div>
                            </div>
                            <div className="flex items-center gap-[19px]">
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/Arrow.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">10</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/bookmark.png" />
                                    <p className="text-sidebarlabel font-sans text-[14px]">40</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            <div className="w-[30%] mt-10">
                <div className="pr-[35px]">
                    {/*suggested vibes*/}
                    <div className="mt-2">
                        <h5 className="text-[19px] font-sans text-[#333333] font-[700]">Trending <span className="text-[#E3E3E3]">(Sponsored Vibes)</span></h5>
                    </div>
                </div>
                <div className="mt-4 mb-4">
                    <Slider arrows={false} {...trending}>
                        
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        <div className="bg-[url('/images/home/reel-img.svg')] relative h-[240px] !w-[145px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D]">
                            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
                            <div className="flex items-center pl-[9px] absolute bottom-2">
                                <img src="/images/home/play-icon.svg" />
                                <h6 className="text-[14px] font-[450px] font-sans text-white">154k</h6>
                            </div>
                        </div>
                        
                    </Slider>
                </div> 
                <div className="pr-[35px]">
                    <div className="border-[1px] border-brandprimary rounded-[10px]">
                        <div className="flex items-center justify-between px-[10px] py-[12px]">
                            <div className="flex items-center">
                                <img src="/images/home/add-logo.png" className="w-[30px]" />
                                <div>
                                    <p className="pl-[4px] text-[#333333] text-[14px] font-sans">dior</p>
                                    <p className="pl-[4px] text-[#D1D1D1] text-[8px] font-sans">Sponsored</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <img src="/images/home/more_horiz.png" />
                            </div>
                        </div>
                        <img src="/images/home/add-image.png" className="w-full" />
                        <div className="px-[10px] py-[12px]">
                            <p className="text-[#333333] text-[12px] font-sans font-[700]">Dior Official</p>
                            <p className="text-[#646464] text-[12px] font-sans font-[450]">Inspired by Christian Dior’s superstitions, Lucky whispers the tale of his devotion to the lily-of-the-valley, his lucky flower</p>
                        </div>
                    </div>
                    <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
                        <div className="relative">
                            <img src="/images/home/event-img.png" className="w-full" />
                            <div className="absolute top-[18%] pl-8">
                                <div className="flex items-center gap-4">
                                    <img src="/images/home/event-icon.png" />
                                    <p className="text-[#ceadad] font-sans text-[17px]">Events</p>
                                </div>
                                <h5 className="text-[#fff] font-sans text-[24px] pt-6 leading-[24px]">Surburn Event in XYZ ground, New York.</h5>
                                <button className="bg-[#ffffffed] text-[14px] w-[197px] h-[47px] py-[15px] px-[29px] mt-8 rounded-[40px] font-sans text-brandprimary">EXPLORE</button>
                            </div>
                        </div>
                        <div className="flex items-center pl-[30px] pr-[26px] pt-[30px] pb-[40px] gap-10">
                            <div className="flex items-center">
                                <img src="/images/home/event-people1.png" className="w-[30px]" />
                                <img src="/images/home/event-people2.png" className="w-[30px] ml-[-12px]" />
                                <img src="/images/home/event-people3.png" className="w-[30px] ml-[-12px]" />
                            </div>
                            <p className="text-[#788292] font-sans text-[14px]">12k people going to this event on Sunday.</p>
                        </div>
                    </div>

                    <div className="border-[1px] border-brandprimary rounded-[10px] mt-4">
                        <div className="flex items-center justify-between px-[10px] py-[12px]">
                            <div className="flex items-center">
                                <img src="/images/home/coca-cola.svg" className="w-[30px]" />
                                <div>
                                    <p className="pl-[4px] text-[#333333] text-[14px] font-sans">Coca Cola</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <img src="/images/home/more_horiz.png" />
                            </div>
                        </div>
                        <img src="/images/home/add-image.png" className="w-full" />
                        
                    </div>
                </div>
            </div>    
        </div>
    );
}

export default Feed;