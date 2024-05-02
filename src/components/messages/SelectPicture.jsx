/* eslint-disable @next/next/no-img-element */
import { useContext, useState } from "react";
import {
  BackButtonIcon,
  CloseDocumentIcon,
  CreateMagicPenIcon,
  CrossIcon,
  SelectPictureIcon,
  SendIcon,
} from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import { GlobalContext } from "@/context/GlobalContext";
import { ThreeDots } from "react-loader-spinner";
import Button from "@/elements/Button";

const SelectPicture = () => {
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("");

  const { setIsSelectPictureMessageOpen } = useContext(GlobalContext);

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  const clearFileHandler = () => {
    setFile(null);
    setMediaUrl("");
    setMediaType("");
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = Array.from(selectedFiles);
      setFile(newFiles);
      setMediaUrl(URL.createObjectURL(newFiles[0]));
      setMediaType(newFiles[0]?.type);
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      setFile(newFiles);
      setMediaUrl(URL.createObjectURL(newFiles[0]));
      setMediaType(newFiles[0]?.type);
    }
  };

  return (
    <>
      <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[62vh] no-scrollbar overflow-y-auto  font-sans">
        <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
          <div></div>
          <div className="flex items-center">
            <p className="pl-[17px]  text-2xl font-sans tracking-wider ">
              Select Picture
            </p>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSelectPictureMessageOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>
        <div className=" px-10 font-sans border- border-purple-400 flex flex-col justify-between h-[60vh] ">
          {mediaUrl !== "" && mediaType.includes("image") ? (
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
          ) : mediaUrl !== "" && mediaType.includes("video") ? (
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
          ) : (
            <div className="flex justify-center items-center h-full">
              <SelectPictureIcon w={209} h={209} fill={"#979797"} />
            </div>
          )}
          {mediaUrl === "" && mediaType === "" ? (
            <div
              className="flex flex-col items-center py-2 border-2 border-dashed rounded-xl "
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
                    "w-fit md:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
                  }
                />
              </span>
            </div>
          ) : (
            <div className="flex justify-center py-2 ">
              <Button
                title={"SEND"}
                className={
                  "w-fit md:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24 "
                }
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectPicture;
