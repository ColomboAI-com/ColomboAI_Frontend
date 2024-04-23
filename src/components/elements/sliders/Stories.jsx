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
        breakpoint: 1200,
        setting: {
            slidesToShow: 5,
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