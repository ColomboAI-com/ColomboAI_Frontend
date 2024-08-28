/* eslint-disable @next/next/no-img-element */
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
import { ThreeDots } from "react-loader-spinner";
import ColorPicker from "./ColorPicker";
import MusicDropdown from './MusicDropdown';
import { VideoEditor } from './VideoEditor'; 
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
  const { setIsCreateVibeOpen, isSelectedFromComputer, setIsSelectedFromComputer } =
    useContext(GlobalContext);

  const [isTrimming, setIsTrimming] = useState(false); // Trimming state
  const [trimmedVideoUrl, setTrimmedVideoUrl] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [imageText, setImageText] = useState("");
  const [isEditingText, setIsEditingText] = useState(false);
  const [isMemuOpen, setIsMenuOpen] = useState(false);
  const [textColor, setTextColor] = useState("#000000");
  const [isColorPickerVisible, setIsColorPickerVisible] = useState(false);
  const [isSelectedTextIcon, setIsSelectedTextIcon] = useState(false);

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
          {/* Placeholder for buttons */}
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-gray-300" 
          onClick={(e) => {
            e.stopPropagation();
            setIsColorPickerVisible(!isColorPickerVisible);
          }}>
          {/* Placeholder for buttons */}
        </button>
        <button className="w-10 h-10 rounded-full bg-gray-300">
          {/* Placeholder for buttons */}
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
    setImageText(e.target.value);
  };

  // Handlers for 3-dots menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMemuOpen);
  };

  const handleSaveToDrafts = () => {
    console.log("Saving to drafts");
    setIsMenuOpen(false);
  };

  const handleDiscard = () => {
    console.log("Discarding");
    setIsMenuOpen(false);
    setIsCreateVibeOpen(false);
  };

  return (
    <>
      <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto  font-sans">
        <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
          <div className={`${!nextStep ? "p-[10px]" : " justify-center"}`}>
            {nextStep && (
              <button
                onClick={() => {
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
              <button onClick={toggleMenu}>3-dot menu placeholder</button>
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

        <div
          className="pt-[19px] flex flex-col items-center gap-2 border-b-2 border-#BCB9B9"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <p className="text-lg text-brandprimary font-sans">
            {isSelectedFromComputer ? "Upload or Drag & Drop Media" : "Create a new Vibe"}
          </p>
          <div className="pt-3 text-center">
            {file ? (
              <>
                <img src={mediaUrl} alt="media" className="object-contain w-48 h-48" />
                <div className="flex justify-between items-center w-full px-4 py-2 border-t border-gray-200">
                  <button onClick={clearFileHandler} className="text-red-500">
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
                Select File
              </button>
            )}
            <input
              type="file"
              accept="media_type" // Adjust media type as needed
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
        </div>

        {isMagicPenOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              right: "60px",
              zIndex: 1000,
            }}
          >
            <ColorPicker
              color={textColor}
              onChange={(color) => setTextColor(color.hex)}
              onClose={() => setIsColorPickerVisible(false)}
            />
          </div>
        )}

        {isTrimming && (
          <VideoEditor
            videoUrl={mediaUrl}
            onTrim={handleTrimVideo}
            onClose={() => setIsTrimming(false)}
          />
        )}

        {isDropdownVisible && (
          <MusicDropdown
            onClose={() => setDropdownVisible(false)}
          />
        )}
      </div>

      {/* Add a text overlay feature */}
      {isEditingText && (
        <div className="absolute top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <textarea
            value={imageText}
            onChange={handleTextChange}
            className="bg-white p-2 rounded border border-gray-300"
          />
          <button onClick={() => setIsEditingText(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default CreateVibe;
