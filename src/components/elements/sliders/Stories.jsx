import Slider from "react-slick";
import CreateStory from "../cards/CreateStory";
import ViewStory from "../cards/ViewStory";

var settings = {
    dots: false,
    arrow: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
            // infinite: true,
            // dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        }
    ]
};

const Stories = () => {
    return (
        <div className="my-8">
            <Slider {...settings}>
                <CreateStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
            </Slider>
        </div>
    );
}

export default Stories;