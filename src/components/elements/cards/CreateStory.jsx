import UploadStoryModal from "@/components/story/UploadStoryModal";
import { useState,useEffect,useContext } from "react";
import Modal from "../Modal";

import { StoryContext } from "@/context/StoryContext"

const CreateStory = () => {
    const [isCreateStoryOpen,setIsCreateStoryOpen] = useState(false);

    const handleOpen = (e) => {
        setIsCreateStoryOpen(!isCreateStoryOpen)
    }
    
 

    return (
        <>
        <div className="bg-[url('/images/home/create-story.svg')] bg-[length:100%] relative h-[167px] ml-[5px] mr-[5px] bg-no-repeat bg-center border-[0.25px] border-brandprimary rounded-[10px] shadow-[1px_1px_2px_0px_#0000004D] cursor-pointer" onClick={(e) => handleOpen(e)}>
            <div className="h-full rounded-[10px] bg-gradient-to-t from-[#000000cf] to-[#00000000]"></div>
            <div className="absolute bottom-14 w-full">
                <div className="w-[29px] h-[29px] border-[1px] border-brandprimary rounded-full mx-auto">
                <img src="/images/home/add-new-story.svg" />
                </div>
                <h6 className="text-[12px] font-[450px] font-sans text-white text-center relative top-9">
                Create New Story
                
                </h6>
            </div>
        </div>
                {
                isCreateStoryOpen &&
                <Modal isOpen={isCreateStoryOpen} setIsOpen={setIsCreateStoryOpen} className="w-full max-w-4xl transform overflow-hidden rounded-[26px] bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <UploadStoryModal setIsCreateStoryOpen={setIsCreateStoryOpen} />
                </Modal>
              }
        </>
    );
}

export default CreateStory;