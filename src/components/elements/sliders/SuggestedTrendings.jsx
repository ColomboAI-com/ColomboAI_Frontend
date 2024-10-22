import Slider from "react-slick";
import Trending from "../cards/Trending";
import SuggestedTrending from "../cards/SuggestedTrending";
import { useState, useEffect } from "react";



const SuggestedTrendings = () => {
  const [slidesToShow, setSlidesToShow] = useState(3); // Default to desktop value

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setSlidesToShow(5);
      } else if (width <= 1190) {
        setSlidesToShow(5);
      } else {
        setSlidesToShow(5);
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
    <div className="mt-4 mb-4">
      <Slider {...settings}>
      <SuggestedTrending />
      <SuggestedTrending />
      <SuggestedTrending />
      <SuggestedTrending />
      <SuggestedTrending />
      <SuggestedTrending />
      </Slider>
    </div>
  );
}

export default SuggestedTrendings;