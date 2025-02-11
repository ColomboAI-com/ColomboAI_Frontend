"use client";
import { useRef } from "react";
import {
  MdOutlineArrowBack,
  MdOutlineArrowForward,
  MdOutlineClose,
} from "react-icons/md";
import Stories from "react-insta-stories";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";
import Link from "next/link";
import Username from "../elements/Username";
import ProfilePicture from "../elements/ProfilePicture";
import { useSwipeable } from "react-swipeable";

export default function UserStoryModal({
  setIsCreateStorySignleOpen,
  storyData,
  data_user,
  onClose,
}) {
  const [data, setData] = useState(storyData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(data_user);
  const storiesRef = useRef(null);
  const { viewStoryoFUser, incrementStoryImpressions } =
    useContext(StoryContext);
  const storyStyles = {
    objectFit: "cover",
    borderRadius: "10px",
    justifyContent: "center",
    filter: "grayscale(30%)",
  };

  const handleStoryStart = async (index, imageDetailes) => {
    let story = data[index];

    await incrementStoryImpressions(story._id);
  };

  const handlePreviousStory = () => {
    if (currentIndex > 0) {
      console.log(currentIndex);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextStory = () => {
    if (currentIndex < data.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleNextStory(),
    onSwipedDown: () => handlePreviousStory(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    passive: false,
  });

  const maxWidth = 432;

  const [storiesWidth, setStoriesWidth] = useState(
    window.innerWidth < 700 ? window.innerWidth : maxWidth
  );
  // const storiesRef = useRef(null);
  const [storiesHeight, setStoriesHeight] = useState(
    window.innerWidth < maxWidth ? window.innerHeight : 768
  );
  const updateWidth = () => {
    if (window.innerWidth < 700) {
      setStoriesWidth(window.innerWidth);
      setStoriesHeight(window.innerHeight);
    } else {
      setStoriesWidth(432);
      setStoriesHeight(768);
    }
  };

  useEffect(() => {
    setData(storyData);
    setCurrentIndex(0);
  }, [storyData]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  return (
    <div
      {...handlers}
      className="bg-[#1a1a1af0] sm:flex sm:flex-row sm:justify-center sm:space-x-0 space-x-2 h-screen  md:p-4 flex justify-center  flex-col "
    >
      {/* Left Section */}
      <div className="flex flex-col  h-full justify-between p-4  sm:hidden w-fit md:flex">
        {/* <div className="flex flex-col items-end h-full justify-between p-4  sm:hidden border border-pink-500 w-fit md:flex lg:flex"> */}
        <div className="text-3xl md:block opacity-0 sm:hidden">
          <MdOutlineClose style={{ color: "#fff", cursor: "pointer" }} />
        </div>
        <div className="text-3xl md:block sm:hidden ">
          <MdOutlineArrowBack
            onClick={handlePreviousStory}
            disabled={currentIndex === 0}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="opacity-0  md:block sm:hidden">
          <MdOutlineArrowBack />
        </div>
      </div>
      {/* Middle Section */}
      <div className=" relative mx-auto h-full ">
        <div className="h-full  w-full rounded-[5px] justify-center story-detail-box">
          <div className="absolute top-6 left-4 p-1 text-lg z-[49] md:hidden">
            <MdOutlineArrowBack
              onClick={() => setIsCreateStorySignleOpen(false)}
              style={{ color: "#fff", cursor: "pointer" }}
            />
          </div>
          <div className="absolute top-10 left-0 right-0 p-5 z-[49]	w-20">
            <Link
              className="flex items-start"
              href={`/profile/${userData?.user_name || ""}`}
              target="_blank"
            >
              <ProfilePicture image={userData?.profile_picture} />
              <Username username={userData?.user_name} color={"text-[#fff]"} />
            </Link>
          </div>
          <Stories
            stories={data.map((story) => story.media[0])}
            defaultInterval={5000}
            preventDefault={true}
            // width={432}
            width={storiesWidth}
            height={storiesHeight}
            // height={768}
            justifyContent={"center"}
            ref={storiesRef}
            onStoryEnd={(index, story) => {
              if (currentIndex === data.length - 1) {
                onClose();
              } else {
                setCurrentIndex(index + 1);
              }
            }}
            onNext={(index, story) => {
              if (currentIndex === data.length - 1) {
                onClose();
              } else {
                setCurrentIndex(index + 1);
              }
            }}
            onPrevious={(index, story) => {
              setCurrentIndex(index - 1);
            }}
            storyStyles={storyStyles}
            onStoryStart={(index, imageDetails) =>
              handleStoryStart(index, imageDetails)
            }
            currentIndex={currentIndex}
          />
        </div>
        <div className="absolute bottom-10 left-0 right-0 p-5 z-[49]	">
          <div className="relative text-white">
            {/* test here... */}
            {/* <input
              type="search"
              id="search-dropdown"
              className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-[20px]"
              placeholder="Type something..."
              required
            />
            <button
              type="submit"
              className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-2xl border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              <IoIosSend />
            </button> */}
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="sm:hidden md:flex flex-col items-end h-full justify-between  p-4  w-fit">
        {/* <div className="flex flex-col items-end h-full justify-between p-4 lg:pr-16 sm:hidden md:flex lg:flex"> */}
        <div className="text-3xl md:block sm:hidden">
          <MdOutlineClose
            onClick={() => setIsCreateStorySignleOpen(false)}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="text-3xl md:block sm:hidden ">
          <MdOutlineArrowForward
            onClick={handleNextStory}
            disabled={currentIndex === data.length - 1}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="opacity-0  md:block sm:hidden">
          <MdOutlineArrowBack />
        </div>
      </div>
    </div>
  );
}
