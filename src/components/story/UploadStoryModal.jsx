"use client"
import { BackButtonIcon, CloseDocumentIcon, CrossIcon } from "../Icons";
import Button from "@/elements/Button";
import { useState, useEffect, useContext } from "react";
import { StoryContext } from "@/context/StoryContext"
import { MessageBox } from "../MessageBox";

const UploadStoryModal = ({ setIsCreateStoryOpen }) => {
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [nextStep, setNextStep] = useState(false);

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click()
  }

  const clearFileHandler = () => {
    setFile(null)
    setMediaUrl("")
    setPostType(defaultPostType)
  }

  const handleGeneratePost = async () => {
    const result = await generatePost(promptInput)
    if (result?.response_type !== "text") {
      setMediaUrl(result?.text)
      setPostType(result?.response_type)
    } else if (result?.response_type === "text") {
      setPostInput(result?.text)
    }
  }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      const fileType = selectedFile.type.split('/')[0];
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(selectedFile);
      setMediaUrl(fileUrl);
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const fileType = file.type.split('/')[0];
      setFile(file);
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
    }
  }
  
  const { createStory } = useContext(StoryContext);

  const createPostSubmitButton = async () => {
    const res = await createStory({ fileType: "image", file: file, content: "image" })
    if (res) {
      MessageBox('success', res.message)
      setIsCreateStoryOpen(false)
    }
  }


  return (
    <>
      <div className="relative border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] overflow-y-auto font-sans">
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
              Create new story
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsCreateStoryOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>
        <div className="px-10 py-5 flex flex-col justify-between h-[0vh]">
          {!nextStep && (
            <button onClick={() => setNextStep(true)} className="ml-auto text-brandprimary font-semibold">
              Add Text
            </button>
          )}
        </div>
        {
          mediaUrl !== "" && mediaType.includes("image")
            ?
            <div className="relative my-8">
              <img
                key={mediaUrl}
                src={mediaUrl}
                alt="File Preview"
                className="w-full h-full object-contain"
              />
              <div className=" absolute top-3 right-2">
                <div className="flex flex-row items-center justify-center">
                  <span onClick={clearFileHandler} className="px-2 pointer">
                    <CloseDocumentIcon />
                  </span>
                </div>
              </div>
            </div>
            :
            mediaUrl !== "" && mediaType.includes("video")
              ?
              <div className="relative my-8">
                <video
                  key={mediaUrl}
                  autoPlay
                  loop
                  controls
                  className="w-full aspect-video"
                >
                  <source src={mediaUrl} />
                </video>
                <div className="absolute top-3 right-7">
                  <div className="flex flex-row items-center justify-center">
                    <span onClick={clearFileHandler} className="px-2 pointer">
                      <CloseDocumentIcon />
                    </span>
                  </div>
                </div>
              </div>
              :
              ""
        }
        {nextStep === false &&
          <>
            {
              (mediaUrl === "" && mediaType === "") &&
              <div
                className="flex flex-col items-center py-2 rounded-xl absolute w-full top-auto bottom-[31px]"
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
              >
                <p className="text-xl my-4">
                  Drag photos and videos here
                </p>
                <span onClick={handleFileInputClick}>
                  <input
                    className="hidden"
                    type="file"
                    accept="media_type"
                    onChange={(e) => handleFileChange(e, "file")}
                  />
                  <Button
                    title={'Select from computer'}
                    className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14'}
                  />
                </span>
              </div>
            }
          </>
        }
        {
          nextStep &&
          <div className="flex justify-center mb-2">
            <Button
              type="button"
              onClick={(e) => createPostSubmitButton(e)}
              title={'SHARE STORY'}
              className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24 '}
            />
          </div>
        }
      </div>
    </>
  );
}

export default UploadStoryModal;
