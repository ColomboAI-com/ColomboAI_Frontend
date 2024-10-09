"use client";
import { BackButtonIcon, CloseDocumentIcon, CrossIcon } from "../Icons";
import Button from "@/elements/Button";
import { useState, useEffect, useContext } from "react";
import { StoryContext } from "@/context/StoryContext";
import { MessageBox } from "../MessageBox";
import { GlobalContext } from "@/context/GlobalContext";

const UploadStoryModal = ({ setIsCreateStoryOpen, getStory }) => {
  const [file, setFile] = useState(null);
  const [inputText, setInputText] = useState('');
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [nextStep, setNextStep] = useState(false);
  const { loadings } = useContext(StoryContext)
  
  const {
    setStoryMediaURL,
    setStoryMediaType,
    setIsSelectedFromComputer,
    storyMediaURL
  } = useContext(GlobalContext);

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="image/*, video/*"]').click();
  };

  const clearFileHandler = () => {
    setFile(null);
    setMediaUrl("");
    setMediaType("");
    setInputText('');
    setNextStep(false);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type.split('/')[0];
      setFile(selectedFile);
      setMediaType(fileType);
      const fileUrl = URL.createObjectURL(selectedFile);
      setMediaUrl(fileUrl);
      setStoryMediaURL(fileUrl);
      setStoryMediaType(fileType);
      setIsSelectedFromComputer(true);
      setIsCreateStoryOpen(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const fileType = file.type.split('/')[0];
      setFile(file);
      setMediaType(fileType);
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
    }
  };

  const { createStory, getRecentStories } = useContext(StoryContext);

  const createPostSubmitButton = async () => {
    const res = await createStory({ fileType: mediaType, file: file, content: inputText });
    if (res) {
      MessageBox('success', res.message);
      setIsCreateStoryOpen(false);
      getRecentStories();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between border-[1px] border-brandprimary rounded-[10px] lg:min-h-[74vh] lg:max-h-[74vh] overflow-y-auto font-sans">
        <div className="flex items-center justify-between p-[22px] border-b-2 border-gray-300">
          <div>
            {nextStep ? (
              <button onClick={() => setNextStep(false)} className="flex items-center justify-center p-[10px]">
                <BackButtonIcon w={20} h={20} fill={"#515151"} />
              </button>
            ) : (
              <div className="w-8 h-8"></div>
            )}
          </div>
          <div>
            <p className="text-2xl font-sans tracking-wider">
              Create New Story
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsCreateStoryOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>
        <div className="flex flex-col">
        {!nextStep && mediaUrl !== "" && mediaType.includes("image") && (<div className="px-10 pt-[15px] pb-[35px] flex flex-col justify-between h-[0vh]">
            <button onClick={() => setNextStep(true)} className="ml-auto text-brandprimary font-semibold">
              Next
            </button>
        </div>)}
        {/* <div className="flex items-start w-full px-[20px]">
          <input className="flex  p-3 pr-12 rounded-2xl m-[1px] w-[calc(100%-2px)] text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm  text- resize-none outline-none focus:ring-offset-0 focus:ring-0 border-[1px] border-brandprimary" placeholder="Type a message" value={inputText} onChange={(e) => setInputText(e.target.value)} name="text" />
        </div> */}
        {mediaUrl !== "" && (mediaType.includes("image") || mediaType.includes("video")) && (
          <div className="relative my-6 h-full">
            {mediaType.includes("image") ? (
              <img
                key={mediaUrl}
                src={mediaUrl}
                alt="File Preview"
                className="w-full h-[66vh] object-contain"
              />
            ) : (
              <video
                key={mediaUrl}
                autoPlay
                loop
                controls
                className="w-full aspect-video"
              >
                <source src={mediaUrl} />
              </video>
            )}
            <div className="absolute top-3 right-2">
              <div className="flex flex-row items-center justify-center">
                <span onClick={clearFileHandler} className="px-2 pointer">
                  <CloseDocumentIcon />
                </span>
              </div>
            </div>
          </div>
        )}
        {!nextStep && (
          <div className="flex flex-col h-full items-center pb-[20px] pt-2 justify-end ">
            <p className="text-xl my-4">
              Drag photos and videos here
            </p>
            <span onClick={handleFileInputClick}>
              <input
                className="hidden"
                type="file"
                accept="image/*, video/*"
                onChange={handleFileChange}
              />
              <Button
                title={'Select from computer'}
                className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14'}
              />
            </span>
          </div>
        )}
        {nextStep && (
          <div className="flex mt-2 mb-4 justify-center">
            <Button
              type="button"
              title={'SHARE STORY'}
              className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24 '}
              loading={loadings.createStory}
              onClick={createPostSubmitButton}
            />
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default UploadStoryModal;
