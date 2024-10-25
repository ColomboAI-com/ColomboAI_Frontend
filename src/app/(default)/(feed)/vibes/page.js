/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";
import Slider from "react-slick";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useSwipeable } from 'react-swipeable';

var settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  vertical: true,
  verticalSwiping: false,
  swipe: false,
  draggable: false,
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 
  }
};

export default function Vibes({ filter }) {
  const sliderRef = useRef(null);
  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (sliderRef.current) sliderRef.current.slickNext();
    },
    onSwipedDown: () => {
      if (sliderRef.current) sliderRef.current.slickPrev();
    },
    onSwipedRight: () => {},
    onSwipedLeft: () => {},
    preventDefaultTouchmoveEvent: true, 
    trackTouch: true,
  });
  const { vibes, getVibes, fetchSongById } = useContext(VibeContext);
  const [song, setSong] = useState({});
  const [vibe, setVibe] = useState({});

  useEffect(() => {
    getVibes();
  }, []);

  return (
    <>
      <div className="w-full md:h-[37rem] lg:h-[32.5rem] xl:h-[35rem] sm:hidden md:block bg-black">
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          autoPlay={false}
          infinite={false}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="w-full md:h-[37rem] lg:h-[32.5rem] xl:h-[35rem]" 
        >
          {vibes.map((vibe) => (
            <Vibe vibe={vibe} key={vibe._id}/>
          ))}
        </Carousel>
      </div>
      <div {...swipeHandlers} className="w-full sm:h-[calc(100vh-70px)] hide-scrollbar md:hidden bg-black">
        <Slider ref={sliderRef} {...settings}>
          {vibes.map((vibe) => (
            <Vibe vibe={vibe} key={vibe._id} />
          ))}
        </Slider>
      </div>
    </>
  );
}