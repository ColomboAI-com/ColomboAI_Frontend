/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";
import Slider from "react-slick";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

var settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  vertical: true,
  verticalSwiping: true,
};
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

export default function Vibes({ filter }) {
  const { vibes, getVibes, fetchSongById } = useContext(VibeContext);
  const [song, setSong] = useState({});
  const [vibe, setVibe] = useState({});

  useEffect(() => {
    getVibes();
  }, []);

  return (
    <>
      <div className="w-full md:h-[38rem] lg:h-full xl:h-[34.6rem] sm:hidden md:block bg-black"> {/* Ensure full-screen container */}
        <Carousel
          swipeable={false}
          draggable={false}
          showDots={false}
          responsive={responsive}
          ssr={true}
          autoPlay={false}
          infinite={true}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          // containerClass="carousel-container"
          removeArrowOnDeviceType={["mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="w-full h-full" // Full-screen item
        >
          {vibes.map((vibe) => (
            <Vibe vibe={vibe} key={vibe._id} />
          ))}
        </Carousel>
      </div>
      <div className="w-full md:h-[38rem] lg:h-full xl:h-[34.6rem] md:hidden bg-black">
        <Slider {...settings}>
          {vibes.map((vibe) => (
            <Vibe vibe={vibe} key={vibe._id} />
          ))}
        </Slider>
      </div>
    </>
  );
}