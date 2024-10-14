"use client";
import Slider from "react-slick";
import ViewStory from "../cards/ViewStory";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";
import CreateStoryQuick from "../cards/CreateStoryQuick";
import { maxlength } from "caniuse-lite/data/features";

var settings = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
};

const Stories = () => {
  const { getRecentStories, loadings } = useContext(StoryContext);
  const [allStories, SetAllStories] = useState([]);

  const gerRecentStory = async () => {
    const res = await getRecentStories();
    if (res) {
      SetAllStories(res.stories);
    }
  };

  useEffect(() => {
    gerRecentStory();
  }, []);

  const reFetchingStory = () => {
    gerRecentStory();
  };

  if (loadings.reactStory && !allStories?.length) {
    return null;
  }

  return (
    <div className=" mx-6 xl:mx-0 md:mx-0 lg:mx-0">
    <div className="my-8 flex flex-col justify-evenly" id="create_story_slider_id">
      <Slider {...settings}>
        <CreateStoryQuick reFetchingStory={reFetchingStory} />

        {allStories.length !== 0
          ? allStories.map((story, index) => <ViewStory data={story} key={index} />)
          : null}
      </Slider>
    </div>
    </div>
  );
};

export default Stories;
