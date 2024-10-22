import Modal from "../Modal";
import SingleStoryModal from "@/components/story/SingleStoryModal";
import { useContext, useState, useEffect } from "react";
import { StoryContext } from "@/context/StoryContext";

const ViewStory = (data) => {
  const [isCreateStorySignleOpen, setIsCreateStorySignleOpen] = useState(false);
  const { getStoriesOfUser } = useContext(StoryContext);
  const [detailStory, SetdetailStory] = useState([]);
  const [userId, SetuserId] = useState(null);

  const handleOpen = async (e, id) => {
    const res = await getStoriesOfUser(id);

    if (res) {
      SetdetailStory(res);
      setIsCreateStorySignleOpen(!isCreateStorySignleOpen);
    }
  };

  return (
    <div
      className="relative w-[120px] sm:w-full  md:w-[120px] lg:w-[120px] h-[167px] ml-[5px] mr-[5px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D] cursor-pointer"
      style={{
        backgroundImage: `url(${data?.data?.media[0]})`,
        backgroundSize: "100% 100%",
      }}
      onClick={(e) => handleOpen(e, data?.data?.creator?._id)}
    >
      <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
      <div className="absolute bottom-5 w-full">
        <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
          <img src={data?.data?.creator?.profile_picture} alt="profile" className="rounded-full" />
        </div>
        <h6 className="text-[12px] font-[450px] font-sans text-white text-center">
          @{data?.data?.creator?.name}
        </h6>
      </div>
      {isCreateStorySignleOpen && (
        <Modal
          isOpen={isCreateStorySignleOpen}
          setIsOpen={setIsCreateStorySignleOpen}
          className="w-full transform overflow-hidden text-left align-middle shadow-xl transition-all"
        >
          <SingleStoryModal
            setIsCreateStorySignleOpen={setIsCreateStorySignleOpen}
            data={detailStory}
            userData={data?.data?.creator}
          />
        </Modal>
      )}
    </div>
  );
};

export default ViewStory;
