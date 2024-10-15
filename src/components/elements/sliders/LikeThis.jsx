import Slider from "react-slick";
import Sponsored from "../cards/Sponsored";

var settings = {
  dots: false,
  arrows: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2,
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

const LikeThis = () => {
  return (
    <div className="mt-4 mb-4">
      <Slider {...settings}>
        <Sponsored />
        <Sponsored />
        <Sponsored />
        <Sponsored />
        <Sponsored />
        <Sponsored />
      </Slider>
    </div>
  );
};

export default LikeThis;
