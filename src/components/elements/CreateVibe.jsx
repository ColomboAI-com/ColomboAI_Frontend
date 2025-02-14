/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect, useRef } from "react";
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
import MusicOverlay from "./MusicOverlay";
import { VideoEditor } from "./VideoEditor";
import CaptionBox from "./CaptionBox";
import ThreeDotMenu from "./ThreeDotMenu";
import EditCover from "./EditCover";
import axios from "axios";
import { Montserrat } from "@next/font/google";
import tmp_trim from "../../../public/images/vibes/tmp_trim.png";
import Image from "next/image";
import { set } from "date-fns";
import { VibeContext } from "@/context/VibeContext";
import CreateVibeErrorComponent from "../feed/vibes/CreateVibeError";
import ReactPlayer from "react-player";

const font = Montserrat({
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
  const {
    createVibe,
    vibes,
    setVibes,
    resetFeedValues,
    getVibes,
    loadings: vibeLoadings,
  } = useContext(VibeContext);

  const [isTrimming, setIsTrimming] = useState(false);
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const [isMemuOpen, setIsMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isSelectedTextIcon, setIsSelectedTextIcon] = useState(false);
  const [captionInput, setCaptionInput] = useState("");
  const [showError, setShowError] = useState(false);
  const [song_id, setSongId] = useState("");

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

  const handleSongSelect = (song) => {
    console.log(song);
    setSelectedSong(song);
    setDropdownVisible(false);
    setIsPlaying(true);
    setSongId(song.id.toString());
  };
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMusicReset = () => {
    setSelectedSong(null);
    setIsPlaying(false);
  };

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  const toggleDropdown = () => {
    setIsMagicPenOpen(false);
    setIsTrimming(false);
    setIsColorPickerVisible(false);
    setDropdownVisible(!isDropdownVisible);
    handleMusicReset();
  };

  function toggleColorPickerVisible() {
    setIsMagicPenOpen(false);
    setDropdownVisible(false);
    setIsTrimming(false);
    setIsColorPickerVisible(!isColorPickerVisible);
  }

  function toggleTrimming() {
    setIsMagicPenOpen(false);
    setDropdownVisible(false);
    setIsColorPickerVisible(false);
    setIsTrimming(!isTrimming);
  }

  function toogleMagicPen() {
    setIsTrimming(false);
    setIsColorPickerVisible(false);
    setDropdownVisible(false);
    setIsMagicPenOpen(!isMagicPenOpen);
  }

  const clearFileHandler = () => {
    setFile(null);
    setMediaUrl("");
    setPostType(defaultPostType);
  };

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type === "image") {
      setMediaUrl(result?.text);
      setPostType(result?.response_type);
    } else if (result?.response_type === "text") {
      setPostInput(result?.text);
      setCaptionInput(result?.text);
      setNextStep(false);
    }
    setIsMagicPenOpen(false); // Hide the Magic Pen input after generating
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
      file: file,
      type: postType,
      text: postInput,
      textColor,
      content: captionInput,
      song_id,
    });
    console.log(res);
    // if (res) {
    MessageBox("success", res.message);
    // let vibeData = [...vibes];
    // vibeData.unshift(res.data?.vibe);
    // setVibes(vibeData);
    resetFeedValues();
    getVibes();
    setIsCreateVibeOpen(false);
    setIsSelectedFromComputer(false);
    onReset();
    // }
  };

  const handleTrimVideo = (trimmedFile) => {
    setFile(trimmedFile);
    const fileUrl = URL.createObjectURL(trimmedFile);
    setMediaUrl(fileUrl);
    setIsTrimming(false);
    onFileUpload(trimmedFile);
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
  const imgRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(null);

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImageWidth(imgRef.current.clientWidth);
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      setImageWidth(imgRef.current.clientWidth);
    }
  }, [mediaUrl]);

  const shouldShowNextButton = () => {
    if (isMagicPenOpen || isColorPickerVisible) {
      return false;
    }
    return true;
  };

  const renderFormEditor = () => {};

  console.log(song_id, selectedSong);

  return (
    <main className={`h-full ${font.className}`}>
      {showError && <CreateVibeErrorComponent currentState={showError} />}
      {!isSelectedFromComputer ? (
        <div className="border-[1px] border-brandprimary flex flex-col justify-between rounded-[10px] h-[calc(100vh-200px)] no-scrollbar overflow-y-auto">
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
                Create New Vibes
              </p>
            </div>
            <button onClick={() => setIsCreateVibeOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
          {nextStep === false && (
            <>
              {mediaUrl === "" && postType === defaultPostType && (
                <div
                  className="flex flex-col items-center py-2 rounded-xl "
                  onDrop={handleDrop}
                  onDragOver={(event) => event.preventDefault()}
                >
                  <p className="text-xl mt-4">Drag photos and videos here</p>

                  <div className="py-5 text-center">
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
                        className={
                          "w-fit sm2:text-xl hover:bg-brandprimary/80 text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
                        }
                      >
                        <span className="hidden lg:block">
                          Select from computer
                        </span>
                        <span className="block lg:hidden">
                          Select from device
                        </span>
                      </button>
                    )}
                    <input
                      type="file"
                      accept="media_type" // Adjust media type as needed
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                  </div>

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
        </div>
      ) : null}
      {mediaUrl !== "" && postType.includes("image") ? (
        <>
          <div
            className={`relative h-full pb-6 md:py-6 ${
              isSelectedTextIcon ? "opacity-50" : ""
            } flex flex-col md:flex-row w-full justify-center`}
          >
            <div className="py-3 md:py-0 flex md:hidden">
              <button onClick={(e) => onReset()} className="mr-6">
                <BackButtonIcon w={20} h={20} fill={"#141212"} />
              </button>
              <div className="flex flex-row-reverse justify-between md:justify-start flex-1 md:flex-col">
                <div
                  className="ml-4"
                  onClick={(e) => console.log(isSelectedFromComputer)}
                >
                  <ThreeDotMenu setIsCreateVibeOpen={setIsCreateVibeOpen} />
                </div>
                <div className="flex items-center flex-1 md:flex-col h-full justify-center ml-4 gap-3">
                  <button
                    onClick={() => {
                      toogleMagicPen();
                      // setIsColorPickerVisible(!isColorPickerVisible);
                    }}
                    className={`p-2 rounded-full self-start ${
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
                      id="magic-pen"
                    />
                  </button>
                  <div className="flex items-center md:flex-col rounded-full md:py-5 self-start">
                    {!postType.includes("image") && (
                      <button
                        className={`w-10 h-10 flex flex-row justify-center items-center pt-1 pl-0.5 ${
                          isTrimming && `rounded-full bg-[#245FDF]`
                        }`}
                        onClick={(e) => toggleTrimming()}
                      >
                        <VideoEditIcon />
                      </button>
                    )}
                    <button
                      className={`w-10 h-10 flex flex-row justify-center items-center ${
                        isColorPickerVisible && `rounded-full bg-[#245FDF]`
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleColorPickerVisible();
                      }}
                    >
                      <TextShadowIcon />
                    </button>
                    <button
                      className={`w-10 h-10 flex flex-row justify-center items-center ${
                        isDropdownVisible && `rounded-full bg-[#245FDF]`
                      }`}
                      onClick={toggleDropdown}
                    >
                      <MusicNotePlusIcon />
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
            </div>
            <div className="hidden md:flex">
              <button onClick={(e) => onReset()} className="mr-6">
                <BackButtonIcon w={20} h={20} fill={"#141212"} />
              </button>
            </div>
            {/* <img
            key={mediaUrl}
            src={mediaUrl}
            alt="File Preview"
            className={`h-[32rem] object-contain rounded-[0.9rem]`}
            onClick={handleTextClick}
          /> */}
            <div className="relative h-full md:w-[470px] overflow-hidden">
              <img
                key={mediaUrl}
                ref={imgRef}
                src={mediaUrl}
                alt="File Preview"
                className="w-full h-full object-cover rounded-[1rem]"
                onClick={handleTextClick}
                onLoad={handleImageLoad}
              />
              <div
                className={`${
                  isMagicPenOpen ? "flex" : "hidden"
                } items-center absolute top-0 left-6 bottom-0 right-6 justify-center z-[100]`}
              >
                <div className="flex items-start w-full">
                  <div className="items-start w-full rounded-2xl border border-brandprimary">
                    <textarea
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      // onKeyDown={handleKeyDown}
                      placeholder="Create using Magic Pen"
                      className="flex  p-3 pr-12 rounded-2xl w-[calc(100%-2px)] min-h-[14vh] text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm  text- resize-none outline-none focus:ring-offset-0 focus:ring-0"
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
                        color="##141212"
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
              </div>
              {isTrimming ? (
                <VideoEditor
                  videoUrl={mediaUrl}
                  onTrim={handleTrimVideo}
                  onClose={() => setIsTrimming(false)}
                  setFile={setFile}
                />
              ) : // <Image
              //   src={tmp_trim}
              //   alt="none"
              //   className="absolute bottom-0 rounded-b-[0.9rem]"
              //   style={{ width: imageWidth ? `${imageWidth}px` : `auto` }}
              // />
              isDropdownVisible ? (
                <div
                  className="absolute bottom-0 rounded-b-[0.9rem] flex items-center justify-center z-10 w-full"
                  onClick={toggleDropdown}
                >
                  <div className="w-full" onClick={(e) => e.stopPropagation()}>
                    <MusicDropdown
                      setSongId={setSongId}
                      width={imageWidth}
                      onSongSelect={handleSongSelect}
                    />
                  </div>
                </div>
              ) : !nextStep ? (
                <div className="absolute bottom-0 left-0 right-0 z-[1]">
                  <CaptionBox
                    captionInput={captionInput}
                    setCaptionInput={setCaptionInput}
                    width={imageWidth}
                    handleCreateVibe={handleCreateVibe}
                    selectedSong={selectedSong}
                    loading={vibeLoadings.createVibe}
                  />
                </div>
              ) : shouldShowNextButton() ? (
                <Button
                  title={"NEXT"}
                  className={
                    "absolute bottom-4 left-1/2 transform -translate-x-1/2 w-fit sm:text-xs font-[500] text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-2 px-24 z-10"
                  }
                  loading={vibeLoadings.createVibe}
                  onClick={() => {
                    setNextStep(false);
                    setIsMagicPenOpen(false);
                  }}
                />
              ) : null}
              {isColorPickerVisible ? (
                <div draggable={true}>
                  <textarea
                    type="text"
                    placeholder="Dancing gracefully through life's rhythms"
                    value={postInput}
                    rows={4}
                    onChange={(e) => setPostInput(e.target.value)}
                    className="bg-transparent text-black text-center text-base focus:outline-none absolute bottom-[6rem] right-[1rem] text-wrap whitespace-normal w-[60%] h-auto"
                    autoFocus
                    style={{ color: textColor }}
                  />
                </div>
              ) : null}

              {selectedSong && (
                <MusicOverlay
                  song={selectedSong}
                  song_id={song_id}
                  isPlaying={isPlaying}
                  onPlayPause={handlePlayPause}
                  onClose={() => setSelectedSong(null)}
                  nextStep={nextStep}
                />
              )}
            </div>
            <div className="flex-col hidden md:flex">
              <div
                className="ml-4"
                onClick={(e) => console.log(isSelectedFromComputer)}
              >
                <ThreeDotMenu setIsCreateVibeOpen={setIsCreateVibeOpen} />
              </div>
              <div className="flex flex-col h-full justify-center ml-4 gap-3">
                <button
                  onClick={() => {
                    toogleMagicPen();
                    // setIsColorPickerVisible(!isColorPickerVisible);
                  }}
                  className={`p-2 rounded-full self-start ${
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
                <div className="flex flex-col rounded-full py-5 self-start">
                  {!postType.includes("image") && (
                    <button
                      className={`w-10 h-10 flex flex-row justify-center items-center pt-1 pl-0.5 ${
                        isTrimming && `rounded-full bg-[#245FDF]`
                      }`}
                      onClick={(e) => toggleTrimming()}
                    >
                      <VideoEditIcon />
                    </button>
                  )}
                  <button
                    className={`w-10 h-10 flex flex-row justify-center items-center ${
                      isColorPickerVisible && `rounded-full bg-[#245FDF]`
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleColorPickerVisible();
                    }}
                  >
                    <TextShadowIcon />
                  </button>
                  <button
                    className={`w-10 h-10 flex flex-row justify-center items-center ${
                      isDropdownVisible && `rounded-full bg-[#245FDF]`
                    }`}
                    onClick={toggleDropdown}
                  >
                    <MusicNotePlusIcon />
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

            {/* {!nextStep && (  <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 ">
  <Button
    title={"Share Vibe"}
    onClick={handleCreateVibe}
    className="w-fit sm2:text-xl text-white shadow-lg rounded-full bg-brandprimary py-2 px-8 hover:bg-green-500 transition duration-300"
  />
</div>
        )} */}

            {(isMagicPenOpen || isColorPickerVisible) && (
              <ColorPicker textColor={textColor} setTextColor={setTextColor} />
            )}

            {/* {isDropdownVisible && (
        <div className=" inset-0 flex items-center justify-center z-50" onClick={toggleDropdown}>
          <div onClick={(e) => e.stopPropagation()}>
            <MusicDropdown onSongSelect={handleSongSelect}/>
          </div>
        </div>
      )} */}

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
        </>
      ) : mediaUrl !== "" && postType.includes("video") ? (
        //           <ReactPlayer
        //             key={mediaUrl}
        //             autoPlay
        //             loop
        //             controls
        //             className="w-full aspect-video"
        //           >
        //             <source src={mediaUrl} />
        //           </video>

        <div
          className={`relative h-full ${
            isSelectedTextIcon ? "opacity-50" : ""
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
          <div className="relative overflow-hidden h-full max-w-[470px] bg-black rounded-[20px]">
            {!isTrimming && (
              <ReactPlayer
                key={mediaUrl}
                ref={imgRef}
                url={mediaUrl}
                alt="File Preview"
                width="100%"
                height="100%"
                className="w-full !h-full object-contain rounded-[0.9rem]"
                onClick={handleTextClick}
                onLoad={handleImageLoad}
                playing={true}
                loop={true}
                controls={false}
              />
            )}
            {isTrimming ? (
              // <Image
              //   src={tmp_trim}
              //   alt="none"
              //   className="absolute bottom-0 rounded-b-[0.9rem]"
              //   style={{ width: imageWidth ? `${imageWidth}px` : `auto` }}
              // />
              <VideoEditor // child component
                videoUrl={mediaUrl}
                onTrim={handleTrimVideo}
                onClose={() => setIsTrimming(false)}
              />
            ) : isDropdownVisible ? (
              <div
                className="absolute bottom-0 rounded-b-[0.9rem] flex items-center justify-center z-10 w-full left-0 right-0"
                onClick={toggleDropdown}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <MusicDropdown
                    setSongId={setSongId}
                    width={imageWidth}
                    onSongSelect={handleSongSelect}
                  />
                </div>
              </div>
            ) : !nextStep ? (
              <div className="absolute bottom-0 left-0 right-0 z-[1]">
                <CaptionBox
                  captionInput={captionInput}
                  setCaptionInput={setCaptionInput}
                  width={imageWidth}
                  handleCreateVibe={handleCreateVibe}
                  loading={vibeLoadings.createVibe}
                />
              </div>
            ) : shouldShowNextButton() ? (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button
                  title={"NEXT"}
                  className={
                    "w-fit sm:text-xs font-[500] text-blue-500 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-white py-2 px-24 z-10"
                  }
                  loading={loadings?.createVibe}
                  onClick={() => {
                    setNextStep(false);
                    setIsMagicPenOpen(false);
                  }}
                />
              </div>
            ) : null}
            {isColorPickerVisible ? (
              <div draggable={true}>
                <textarea
                  type="text"
                  placeholder="Dancing gracefully through life's rhythms"
                  value={postInput}
                  rows={4}
                  onChange={(e) => setPostInput(e.target.value)}
                  className="bg-transparent text-black text-center text-base focus:outline-none absolute bottom-[6rem] right-[1rem] text-wrap whitespace-normal w-[60%] h-auto"
                  autoFocus
                  style={{ color: textColor }}
                />
              </div>
            ) : null}

            {selectedSong && (
              <MusicOverlay
                song={selectedSong}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onClose={() => setSelectedSong(null)}
                nextStep={nextStep}
              />
            )}
          </div>
          <div className="flex flex-col">
            <div
              className="ml-4"
              onClick={(e) => console.log(isSelectedFromComputer)}
            >
              <ThreeDotMenu setIsCreateVibeOpen={setIsCreateVibeOpen} />
            </div>
            <div className="flex flex-col h-full justify-center ml-4 gap-3">
              <button
                onClick={() => {
                  toogleMagicPen();
                  // setIsColorPickerVisible(!isColorPickerVisible);
                }}
                className={`p-2 rounded-full self-start ${
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
              <div className="flex flex-col rounded-full py-5 self-start">
                <button
                  className={`w-10 h-10 flex flex-row justify-center items-center pt-1 pl-0.5 ${
                    isTrimming && `rounded-full bg-[#245FDF]`
                  }`}
                  onClick={(e) => {
                    toggleTrimming(); // This triggers video editor to display
                  }}
                >
                  <VideoEditIcon />
                </button>
                <button
                  className={`w-10 h-10 flex flex-row justify-center items-center ${
                    isColorPickerVisible && `rounded-full bg-[#245FDF]`
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleColorPickerVisible();
                  }}
                >
                  <TextShadowIcon />
                </button>
                <button
                  className={`w-10 h-10 flex flex-row justify-center items-center ${
                    isDropdownVisible && `rounded-full bg-[#245FDF]`
                  }`}
                  onClick={toggleDropdown}
                >
                  <MusicNotePlusIcon />
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

          {/* {isDropdownVisible && (
        <div className=" inset-0 flex items-center justify-center z-50" onClick={toggleDropdown}>
          <div onClick={(e) => e.stopPropagation()}>
            <MusicDropdown onSongSelect={handleSongSelect}/>
          </div>
        </div>
      )} */}

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
      ) : (
        ""
      )}
    </main>
  );
};

export default CreateVibe;
