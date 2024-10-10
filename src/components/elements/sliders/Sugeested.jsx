import Slider from "react-slick";
import Suggested from "../cards/Suggested";

var settings = {
  dots: false,
  arrow: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      setting: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1000,
      setting: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 650,
      setting: {
        slidesToShow: 2,
      },
    },
  ],
};

const Sugeested = () => {
  return (
    <div className="mt-4 mb-4">
      <Slider {...settings}>
        <Suggested />
        <Suggested />
        <Suggested />
        <Suggested />
        <Suggested />
        <Suggested />
      </Slider>
    </div>
  );
};

export default Sugeested;
