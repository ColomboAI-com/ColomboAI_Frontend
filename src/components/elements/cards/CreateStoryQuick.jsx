import UploadStoryModal from "@/components/story/UploadStoryModal";
import { useState,useEffect,useContext } from "react";
import Modal from "../Modal";


import { StoryContext } from "@/context/StoryContext"
import { GlobalContext } from "@/context/GlobalContext";
import { clearCookie, getCookie } from "@/utlils/cookies";
import Image from "next/image"; // Import next/image
import { PlusCircleIcon } from "@heroicons/react/24/solid"; // Using Heroicons for a plus icon

const CreateStoryQuick = ({ reFetchingStory }) => {
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);

  const handleOpen = (e) => {
    setIsCreateStoryOpen(!isCreateStoryOpen);
  };
  const profilePic = getCookie("profilePic");

  return (
    <>
      {/* Container for circular avatar and text below */}
      <div
        className="flex flex-col items-center space-y-1 cursor-pointer mx-[5px] w-[70px] sm:w-[60px]" // Adjusted width
        onClick={handleOpen}
      >
        {/* Circular Avatar / Placeholder */}
        <div className="relative w-[56px] h-[56px] rounded-full"> {/* Avatar size consistent with ViewStory */}
          {profilePic ? (
            <Image
              src={profilePic}
              alt="Your profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
              {/* Fallback if no profile pic, could be a generic user icon */}
            </div>
          )}
          {/* Add Icon Overlay */}
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
            <PlusCircleIcon className="w-5 h-5 text-brandprimary" />
          </div>
        </div>

        {/* Text Label */}
        <h6 className="text-[12px] font-normal text-gray-700 dark:text-gray-300 w-full truncate text-center">
          Your Story
        </h6>
      </div>

      {isCreateStoryOpen && (
        <Modal
          isOpen={isCreateStoryOpen}
          setIsOpen={setIsCreateStoryOpen}
          className="xl:w-[602px] lg:w-[602px] sm:w-full max-w-4xl transform overflow-hidden rounded-[20px] bg-white py-[7px] px-[9px] text-left align-middle shadow-xl transition-all"
        >
          <UploadStoryModal
            setIsCreateStoryOpen={setIsCreateStoryOpen}
            getStory={reFetchingStory}
          />
                </Modal>
              }
        </>
    );
}

export default CreateStoryQuick;