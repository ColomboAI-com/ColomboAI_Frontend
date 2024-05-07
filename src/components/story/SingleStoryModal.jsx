"use client";
import { useRef } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import Stories from "react-insta-stories";
import { useContext,useState,useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";

export default function SingleStoryModal({ setIsCreateStorySignleOpen, data}) {
  const storiesRef = useRef(null);
  const { viewStoryoFUser } = useContext(StoryContext);
  const storyStyles = {
    objectFit: "cover",
    borderRadius: "10px",
    filter: "grayscale(30%)",
  };
  const handleAllStoriesEnd = async() => {
    const res = await viewStoryoFUser(data[0]._id);
    console.log(res)
      if (res) {
        await setIsCreateStorySignleOpen(false)
      }
  };

  return (
    <div className="bg-[#1a1a1af0] p-4 grid grid-cols-3">
      {/* Left Section */}
      <div className="flex justify-end p-4 text-3xl">
        <MdOutlineArrowBack onClick={() => setIsCreateStorySignleOpen(false)} style={{ color: '#fff' }}/>
      </div>

      {/* Middle Section */}
      <div className="relative  m-auto">
        <div className="h-3/4 w-full rounded-[5px]">
          <Stories
            stories={data.map((story) => story.media)}
            defaultInterval={1000}
            width={432}
            height={768}
            ref={storiesRef}
            onAllStoriesEnd={handleAllStoriesEnd}
            storyStyles={storyStyles}
          />
        </div>
        <div className="absolute bottom-10 left-0 right-0 p-5 z-[9999]	">
          <div className="relative">
            <input
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
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex pt-8 pr-4">
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
      </div>
    </div>
  );
}
