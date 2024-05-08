import { CloseDocumentIcon, CrossIcon, SelectPictureIcon } from "../Icons"
import Button from "@/elements/Button"
import { useMessages } from "@/context/MessagesContext"

const SelectPicture = () => {

  const { setIsFileMessageModalOpen, messageFile, setMessageFile, sendMessage, loadings } = useMessages()

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click()
  }

  const clearFileHandler = () => {
    setMessageFile(null)
  }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files
    setMessageFile(selectedFiles[0])
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    setMessageFile(droppedFiles[0])
  }

  return (
    <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[62vh] no-scrollbar overflow-y-auto font-sans">
      <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
        <div className="flex items-center">
          <p className="pl-[17px]  text-2xl font-sans tracking-wider ">
            Select Picture
          </p>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsFileMessageModalOpen(false)} className="cursor-pointer">
            <CrossIcon w={20} h={20} fill={"#1E71F2"} />
          </button>
        </div>
      </div>
      <div className=" px-10 font-sans border- border-purple-400 flex flex-col justify-between h-[60vh] ">
        {
          messageFile ?
            <div className="relative my-8 w-[350px] mx-auto">
              <img
                src={URL.createObjectURL(messageFile)}
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
            <div className="flex justify-center items-center h-full">
              <SelectPictureIcon w={209} h={209} fill={"#979797"} />
            </div>
        }
        {
          !messageFile ?
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
            :
            <div className="flex justify-center py-2 ">
              <Button
                title={"SEND"}
                className={"w-fit md:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24"}
                loading={loadings.sendMsg}
                onClick={sendMessage}
              />
            </div>
        }
      </div>
    </div>
  )
}

export default SelectPicture
