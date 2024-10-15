import React from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { BackButtonIcon, CreateMagicPenIcon, MusicNotePlusIcon, TextShadowIcon } from "../Icons";
import ThreeDotMenuStory from "./ThreeDotMenuStory";

import { useContext, useEffect, useState, useRef } from "react";
import { Montserrat } from "@next/font/google";
import MusicDropDown from "./MusicDropDown";
import MusicOverlay from "./MusicOverlay";
import Image from "next/image";
import center_aligned_icon from "../../../public/images/icons/center_aligned_icon.svg";
import { CirclePicker } from "react-color";
import Draggable from "react-draggable";
import StoryMagicText from "./StoryMagicText";
import music_check from "../../../public/images/icons/music_check.svg";
import musicIcon from "../../../public/images/icons/musicIcon.svg";
import { StoryContext } from "@/context/StoryContext";

const font = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

const CreateStory = ({}) => {
  const {
    storyMediaURL,
    setStoryMediaURL,
    setStoryMediaType,
    setIsSelectedFromComputer,
    storyMediaType,
    storyCaptionBool,
    storyFile,
  } = useContext(GlobalContext);
  const imgRef = useRef(null);
  const [createText, setCreateText] = useState(false);
  const [addMusic, setAddMusic] = useState(false);
  const [songId, setSongId] = useState("");
  const [imageWidth, setImageWidth] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMagicPenOpen, setIsMagicPenOpen] = useState(false);
  const [postInput, setPostInput] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [captionInput, setCaptionInput] = useState("");
  const [confirmSong, setConfirmSong] = useState(false);

  const { createStory } = useContext(StoryContext);

  const toggleText = () => {
    setIsMagicPenOpen(false);
    setAddMusic(false);
    setCreateText(!createText);
  };
  const toggleMusic = () => {
    setCreateText(false);
    setIsMagicPenOpen(false);
    setAddMusic(!addMusic);
  };

  const handleImageLoad = () => {
    if (imgRef.current) {
      setImageWidth(imgRef.current.clientWidth); // Set width when image is fully loaded
    }
  };

  useEffect(() => {
    if (imgRef.current) {
      setImageWidth(imgRef.current.clientWidth);
    }
  }, [storyMediaURL]);
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    // setAddMusic(false);
    setIsPlaying(true);
  };
  const handleChangeComplete = (color) => {
    setTextColor(color.hex);
  };
  const toggleMagicPen = () => {
    setCreateText(false);
    setAddMusic(false);
    setIsMagicPenOpen(!isMagicPenOpen);
  };

  const handleCreateStory = async () => {
    const res = await createStory({
      fileType: storyFile.type.split("/")[0],
      file: storyFile,
      content: "Default Content",
    });
    console.log(res);
    if (res.success) {
      window.location.reload();
    }
  };

  return (
    <div className={`flex flex-row w-full h-full justify-center py-[3.5rem] ${font.className}`}>
      <div>
        <button
          onClick={(e) => (setStoryMediaType(""), setStoryMediaURL(""), setIsSelectedFromComputer(false))}
          className="mr-6"
        >
          <BackButtonIcon w={20} h={20} fill={"#F2F2F7"} />
        </button>
      </div>
      <div className="relative max-h-[32rem] overflow-hidden">
        <img
          key={storyMediaURL}
          ref={imgRef}
          src={storyMediaURL}
          alt="File Preview"
          className="w-full h-full object-contain max-h-[32rem] rounded-[0.9rem]"
          //   onClick={handleTextClick}
          onLoad={handleImageLoad}
        />
        <div className="flex justify-center">
        <button className="absolute bottom-0 mb-2 p-3 w-full text-white bg-gray-400 bg-opacity-30 backdrop-filter backdrop-blur-md rounded-[100px]" onClick={handleCreateStory}>
          Share Story
        </button>
        </div>
        {addMusic && (
          <div
            className="absolute bottom-0 rounded-b-[0.9rem] flex items-center justify-center z-10"
            onClick={toggleMusic}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <MusicDropDown setSongId={setSongId} width={imageWidth} onSongSelect={handleSongSelect} />
            </div>
          </div>
        )}
        {selectedSong && !confirmSong && (
          <MusicOverlay
            song={selectedSong}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onClose={() => setSelectedSong(null)}
          />
        )}
        {selectedSong && confirmSong && (
          <div className="w-full flex flex-row items-center justify-center">
            <div className="absolute bottom-[3rem] gap-4 flex flex-row items-center justify-center z-1 bg-[#1E71F2] p-4 rounded-md">
              <Image src={musicIcon} alt="colombo" />
              <div className="flex flex-col justify-cener">
                <p className="text-white font-medium text-sm text-wrap">{selectedSong.name}</p>
                <p className="text-white text-xs text-wrap">by {selectedSong.artist_name}</p>
              </div>
            </div>
          </div>
        )}
        {(createText || postInput != "") && (
          <Draggable bounds="parent">
            <textarea
              type="text"
              placeholder="Dancing gracefully through life's rhythms"
              value={postInput}
              rows={4}
              onChange={(e) => setPostInput(e.target.value)}
              className="bg-transparent text-start text-base focus:outline-none absolute bottom-[6rem] right-[1rem] text-wrap whitespace-normal w-[60%] h-auto"
              style={{ color: textColor, resize: "none" }}
            />
          </Draggable>
        )}
        {(isMagicPenOpen || storyCaptionBool) && (
          <Draggable bounds="parent">
            <div className="absolute bottom-0">
              <StoryMagicText
                captionInput={captionInput}
                setCaptionInput={setCaptionInput}
                width={imageWidth}
              />
            </div>
          </Draggable>
        )}
        {createText && (
          <div className="absolute bottom-0 flex justify-center items-center w-full">
            <CirclePicker color={textColor} onChangeComplete={(color) => handleChangeComplete(color)} />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="ml-4">
          <ThreeDotMenuStory />
        </div>
        <div className="flex flex-col items-center h-full justify-center ml-4 gap-3">
          <button
            onClick={() => {
              toggleMagicPen();
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
          {selectedSong && !confirmSong && (
            <Image
              onClick={(e) => setConfirmSong(!confirmSong)}
              src={music_check}
              alt="colombo"
              className="w-8 cursor-pointer"
            />
          )}
          <div className="flex flex-col items-center rounded-full bg-gray-400 py-5">
            <button
              className={`w-10 h-10 flex flex-row justify-center items-center pl-0.5 ${
                createText && `rounded-full bg-[#245FDF]`
              }`}
              onClick={(e) => toggleText()}
            >
              <TextShadowIcon />
            </button>
            <button
              className={`w-10 h-10 flex flex-row justify-center items-center ${
                addMusic && `rounded-full bg-[#245FDF]`
              }`}
              onClick={(e) => toggleMusic()}
            >
              <MusicNotePlusIcon />
            </button>
          </div>
          <button
            className={`p-2 w-10 h-10 rounded-full flex flex-row justify-center items-center bg-gray-400 outline-none`}
          >
            <Image alt="colombo" src={center_aligned_icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
