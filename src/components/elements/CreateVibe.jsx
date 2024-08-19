/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect } from "react"
import {
  BackButtonIcon,
  CloseDocumentIcon,
  CrossIcon
} from "../Icons"
import { FeedContext } from "@/context/FeedContext"
import { GlobalContext } from "@/context/GlobalContext"
import Button from "@/elements/Button"
import { MessageBox } from "../MessageBox"

const CreateVibe = () => {
  const [promptInput, setPromptInput] = useState('')
  const [postInput, setPostInput] = useState('')
  const [file, setFile] = useState(null)
  const [mediaUrl, setMediaUrl] = useState("")
  const defaultPostType = 'thought'
  const [postType, setPostType] = useState(defaultPostType)
  const [nextStep, setNextStep] = useState(false)
  const { generatePost, createPost, loadings, posts, setPosts } = useContext(FeedContext)
  const { setIsCreateVibeOpen } = useContext(GlobalContext)


  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="media_type"]').click()
  }

  const clearFileHandler = () => {
    setFile(null)
    setMediaUrl("")
    setPostType(defaultPostType)
  }

  const handleGenerateVibe = async () => {
    const result = await generatePost(promptInput)
    if (result?.response_type !== "text") {
      setMediaUrl(result?.text)
      setPostType(result?.response_type)
    } else if (result?.response_type === "text") {
      setPostInput(result?.text)
    }
  }

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
      const fileType = selectedFile.type.split('/')[0];
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(selectedFile);
      setMediaUrl(fileUrl);
    }
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0];
      const fileType = file.type.split('/')[0];
      setFile(file);
      setPostType(fileType);
      const fileUrl = URL.createObjectURL(file);
      setMediaUrl(fileUrl);
    }
  }


  const handleCreateVibe = async () => {
    const res = await createPost({ type: postType, file, content: postInput })
    if (res) {
      MessageBox('success', res.message)
      let postData = [...posts]
      postData.unshift(res.data?.post)
      setPosts(postData)
      setIsCreateVibeOpen(false)
    }
  }

  useEffect(() => {
    return () => {
      if (mediaUrl) {
        URL.revokeObjectURL(mediaUrl);
      }
    };
  }, [mediaUrl]);

  return (
    <>
      <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto  font-sans">
        <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
          <div className={`${!nextStep ? "p-[10px]" : " justify-center"}`}>
            {
              nextStep &&
              <button onClick={() => setNextStep(false)}>
                <BackButtonIcon w={20} h={20} fill={"#515151"} />
              </button>
            }
          </div>
          <div className="flex-grow flex justify-center">
            <p className="pl-[17px]  text-2xl font-sans tracking-wider ">
              Create new Vibes
            </p>
          </div>
          <button onClick={() => setIsCreatePostOpen(false)}>
            <CrossIcon w={20} h={20} fill={"#1E71F2"} />
          </button>
        </div>
        <div className=" px-[18px] py-[22px] font-sans flex flex-col justify-between h-[70vh] ">
          <div className={`flex flex-col `}>
          </div>
          {
            mediaUrl !== "" && postType.includes("image")
              ?
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
              :
              mediaUrl !== "" && postType.includes("video")
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
                (mediaUrl === "" && postType === defaultPostType) &&
                <div
                  className="flex flex-col items-center py-2 rounded-xl "
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
              }
            </>
          }
          {
            nextStep &&
            <div className="flex justify-center pb-[20px]">
              <Button
                title={'SHARE POST'}
                className={'w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24 '}
                loading={loadings?.createPost}
                onClick={handleCreateVibe}
              />
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default CreateVibe
