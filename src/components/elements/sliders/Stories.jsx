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
  slidesToShow: 5, // Number of slides to show at once
  slidesToScroll: 1, // Number of slides to scroll at a time
  centerMode: true, // Enables center view with partial prev/next slides shown
  centerPadding: "40px", // Padding for center mode (shows part of next/prev slides)
  focusOnSelect: true, // Centers the slide on click
  responsive: [
    {
      breakpoint: 1024, // Medium desktops
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
        centerPadding: "40px",
      },
    },
    {
      breakpoint: 800, // Tablets
      settings: {
        slidesToShow: 3, // Show fewer slides on smaller screens
        slidesToScroll: 1,
        centerPadding: "30px",
        initialSlide: 1, // Adjust initial slide if slidesToShow changes
      },
    },
    {
      breakpoint: 767, // Mobile
      settings: {
        slidesToShow: 3, // Even fewer, or adjust to make one central item prominent
        slidesToScroll: 1,
        centerPadding: "20px",
      },
    },
  ],
};

const Stories = () => {
  const { getRecentStories, loadings } = useContext(StoryContext);
  // TODO: The ViewStory component now expects an `isUnread` prop.
  // This needs to be sourced from `allStories` items.
  // For now, ViewStory defaults isUnread to true.
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
          ? allStories.map((story, index) => <ViewStory data={story} key={index} index={index}/>)
          : null}
      </Slider>
    </div>
    </div>
  );
};

export default Stories;
