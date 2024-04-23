import Slider from "react-slick";
import Trending from "../cards/Trending";

var settings = {
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

const Trendings = () => {
    return (
        <div className="mt-4 mb-4">
        <Slider {...settings}>
            <Trending/>
            <Trending/>
            <Trending/>
            <Trending/>
            <Trending/>
            <Trending/>
        </Slider>
    </div>
    );
}

export default Trendings;