/* eslint-disable @next/next/no-img-element */
"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { VibeContext } from "@/context/VibeContext";
import Vibe from "@/components/feed/vibes/Vibe";
import Slider from "react-slick";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useSwipeable } from "react-swipeable";

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
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export default function Vibes({ filter }) {
  const sliderRef = useRef(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  const handleLoadMore = () => {
    if (!loadings.getVibe) {
      getVibes(filter, page + 1);
    }
  };

  const handleSlideChange = (currentSlide) => {
    const totalItems = vibes.length;
    const isAtEnd = currentSlide === totalItems - 1;
    if (isAtEnd) {
      handleLoadMore();
    }
  };

  // Function to update screen size state
  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const { vibes, getVibes, page, loadings, resetFeedValues } = useContext(VibeContext);

  useEffect(() => {
    getVibes();
    return () => {
      resetFeedValues();
    };
  }, []);

  return (
    <>
      {isSmallScreen ? (
        <div {...swipeHandlers} className="w-full sm:h-[calc(100vh-0px)] hide-scrollbar md:hidden bg-black">
          <Slider ref={sliderRef} {...settings}>
            {vibes.map((vibe, index) => (
              <Vibe vibe={vibe} key={vibe._id} index={index} />
            ))}
          </Slider>
        </div>
      ) : (
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
            afterChange={(previousSlide, { currentSlide }) => handleSlideChange(currentSlide)}
          >
            {vibes.map((vibe, index) => (
              <Vibe vibe={vibe} key={vibe._id} index={index} />
            ))}
          </Carousel>
        </div>
      )}
    </>
  );
}
