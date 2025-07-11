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
import { useSwipeable } from "react-swipeable";
import { formatTimeAgo } from "@/utlils/commonFunctions"; // Import formatTimeAgo

export default function SingleStoryModal({ setIsCreateStorySignleOpen, storyData, data_user, index }) {
  const [data, setData] = useState(storyData)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState(data_user)
  // const storiesRef = useRef(null); // react-insta-stories manages its own refs internally for navigation usually
  const { viewStoryoFUser, incrementStoryImpressions } = useContext(StoryContext);

  // Default styles from react-insta-stories are usually fine.
  // Custom styling can be done via props if needed.
  // const storyStyles = {
  //   objectFit: "cover",
  //   borderRadius: "10px",
  //   justifyContent: "center",
  //   filter: "grayscale(30%)",
  // };

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

  // Call viewStoryoFUser when the modal opens for a specific user's stories
  useEffect(() => {
    if (userData?._id) {
      viewStoryoFUser(userData._id);
      // This marks the user's stories as viewed on the backend.
      // StoryContext might need a way to signal this change to Stories.jsx for UI update.
    }
  }, [userData, viewStoryoFUser]);

  const getRecentStory = async () => {
    const res = await getRecentStories();
    if (res) {
      SetAllStories(res.stories);
    }
  };

  useEffect(() => {
    getRecentStory();
  }, []); // Fetches all users with stories for next/prev user navigation

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

  const handlers = useSwipeable({
    onSwipedUp: () => handleNextStory(),
    onSwipedDown: () => handlePreviousStory(),
    preventDefaultTouchmoveEvent:true,
    trackMouse:true, 
    passive : false
  })
  
  const maxWidth = 432;
 

  const [storiesWidth, setStoriesWidth] = useState(window.innerWidth < 700 ? window.innerWidth : maxWidth);
  // const storiesRef = useRef(null);
  const [storiesHeight, setStoriesHeight] = useState(window.innerWidth < maxWidth ? window.innerHeight : 768 )
  const updateWidth = () => {
  
    if (window.innerWidth < 700){
    setStoriesWidth(window.innerWidth);
    setStoriesHeight(window.innerHeight)
    }
    else{
      setStoriesWidth(432)
      setStoriesHeight(768)
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return (
    <div {...handlers} className="bg-[#1a1a1af0] sm:flex sm:flex-row sm:justify-center sm:space-x-0 space-x-2 h-screen  md:p-4 flex justify-center  flex-col ">
      {/* Left Section */}
      <div className="flex flex-col  h-full justify-between p-4  sm:hidden w-fit md:flex">
      {/* <div className="flex flex-col items-end h-full justify-between p-4  sm:hidden border border-pink-500 w-fit md:flex lg:flex"> */}
        <div className="text-3xl md:block opacity-0 sm:hidden">
          <MdOutlineClose
            style={{ color: "#fff", cursor: "pointer" }}
          />
        </div>
        <div className="text-3xl md:block sm:hidden ">
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
      <div className=" relative mx-auto h-full ">
        <div className="h-full w-full rounded-[5px] justify-center story-detail-box">
          {/* Mobile back button - can be kept if desired, or rely on swipe/corner tap */}
          <div className="absolute top-6 left-4 p-1 text-lg z-[49] md:hidden">
            <MdOutlineArrowBack
              onClick={() => setIsCreateStorySignleOpen(false)}
              style={{ color: "#fff", cursor: "pointer" }}
            />
          </div>
          {/* Header is now part of each story object for react-insta-stories */}
          <Stories
            stories={data.map((storyItem) => {
              // Assuming storyItem.type exists and is 'image' or 'video'
              // Assuming storyItem.media[0] is the URL
              // Assuming storyItem.createdAt is available for subheading
              let storyType = storyItem.type || (storyItem.media && storyItem.media[0]?.includes('.mp4') ? 'video' : 'image'); // Basic type inference
              return {
                url: storyItem.media && storyItem.media[0],
                type: storyType,
                duration: storyType === 'image' ? 5000 : undefined, // duration for images, undefined for video (plays actual length)
                header: {
                  heading: userData?.user_name || 'User',
                  subheading: `Posted ${storyItem.createdAt ? formatTimeAgo(storyItem.createdAt) : ''}`, // Requires formatTimeAgo
                  profileImage: userData?.profile_picture,
                },
                // storyStyles: storyStyles, // Use global storyStyles if defined, or remove for default
              };
            })}
            defaultInterval={5000} // This will be overridden by individual story duration for images if set
            preventDefault={true}
            width={storiesWidth}
            height={storiesHeight}
            // ref={storiesRef} // Not typically needed to be set manually
            onStoryEnd={(s, st) => { // Params might be different, check docs
              // This callback is when a single story item ends.
              // setCurrentIndex might be for the library's internal index of the current user's stories.
            }}
            onAllStoriesEnd={handleAllStoriesEnd} // This is when all stories for the current user end.
            // onNext and onPrevious are for item navigation, library handles this.
            // We use currentStoryIndex for USER navigation.
            // storyStyles={storyStyles} // Apply global story styles if any
            onStoryStart={(storyIndex, story) => handleStoryStart(storyIndex, story)} // storyIndex is for current user's items
            currentIndex={currentIndex} // Controls the current item within the user's stories
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