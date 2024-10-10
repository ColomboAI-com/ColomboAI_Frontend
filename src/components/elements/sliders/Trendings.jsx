import Slider from "react-slick";
import Trending from "../cards/Trending";
import { useState, useEffect } from "react";



const Trendings = () => {
  const [slidesToShow, setSlidesToShow] = useState(3); // Default to desktop value

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSlidesToShow(3.5);
      } else if (width <= 1190) {
        setSlidesToShow(5);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow(); // Check on initial render
    window.addEventListener('resize', updateSlidesToShow); // Check when window is resized

    return () => {
      window.removeEventListener('resize', updateSlidesToShow); // Cleanup event listener
    };
  }, []);

var settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: slidesToShow,
  slidesToScroll: 1,
  // gutterSpace: 16,
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
        slidesToShow: 3,
        arrows: false,
      },
    },
    {
      breakpoint: 400,
      setting: {
        slidesToShow: 3.5,
        arrows: false,
      },
    },
  ],
};
  return (
    <div className="mt-4 mb-4 pl-[17px]">
      <Slider {...settings}>
      <Trending />
      <Trending />
      <Trending />
      <Trending />
      <Trending />
      <Trending />
      </Slider>
    </div>
  );
}

export default Trendings;