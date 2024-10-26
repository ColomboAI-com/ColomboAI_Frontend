"use client";
import { useRef } from "react";
import { MdOutlineArrowBack, MdOutlineArrowForward, MdOutlineClose } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import Stories from "react-insta-stories";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";
import Link from "next/link";
import Username from "../elements/Username";
import ProfilePicture from "../elements/ProfilePicture";

export default function SingleStoryModal({ setIsCreateStorySignleOpen, storyData, data_user, index }) {
  const [data, setData] = useState(storyData)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(data_user)
  const storiesRef = useRef(null);
  const { viewStoryoFUser, incrementStoryImpressions } = useContext(StoryContext);
  const storyStyles = {
    objectFit: "cover",
    borderRadius: "10px",
    justifyContent: "center",
    filter: "grayscale(30%)",
  };
  const handleAllStoriesEnd = async () => {
    const res = await viewStoryoFUser(data[0]._id);
    if (res) {
      await setIsCreateStorySignleOpen(false);
    }
  };

  const handleStoryStart = async (index, imageDetailes) => {
    let story = data[index];

    await incrementStoryImpressions(story._id);
  };
  const [currentStoryIndex, setCurrentStoryIndex] = useState(index?.index);
  const { getRecentStories } = useContext(StoryContext);
  const { getStoriesOfUser } = useContext(StoryContext);
  const [allStories, SetAllStories] = useState([]);

  const getRecentStory = async () => {
    const res = await getRecentStories();
    if (res) {
      SetAllStories(res.stories);
    }
  };

  useEffect(() => {
    getRecentStory();
  }, []);
  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      console.log(currentIndex)
      setCurrentIndex(0)
      handleBack(allStories[currentStoryIndex - 1]?.creator?._id)
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };
  const handleBack = async (id) => {
    const res = await getStoriesOfUser(id);
    if (res) {
      setCurrentIndex(0)
      setData(res);
      setUserData(allStories[currentStoryIndex - 1]?.creator)
    }
  };
  const handleNextStory = () => {
    if (currentStoryIndex < allStories.length - 1) {
      console.log(currentIndex)
      setCurrentIndex(0)
      handleNext(allStories[currentStoryIndex + 1]?.creator?._id)
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };
  const handleNext = async (id) => {
    const res = await getStoriesOfUser(id);
    if (res) {
      setCurrentIndex(0)
      setData(res);
      setUserData(allStories[currentStoryIndex + 1]?.creator)
    }
  };

  return (
    <div className="bg-[#1a1a1af0] sm:p-1 md:p-4 sm:flex sm:flex-row sm:justify-start md:grid md:grid-cols-3">
      {/* Left Section */}
      <div className="flex flex-col ml-[4rem] h-full justify-between p-4 sm:hidden md:block">
        <div className="text-3xl md:block opacity-0 sm:hidden">
          <MdOutlineClose
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="text-3xl md:block sm:hidden">
          <MdOutlineArrowBack
            onClick={handlePreviousStory}
            disabled={currentStoryIndex === 0}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="opacity-0  md:block sm:hidden">
          <MdOutlineArrowBack
          />
        </div>
      </div>
      {/* Middle Section */}
      <div className="relative  m-auto">
        <div className="h-3/4 w-full rounded-[5px] justify-center story-detail-box">
          <div className="absolute top-6 left-4 p-1 text-lg z-[49] md:hidden">
            <MdOutlineArrowBack
              onClick={() => setIsCreateStorySignleOpen(false)}
              style={{ color: "#fff", cursor: "pointer" }}
            />
          </div>
          <div className="absolute top-10 left-0 right-0 p-5 z-[49]	w-20">
            <Link className="flex items-start" href={`/profile/${userData?.user_name || ""}`} target="_blank">
              <ProfilePicture image={userData?.profile_picture} />
              <Username username={userData?.user_name} color={"text-[#fff]"} />
            </Link>
          </div>
          <Stories
            stories={data.map((story) => story.media[0])}
            defaultInterval={5000}
            width={432}
            height={768}
            justifyContent={"center"}
            ref={storiesRef}
            onStoryEnd={(index, story) => {
              setCurrentIndex(index + 1);
            }}
            onNext={(index, story) => {
              setCurrentIndex(index + 1);
            }}
            onPrevious={(index, story) => {
              setCurrentIndex(index - 1);
            }}
            storyStyles={storyStyles}
            onStoryStart={(index, imageDetails) => handleStoryStart(index, imageDetails)}
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
      <div className="flex flex-col items-end h-full justify-between p-4">
        <div className="text-3xl md:block sm:hidden">
          <MdOutlineClose
            onClick={() => setIsCreateStorySignleOpen(false)}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="text-3xl md:block sm:hidden">
          <MdOutlineArrowForward
            onClick={handleNextStory}
            disabled={currentStoryIndex === allStories.length - 1}
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="opacity-0  md:block sm:hidden">
          <MdOutlineArrowBack
          />
        </div>
      </div>
      {/* <div className="flex pt-8 pr-4">
        <button
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          className="flex text-sm font-medium"
          type="button"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 4 15"
            fill="currentColor"
            style={{ color: '#fff' }}
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>

        <div
          id="dropdownDots"
          className="hidden z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
        >
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Separated link
            </a>
          </div>
        </div>
      </div> */}
    </div>
  );
}