/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from "react";
import {
  BackButtonIcon,
  CloseDocumentIcon,
  CreateMagicPenIcon,
  CrossIcon,
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
import axios from "axios";
import { Plus_Jakarta_Sans } from "@next/font/google";
import tmp_trim from "../../../public/images/vibes/tmp_trim.png";
import Image from "next/image";
import { set } from "date-fns";
import { VibeContext } from "@/context/VibeContext";
import CreateVibeErrorComponent from "../feed/vibes/CreateVibeError";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const CreateVibe = ({
  uploadedFile,
  onFileUpload,
  uploadedPostType,
  uploadedMediaUrl,
  uploadedNextStep,
  onReset,
}) => {
  const [isMagicPenOpen, setIsMagicPenOpen] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [postInput, setPostInput] = useState("");
  const [file, setFile] = useState(uploadedFile);
  const [mediaUrl, setMediaUrl] = useState(uploadedMediaUrl);
  const defaultPostType = "thought";
  const [postType, setPostType] = useState(uploadedPostType);
  const [nextStep, setNextStep] = useState(uploadedNextStep);
  const { generatePost, createPost, loadings, posts, setPosts } =
    useContext(FeedContext);
  const {
    setIsCreateVibeOpen,
    isSelectedFromComputer,
    setIsSelectedFromComputer,
  } = useContext(GlobalContext);
  const { getVibes, createVibe, vibes, setVibes } = useContext(VibeContext);

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
  const [captionInput, setCaptionInput] = useState("");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  useEffect(() => {
    if (file) {
      onFileUpload(file);
      setIsSelectedFromComputer(true);
    }
  }, [file, setFile]);

  const iconButtons = () => {
    return (
      <div className="w-16 bg-gray-900 flex flex-col items-center py-4 space-y-4">
        <button
          onClick={() => {
            toogleMagicPen();
            setIsColorPickerVisible(!isColorPickerVisible);
          }}
          className={`p-2 rounded-full ${isMagicPenOpen
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
    const res = await createVibe({
      file,
      type: postType,
      text: postInput,
      textColor,
      caption: captionInput,
    });
    if (res) {
      MessageBox("success", res.message);
      let vibeData = [...vibes];
      vibeData.unshift(res.data?.vibe);
      setVibes(vibeData);
      setIsCreateVibeOpen(false);
    }
  };

  const handleTrimVideo = (trimmedUrl) => {
    setTrimmedVideoUrl(trimmedUrl);
    setIsTrimming(false); // Close the trimming modal
  };

  // Handlers to add text to vibe
  const handleTextClick = () => {
    // setIsEditingText(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleVibeValidation = () => {
    // to-do task
    // call this method whenever there is error while creating a vibe
    setShowError(!showError);
  };

  return (
    <main className={plusJakartaSans.className}>
      {showError && <CreateVibeErrorComponent currentState={showError} />}
      {!isSelectedFromComputer ? (
        <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto">
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
              <p className="pl-[17px]  text-2xl  tracking-wider ">
                Create new Vibes
              </p>
            </div>
            <button onClick={() => setIsCreateVibeOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>
      ) : null}
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
          className={`relative my-8 pb-8 ${isSelectedTextIcon ? "opacity-50" : ""
            } flex flex-row w-full justify-center`}
        >
          <div>
            <button onClick={(e) => onReset()} className="mr-6">
              <BackButtonIcon w={20} h={20} fill={"#F2F2F7"} />
            </button>
          </div>
          {/* <img
            key={mediaUrl}
            src={mediaUrl}
            alt="File Preview"
            className={`h-[32rem] object-contain rounded-[0.9rem]`}
            onClick={handleTextClick}
          /> */}
          <div className="relative h-[32rem]">
            <img
              key={mediaUrl}
              src={mediaUrl}
              alt="File Preview"
              className="w-full h-full object-contain rounded-[0.9rem]"
              onClick={handleTextClick}
            />
            {isTrimming ? (
              <Image
                src={tmp_trim}
                alt="none"
                className="absolute bottom-0 rounded-b-[0.9rem]"
              />
            ) : (
              <Button
                title={"NEXT"}
                className={
                  "absolute bottom-4 right-[2.5rem] w-fit sm:text-xs font-[500] text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-2 px-24 z-10"
                }
                loading={loadings?.createVibe}
                onClick={() => {
                  setNextStep(false);
                  setIsMagicPenOpen(false);
                }}
              />
            )}
            {isColorPickerVisible ?
              <div draggable={true}>
                <textarea
                  type="text"
                  placeholder="Dancing gracefully through life's rhythms"
                  value={postInput}
                  rows={4}
                  onChange={(e) => setPostInput(e.target.value)}
                  className="bg-transparent text-black text-center text-base focus:outline-none absolute bottom-[6rem] right-[1rem] text-wrap whitespace-normal w-[60%] h-auto"
                  autoFocus
                />
              </div>
              : null}
          </div>
          <div className="flex flex-col">
            <div className="ml-4" onClick={e => console.log(isSelectedFromComputer)}>
              <ThreeDotMenu setIsCreateVibeOpen={setIsCreateVibeOpen} />
            </div>
            <div className="flex flex-col h-full justify-center ml-4 gap-3">
              <button
                onClick={() => {
                  toogleMagicPen();
                  setIsColorPickerVisible(!isColorPickerVisible);
                }}
                className={`p-2 rounded-full self-start ${isMagicPenOpen
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
              <div className="flex flex-col rounded-full bg-gray-400 py-5 self-start">
                <button
                  className={`w-10 h-10 flex flex-row justify-center items-center pt-1 pl-0.5 ${isTrimming && `rounded-full bg-[#245FDF]`
                    }`}
                  onClick={(e) => setIsTrimming(!isTrimming)}
                >
                  <VideoEditIcon />
                </button>
                <button
                  className="w-10 h-10 flex flex-row justify-center items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsColorPickerVisible(!isColorPickerVisible);
                  }}
                >
                  <TextShadowIcon />
                </button>
                <button className="w-10 h-10 flex flex-row justify-center items-center" onClick={toggleDropdown}>
                  <MusicNotePlusIcon/>
                </button>
              </div>
              {/* {isEditingText && (
                <input
                  type="text"
                  placeholder="text created manually"
                  value={text}
                  onChange={handleTextChange}
                  className="w-full bg-transparent text-black text-center text-lg focus:outline-none"
                  autoFocus
                  style={{ color: textColor }}
                />
              )} */}
            </div>
          </div>
          {(isMagicPenOpen || isColorPickerVisible) && (
            <ColorPicker textColor={textColor} setTextColor={setTextColor} />
          )}
          {/* Changes */}
         {isDropdownVisible && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
   
      <MusicDropdown onClose={() => setDropdownVisible(false)}/>
  </div>
)}

          {nextStep && !isMagicPenOpen && (
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              {/* <Button
                title={"NEXT"}
                className={
                  "w-fit sm:text-xs font-[500] text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-2 px-24 "
                }
                loading={loadings?.createVibe}
                onClick={() => {
                  setNextStep(false);
                  setIsMagicPenOpen(false);
                }}
              /> */}
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

              {/* {isDropdownVisible && (
                <MusicDropdown onClose={() => setDropdownVisible(false)} />
              )} */}

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
      {isSelectedFromComputer ? <CaptionBox
        captionInput={captionInput}
        setCaptionInput={setCaptionInput}
      /> : null}
      {isSelectedFromComputer ? <div className="w-full flex flex-row justify-center pb-3"><Button
        title={"Share Reel"}
        onClick={handleCreateVibe}
        className={
          "w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
        }
      /></div> : null}
    </main>
  );
};

export default CreateVibe;
