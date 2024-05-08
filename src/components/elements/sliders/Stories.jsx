'use client'
import Slider from "react-slick";
import CreateStory from "../cards/CreateStory";
import ViewStory from "../cards/ViewStory";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";

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
      SetAllStories(res?.data?.recentStories)
    }
  }

  useEffect(() => {
    gerRecentStory()
  }, [])

  if (loadings.reactStory && !allStories?.length) {
    return null
  }

  return (
    <div className="my-8" id="create_story_slider_id">
      <Slider {...settings}>
        <CreateStory />

        {
          allStories.map((story, index) => {
            return <ViewStory data={story} key={index} />
          })
        }
        {/* <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/>
                <ViewStory/> */}
      </Slider>
    </div>
  );
}

export default Stories;