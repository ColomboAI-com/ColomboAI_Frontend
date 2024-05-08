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
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  const clearFileHandler = () => {
    setFile(null);
    setMediaUrl("");
    setMediaType("");
  };

  const handleGeneratePost = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type !== "text") {
      setMediaUrl(result?.text);
      setMediaType(result?.response_type);
    } else if (result?.response_type === "text") {
      setPostInput(result?.text)
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFile(newFiles);
      setMediaUrl(URL.createObjectURL(newFiles[0]))
      setMediaType(newFiles[0]?.type);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFile(newFiles);
      setMediaUrl(URL.createObjectURL(newFiles[0]))
      setMediaType(newFiles[0]?.type);
    }
  };

  console.log(file, mediaUrl, mediaType, "upload")


  // const createPostSubmitButton = (event) => {
  // alert('Create Submit Button')
  // }

  const { createStory, loadings } = useContext(StoryContext);

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
        <div className="px-10 pt-[15px] pb-[35px] flex flex-col justify-between h-[0vh]">
          {!nextStep && (
            <button onClick={() => setNextStep(true)} className="ml-auto text-brandprimary font-semibold">
              Add Text
            </button>
          )}
        </div>
        {
          mediaUrl !== "" && mediaType.includes("image")
            ?
            <div className="relative my-8 h-[0vh]">
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
              <div>
                <div class="items-start w-full px-[20px]">
                    
                  <input className="flex  p-3 pr-12 rounded-2xl m-[1px] w-[calc(100%-2px)] min-h-[14vh] text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm  text- resize-none outline-none focus:ring-offset-0 focus:ring-0 border-[1px] border-brandprimary" placeholder="Type a message" value="" />
                </div>

                <div
                  className="flex flex-col items-center py-2 h-[47svh] justify-end "
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
              loading={loadings?.createStory}
              className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24 '}
            />
          </div>
        }
      </div>
    </>
  );
}

export default UploadStoryModal;
