import { CloseDocumentIcon, CrossIcon, SelectPictureIcon } from "../Icons";
import Button from "@/elements/Button";
import { useMessages } from "@/context/MessagesContext";

const SelectPicture = () => {
  const {
    setIsFileMessageModalOpen,
    messageFile,
    setMessageFile,
    sendMessage,
    loadings,
  } = useMessages();

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click();
  };

  const clearFileHandler = () => {
    setMessageFile(null);
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    setMessageFile(selectedFiles[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    setMessageFile(droppedFiles[0]);
  };

  return (
    <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[62vh] no-scrollbar overflow-y-auto font-sans">
      <div className="relative flex items-center justify-center pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
        <div className="flex items-center">
          <p className="pl-[17px] md:text-2xl text-base font-sans tracking-wider text-center">
            Select Picture
          </p>
        </div>
        <div className="flex items-center gap-6 absolute right-4">
          <button
            onClick={() => setIsFileMessageModalOpen(false)}
            className="cursor-pointer"
          >
            <CrossIcon w={20} h={20} fill={"#1E71F2"} />
          </button>
        </div>
      </div>
      <div className=" px-10 font-sans border- border-purple-400 flex flex-col justify-between h-[50vh] ">
        {messageFile ? (
          <div className="flex justify-center relative my-8 w-[350px] mx-auto">
            {!messageFile?.type?.includes("video") ? (
              <img
                src={URL.createObjectURL(messageFile)}
                alt="File Preview"
                className="w-[100px] h-[200px] object-contain"
              />
            ) : (
              <video
                src={URL.createObjectURL(messageFile)}
                className="aspect-video object-cover rounded-2xl"
                controls
              >
                Your browser does not support the video tag.
              </video>
            )}
            <div className=" absolute top-3 right-2">
              <div className="flex flex-row items-center justify-center">
                <span
                  onClick={clearFileHandler}
                  className="px-2 pointer cursor-pointer"
                >
                  <CloseDocumentIcon />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-full relative">
            <img
              alt="select-picture"
              src="/images/select-img.png"
              className="md:h-24 md:w-24 h-14 w-14 mt-10"
            />
            <div className="">
              <p className="md:text-xl text-sm my-4 text-center">
                Drag photos and videos here
              </p>
            </div>
            <input
              className="absolute h-full w-full z-[1] opacity-0"
              type="file"
              accept="media_type"
              onChange={(e) => handleFileChange(e, "file")}
            />
          </div>
        )}
        {!messageFile ? (
          <div
            className="flex flex-col items-center py-2"
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <span onClick={handleFileInputClick}>
              <Button
                title={"Select from computer"}
                className={
                  "w-fit md:text-base text-xs text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary md:py-3 md:px-8 py-4 px-4"
                }
              />
            </span>
          </div>
        ) : (
          <div className="flex justify-center py-2 ">
            <Button
              title={"SEND"}
              className={
                "w-fit md:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24"
              }
              loading={loadings.sendMsg}
              onClick={sendMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectPicture;
