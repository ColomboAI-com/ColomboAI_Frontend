/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from "react";
import {
  BackButtonIcon,
  CloseDocumentIcon,
  CreateMagicPenIcon,
  CrossIcon,
  FaceWithPeekingEye,
  MusicNotePlusIcon,
  SendIcon,
  TextShadowIcon,
  VideoEditIcon,
  VideoIcon,
} from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import { GlobalContext } from "@/context/GlobalContext";
import Button from "@/elements/Button";
import { MessageBox } from "../MessageBox";
import { ThreeDots } from "react-loader-spinner";
import ColorPicker from "./ColorPicker";
import MusicDropdown from "./MusicDropDown";
import { VideoEditor } from "./VideoEditor";
import next from "next";
import CaptionBox from "./CaptionBox";
import ThreeDotMenu from "./ThreeDotMenu";
import EditCover from "./EditCover";

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
  const {
    setIsCreateVibeOpen,
    isSelectedFromComputer,
    setIsSelectedFromComputer,
  } = useContext(GlobalContext);

  const [isTrimming, setIsTrimming] = useState(false); // Trimming state
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [text, setText] = useState("");
  // const [imageText, setImageText] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const [isMemuOpen, setIsMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isSelectedTextIcon, setIsSelectedTextIcon] = useState(false);
  const [isMagicPenInputVisible, setIsMagicPenInputVisible] = useState(true);
  const [showError,setShowError]  = useState(false)
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
        <button
          onClick={() => {
            toogleMagicPen();
            setIsColorPickerVisible(!isColorPickerVisible);
          }}
          className={`p-2 rounded-full ${
            isMagicPenOpen
              ? "bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B]"
              : "bg-white"
          } outline-none focus:ring-offset-0 focus:ring-0`}
        >
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
        <button className="w-10 h-10 rounded-full bg-gray-300">
          <VideoEditIcon />
        </button>
        <button
          className="w-10 h-10 rounded-full bg-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsColorPickerVisible(!isColorPickerVisible);
          }}
        >
          <TextShadowIcon />
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-300">
          <MusicNotePlusIcon />
        </button>
      </div>
    );
  };

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  function toggleColorPickerVisible() {
    setIsColorPickerVisible(!isColorPickerVisible);
  }

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
    setIsMagicPenInputVisible(false); // Hide the Magic Pen input after generating
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

  const handleTrimVideo = (trimmedUrl) => {
    setTrimmedVideoUrl(trimmedUrl);
    setIsTrimming(false); // Close the trimming modal
  };

  // Handlers to add text to vibe
  const handleTextClick = () => {
    setIsEditingText(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleError = ()=>{
      setShowError(!showError)
  }
  return (
    <>
    {showError && 
    <div className="fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center ">
    <div className="bg-white    
rounded-[10px] p-4 h-[267px] w-[350px] border border-0.5 border-[#F7F7F7] ">
  <div className="flex float-end cursor-pointer" onClick={()=>handleError()}>
  <CrossIcon w={12} h={12} fill={'#515151'}/>
  </div>
  <div className="flex justify-center">
    <FaceWithPeekingEye  />
  </div>
  <div className="mt-8">
  
  Your Vibe is epic, but it's a bit too long and heavy! Keep it under 1 GB, shorter than 10 minutes, and in MP4, MOV, AVI, or WMV format. Let's make this Vibe rock!
  </div>
  </div>
  </div>
    }
      {!isSelectedFromComputer ? (
        <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto  font-sans">
          <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
            <div className={`${!nextStep ? "p-[10px]" : " justify-center"}`}>
              {nextStep && (
                <button
                  onClick={() => {
                    setNextStep(false);
                    setIsSelectedFromComputer(true);
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
            <button onClick={() => setIsCreateVibeOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button>
            <BackButtonIcon w={20} h={20} fill={"#515151"} />
          </button>
          <ThreeDotMenu setIsCreateVibeOpen={setIsCreateVibeOpen} />
          <EditCover />
        </div>
      )}

      <div className={`${isMagicPenOpen ? "flex" : "hidden"} items-start`}>
        <div className="items-start w-full rounded-2xl p-[1px] bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B]">
          <textarea
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            // onKeyDown={handleKeyDown}
            placeholder="Create using Magic Pen"
            className="flex  p-3 pr-12 rounded-2xl m-[1px] w-[calc(100%-2px)] min-h-[14vh] text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm  text- resize-none outline-none focus:ring-offset-0 focus:ring-0"
          />
        </div>
        <button
          className=" -ml-12 mt-3 "
          onClick={() => {
            handleGenerateVibe();
            setNextStep(true);
          }}
        >
          {loadings?.generatePost ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              color="#1E71F2"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <SendIcon
              w={32}
              h={32}
              fill={promptInput !== "" ? "#1E71F2" : "#E3E3E3"}
            />
          )}
        </button>
      </div>

      {mediaUrl !== "" && postType.includes("image") ? (
        <div
          className={`relative my-8 ${isSelectedTextIcon ? "opacity-50" : ""}`}
        >
          <img
            key={mediaUrl}
            src={mediaUrl}
            alt="File Preview"
            className={`w-full h-full object-contain`}
            onClick={handleTextClick}
          />

          <div className=" absolute top-3 right-2">
            {iconButtons()}

            {isEditingText && (
              <input
                type="text"
                placeholder="text created manually"
                value={text}
                onChange={handleTextChange}
                className="w-full bg-transparent text-black text-center text-lg focus:outline-none"
                autoFocus
                style={{ color: textColor }}
              />
            )}

            <textarea
              value={postInput}
              placeholder="text to be created by magic pen"
              onChange={(e) => setPostInput(e.target.value)}
              style={{ color: textColor }}
            />
          </div>

          {(isMagicPenOpen || isColorPickerVisible) && (
            <ColorPicker textColor={textColor} setTextColor={setTextColor} />
          )}

          {nextStep && !isMagicPenOpen && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <Button
                title={"NEXT"}
                className={
                  "w-fit sm2:text-xl text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-4 px-24 "
                }
                loading={loadings?.createVibe}
                onClick={() => {
                  setNextStep(false);
                  setIsMagicPenOpen(false);
                }}
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
          </div>
        </div>
      ) : (
        ""
      )}

      {nextStep === false && (
        <>
          {mediaUrl === "" && postType === defaultPostType && (
            <div
              className="flex flex-col items-center py-2 rounded-xl "
              onDrop={handleDrop}
              onDragOver={(event) => event.preventDefault()}
            >
              <p className="text-xl my-4">Drag photos and videos here</p>

              <div className="pt-3 text-center">
                {file ? (
                  <>
                    <img
                      src={mediaUrl}
                      alt="media"
                      className="object-contain w-48 h-48"
                    />
                    <div className="flex justify-between items-center w-full px-4 py-2 border-t border-gray-200">
                      <button
                        onClick={clearFileHandler}
                        className="text-red-500"
                      >
                        <CloseDocumentIcon w={20} h={20} />
                      </button>
                      <button
                        onClick={() => {
                          if (postType === "video") {
                            setIsTrimming(true); // Open the trimming modal
                          } else {
                            handleCreateVibe();
                          }
                        }}
                        className="text-blue-500"
                      >
                        <SendIcon w={20} h={20} />
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={handleFileInputClick}
                    className="text-blue-500 border border-blue-500 px-4 py-2 rounded"
                  >
                    Select from computer
                  </button>
                )}
                <input
                  type="file"
                  accept="media_type" // Adjust media type as needed
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>

              {isTrimming && (
                <VideoEditor
                  videoUrl={mediaUrl}
                  onTrim={handleTrimVideo}
                  onClose={() => setIsTrimming(false)}
                />
              )}

              {isDropdownVisible && (
                <MusicDropdown onClose={() => setDropdownVisible(false)} />
              )}

              {/* <span onClick={handleFileInputClick}>
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
              </span> */}
            </div>
          )}
        </>
      )}

      <CaptionBox />

      <Button
        title={"Share Reel"}
        onClick={()=>handleError()}
        className={
          "w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
        }
      />
    </>
  );
};

export default CreateVibe;
