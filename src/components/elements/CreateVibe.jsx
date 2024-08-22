// /* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from "react";
import {
  BackButtonIcon,
  CloseDocumentIcon,
  CreateMagicPenIcon,
  CrossIcon,
  SendIcon,
  VideoIcon,
} from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import { GlobalContext } from "@/context/GlobalContext";
import Button from "@/elements/Button";
import { MessageBox } from "../MessageBox";
import next from "next";

const CreateVibe = () => {
  const [isMagicPenOpen, setIsMagicPenOpen] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [postInput, setPostInput] = useState("");
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const defaultPostType = "thought";
  const [postType, setPostType] = useState(defaultPostType);
  const [nextStep, setNextStep] = useState(false);
  const { generatePost, createPost, loadings, posts, setPosts } =
    useContext(FeedContext);
  const { setIsCreateVibeOpen } = useContext(GlobalContext);
  const { isSelectedFromComputer, setIsSelectedFromComputer } = useContext(GlobalContext);
  const [imageText, setImageText] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const [isMemuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  const iconButtons = () => {
    return (
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
      <button className="p-2 bg-gray-700 rounded-full">
        <CreateMagicPenIcon
          w={25}
          h={25}
          fill1={isMagicPenOpen ? "#fff" : "#FF0049"}
          fill2={isMagicPenOpen ? "#fff" : "#FFBE3B"}
          fill3={isMagicPenOpen ? "#fff" : "#00BB5C"}
          fill4={isMagicPenOpen ? "#fff" : "#187DC4"}
          fill5={isMagicPenOpen ? "#fff" : "#58268B"}
        />
      </button>
      <button className="p-2 bg-gray-700 rounded-full">
        {/* Add another icon here if needed */}
      </button>
      <button className="p-2 bg-gray-700 rounded-full">
        {/* Add another icon here if needed */}
      </button>
      <button className="p-2 bg-gray-700 rounded-full">
        {/* Add another icon here if needed */}
      </button>
    </div>
    )
  }

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  function toogleMagicPen() {
    setIsMagicPenOpen(!isMagicPenOpen);
  }

  const clearFileHandler = () => {
    setFile(null);
    setMediaUrl("");
    setPostType(defaultPostType);
  };

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type !== "text") {
      setMediaUrl(result?.text);
      setPostType(result?.response_type);
    } else if (result?.response_type === "text") {
      setPostInput(result?.text);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      const fileType = selectedFile.type.split("/")[0];
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(selectedFile);
      setMediaUrl(fileUrl);
      setNextStep(true);
      setIsSelectedFromComputer(true);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const fileType = file.type.split("/")[0];
      setFile(file);
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
      setNextStep(true);
      setIsSelectedFromComputer(true);
    }
  };

  const handleCreateVibe = async () => {
    const res = await createPost({ type: postType, file, content: postInput });
    if (res) {
      MessageBox("success", res.message);
      let postData = [...posts];
      postData.unshift(res.data?.post);
      setPosts(postData);
      setIsCreateVibeOpen(false);
    }
  };

  // Handlers to add text to vibe
  // TODO: Find out if the image text will be saved in the DB
  const handleTextClick = () => {
    setIsEditingText(true)
  };

  const handleTextChange = (e) => {
    setImageText(e.target.value);
  };

  // Handlers for 3-dots menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMemuOpen);
  }

  
  const handleSaveToDrafts = () => {
    console.log("Saving to drafts");
    setIsMenuOpen(false);
  }

  const handleDiscard = () => {
    console.log("Discarding");
    setIsMenuOpen(false);
    setIsCreateVibeOpen(false);
  }

  return (
    <>
      <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto  font-sans">
        <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
          <div className={`${!nextStep ? "p-[10px]" : " justify-center"}`}>
            {nextStep && (
              <button onClick={() => {
                setNextStep(false);
                setIsSelectedFromComputer(false);
              }}
              >
                <BackButtonIcon w={20} h={20} fill={"#515151"} />
              </button>
            )}
          </div>
          <div className="flex-grow flex justify-center">
            <p className="pl-[17px]  text-2xl font-sans tracking-wider ">
              Create new Vibes
            </p>
          </div>

          {!isSelectedFromComputer ? (
            <button onClick={() => setIsCreateVibeOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          ) : (
            <div>
              <button onClick={toggleMenu}>
                3-dot menu placeholder
              </button>
              {isMemuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={handleSaveToDrafts}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Save to Drafts
                    </button>
                    <button
                      onClick={handleDiscard}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
        </div>

        <div className=" px-[18px] py-[22px] font-sans flex flex-col justify-between h-[70vh] ">
          <div className={`flex flex-col `}></div>
          <div className="flex-grow relative overflow-hidden" onClick={handleTextClick}>
            {mediaUrl !== "" && postType.includes("image") ? (
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

                  {iconButtons()}
                  
                  {isEditingText && (
                    <input
                      type="text"
                      value={imageText}
                      onChange={handleTextChange}
                      className="w-full bg-transparent text-black text-center text-lg focus:outline-none"
                      autoFocus
                    />
                  )}
                </div>
                {nextStep && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                    <Button
                      title={"NEXT"}
                      className={
                        "w-fit sm2:text-xl text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-4 px-24 "
                      }
                      loading={loadings?.createVibe}
                      onClick={handleCreateVibe}
                    />
                  </div>
                )}
              </div>
            ) : mediaUrl !== "" && postType.includes("video") ? (
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
                  
                  {iconButtons()}

                  {isEditingText && (
                    <input
                      type="text"
                      value={imageText}
                      onChange={handleTextChange}
                      className="w-full bg-transparent text-black text-center text-lg focus:outline-none"
                      autoFocus
                    />
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {nextStep === false && (
            <>
              {mediaUrl === "" && postType === defaultPostType && (
                <div
                  className="flex flex-col items-center py-2 rounded-xl "
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <p className="text-xl my-4">Drag photos and videos here</p>
                  <span onClick={handleFileInputClick}>
                    <input
                      className="hidden"
                      type="file"
                      accept="media_type"
                      onChange={(e) => handleFileChange(e, "file")}
                    />
                    <Button
                      title={"Select from computer"}
                      className={
                        "w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
                      }
                    />
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateVibe;
