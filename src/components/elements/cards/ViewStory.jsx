import Modal from "../Modal";
import SingleStoryModal from "@/components/story/SingleStoryModal";
import StoryModal from "../StoryModal";
import { useContext, useState } from "react"; // Removed useEffect
import { StoryContext } from "@/context/StoryContext";
import Image from "next/image"; // Import next/image

// Props: data (story object), index (key), isUnread (for ring style)
const ViewStory = ({ data: storyContainer, index, isUnread = true }) => {
  const story = storyContainer?.data; // Actual story object

  const [isCreateStorySignleOpen, setIsCreateStorySignleOpen] = useState(false);
  const { getStoriesOfUser } = useContext(StoryContext);
  const [detailStory, SetdetailStory] = useState([]);
  // const [userId, SetuserId] = useState(null); // Was unused

  const handleOpen = async (e, id) => {
    if (!id) return;
    const res = await getStoriesOfUser(id);
    if (res) {
      SetdetailStory(res);
      setIsCreateStorySignleOpen(!isCreateStorySignleOpen);
    }
  };

  const ringClasses = isUnread
    ? "p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
    : "p-0.5 bg-gray-300";

  return (
    <div
      className="relative w-[120px] sm:w-[100px] md:w-[120px] lg:w-[120px] h-[167px] ml-[5px] mr-[5px] border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D] cursor-pointer overflow-hidden" // Added overflow-hidden
      onClick={(e) => handleOpen(e, story?.creator?._id)}
    >
      {/* Background Image using next/image */}
      {story?.media?.[0] && (
        <Image
          src={story.media[0]}
          alt={story?.creator?.name ? `${story.creator.name}'s story` : "Story image"}
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="z-0" // Ensure it's behind other content
        />
      )}
      {/* Overlay and Content */}
      <div className="absolute inset-0 z-10 h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
      <div className="absolute bottom-5 w-full z-10">
        {/* Avatar with Story Ring */}
        <div className={`rounded-full mx-auto ${ringClasses} w-[34px] h-[34px] flex items-center justify-center`}> {/* Outer ring + padding */}
          <div className="bg-white p-0.5 rounded-full"> {/* Inner white padding */}
            <div className="relative w-[26px] h-[26px] rounded-full overflow-hidden"> {/* Adjusted size for image */}
              {story?.creator?.profile_picture ? (
                <Image
                  src={story.creator.profile_picture}
                  alt={story.creator.name || "Profile picture"}
                  layout="fill"
                  objectFit="cover"
                  loading="lazy"
                  className="rounded-full"
                />
              ) : (
                 <div className="w-full h-full bg-gray-200 rounded-full"></div> // Placeholder
              )}
            </div>
          </div>
        </div>
        <h6 className="text-[12px] font-normal font-sans text-white text-center mt-1"> {/* Adjusted font weight and margin */}
          {story?.creator?.user_name || 'username'} {/* Changed to user_name and default */}
        </h6>
      </div>
      {isCreateStorySignleOpen && (
        <StoryModal
          isOpen={isCreateStorySignleOpen}
          setIsOpen={setIsCreateStorySignleOpen}
          className="sm:w-[100%] xl:ml-[68px] lg:ml-[62px] md:ml-[34px] transform overflow-hidden text-left align-middle shadow-xl transition-all"
        >
          <SingleStoryModal
            setIsCreateStorySignleOpen={setIsCreateStorySignleOpen}
            storyData={detailStory}
            data_user={data?.data?.creator}
            index={data}
          />
        </StoryModal>
      )}
    </div>
  );
};

export default ViewStory;
