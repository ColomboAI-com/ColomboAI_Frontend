'use client'
import Slider from "react-slick";
import ViewStory from "../cards/ViewStory";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";
import CreateStoryQuick from "../cards/CreateStoryQuick";
import { maxlength } from "caniuse-lite/data/features";

var settings = {
  dots: false,
  arrows: false,
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

  const { getRecentStories, loadings } = useContext(StoryContext);
  const [allStories, SetAllStories] = useState([]);

  const gerRecentStory = async () => {
    const res = await getRecentStories()
    if (res) {
      SetAllStories(res?.data)
    }
  }

  useEffect(() => {
    gerRecentStory()
  }, [])

  const reFetchingStory = () => {
    gerRecentStory()
  }

  if (loadings.reactStory && !allStories?.length) {
    return null
  }

  return (
    <div className="my-8 w-full" id="create_story_slider_id">
      <Slider {...settings}>
        <CreateStoryQuick reFetchingStory={reFetchingStory}/>

        {allStories && allStories.map((story, index) => {
            return <ViewStory data={story} key={index} />
          })
        } 
      </Slider>
    </div>
  );
}

export default Stories;
