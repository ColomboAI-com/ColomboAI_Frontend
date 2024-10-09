/* eslint-disable @next/next/no-img-element */
import { useContext, useState, useEffect, useRef } from "react";
import { BackButtonIcon, CloseDocumentIcon, CreateMagicPenIcon, CrossIcon, SendIcon } from "../Icons";
import { FeedContext } from "@/context/FeedContext";
import { GlobalContext } from "@/context/GlobalContext";
import { ThreeDots } from "react-loader-spinner";
import Button from "@/elements/Button";
import { MessageBox } from "../MessageBox";
import { constructFrom } from "date-fns";

const CreatePost = () => {
  const [isMagicPenOpen, setIsMagicPenOpen] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [postInput, setPostInput] = useState("");
  const [file, setFile] = useState([]);
  const [mediaUrl, setMediaUrl] = useState([]);
  const defaultPostType = "thought";
  const [postType, setPostType] = useState(defaultPostType);
  const [nextStep, setNextStep] = useState(false);
  const { generatePost, createPost, loadings, posts, setPosts } = useContext(FeedContext);
  const { setIsCreatePostOpen } = useContext(GlobalContext);
  // Open Magic Pen if it came from drop down
  const { openMagicPenWithIcon } = useContext(GlobalContext);

  const InputFile = useRef(null);

  function toggleMagicPen() {
    setIsMagicPenOpen(!isMagicPenOpen);
  }

  const handleFileInputClick = () => {
    InputFile.current.click();
  };

  const clearFileHandler = (index) => {
    const newFiles = [...file];
    const newMediaUrls = [...mediaUrl];
    newFiles.splice(index, 1);
    newMediaUrls.splice(index, 1);
    setFile(newFiles);
    setMediaUrl(newMediaUrls);
    if (newFiles.length === 0) {
      setPostType(defaultPostType);
    }
  };

  const handleGeneratePost = async () => {
    const result = await generatePost(promptInput);
    if (result?.response_type === "image") {
      setMediaUrl([result?.text]);
      setPostType(result?.response_type);
    } else if (result?.response_type === "text") {
      setPostInput(result?.text);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      setFile(selectedFiles);

      for (let i = 0; i < selectedFiles.length; i++) {
        const fileType = selectedFiles[i].type.split("/")[0];
        setPostType(fileType);

        const fileUrl = URL.createObjectURL(selectedFiles[i]);
        setMediaUrl([fileUrl, ...mediaUrl]);
      }

      setNextStep(true);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const newFiles = [...file, ...droppedFiles];
      setFile(newFiles);
      const fileType = droppedFiles[0].type.split("/")[0];
      setPostType(fileType);
      const newMediaUrls = [...mediaUrl];
      for (let i = 0; i < droppedFiles.length; i++) {
        const fileUrl = URL.createObjectURL(droppedFiles[i]);
        newMediaUrls.push(fileUrl);
      }
      setMediaUrl(newMediaUrls);
    }
  };

  const handleCreatePost = async () => {
    const res = await createPost({ type: postType, files: file, mediaUrl, content: postInput });
    console.log(res);
    if (res) {
      MessageBox("success", res.message);
      let postData = [...posts];
      postData.unshift(res.data?.post);
      setPosts(postData);
      setIsCreatePostOpen(false);
    }
  };

  useEffect(() => {
    if (openMagicPenWithIcon) {
      toggleMagicPen();
    }
    return () => {
      mediaUrl.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [mediaUrl]);

  return (
    <>
      <div className="border-[1px] border-brandprimary rounded-[10px] min-h-[82vh] no-scrollbar overflow-y-auto font-sans">
        <div className="flex items-center justify-between pl-[37px] pr-[41px] pt-[22px] pb-[17px] border-b-2 border-#BCB9B9">
          <div className={`${!nextStep ? "p-[10px]" : " justify-center"}`}>
            {nextStep && (
              <button onClick={() => setNextStep(false)}>
                <BackButtonIcon w={20} h={20} fill={"#515151"} />
              </button>
            )}
          </div>
          <div className="flex items-center">
            <p className="pl-[17px] text-2xl font-sans tracking-wider">Create new Post</p>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleMagicPen}
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
            <button onClick={() => setIsCreatePostOpen(false)}>
              <CrossIcon w={20} h={20} fill={"#1E71F2"} />
            </button>
          </div>
        </div>

        <div className="px-[18px] py-[22px] font-sans flex flex-col justify-between h-[70vh]">
          <div className={`flex flex-col ${isMagicPenOpen ? "gap-5" : ""}`}>
            <div className={`${isMagicPenOpen ? "flex" : "hidden"} items-start`}>
              <div className="items-start w-full rounded-2xl p-[1px] bg-gradient-to-b from-[#FF0049] via-[#FFBE3B,#00BB5C,#187DC4] to-[#58268B]">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Create using Magic Pen"
                  className="flex p-3 pr-12 rounded-2xl m-[1px] w-[calc(100%-2px)] min-h-[14vh] text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm resize-none outline-none focus:ring-offset-0 focus:ring-0"
                />
              </div>
              <button className="-ml-12 mt-3" onClick={handleGeneratePost}>
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
                  <SendIcon w={32} h={32} fill={promptInput !== "" ? "#1E71F2" : "#E3E3E3"} />
                )}
              </button>
            </div>
            <div className={` flex flex-col items-end ${isMagicPenOpen ? "" : ""}`}>
              <div className="flex items-start w-full">
                <textarea
                  value={postInput}
                  onChange={(e) => setPostInput(e.target.value)}
                  placeholder="Create Your Post"
                  className="w-full p-3 pr-12 rounded-2xl m-[2px] min-h-[30vh] border-2 border-brandprimary text-brandprimary bg-[#F7F7F7] placeholder:text-[#D1D1D1] text-sm resize-none outline-none focus:ring-offset-0 focus:ring-0"
                />
              </div>
              {!nextStep && (
                <button onClick={() => setNextStep(true)} className="text-brandprimary font-semibold mx-1">
                  Next
                </button>
              )}
            </div>
            {mediaUrl.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-4">
                {mediaUrl.map((url, index) => (
                  <div key={index} className="relative my-8">
                    {postType.includes("image") ? (
                      <img
                        src={url}
                        alt={`File Preview${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    ) : postType.includes("video") ? (
                      <video src={url} autoPlay loop controls className="w-full aspect-video">
                        <source src={url} />
                      </video>
                    ) : null}
                    <div className="absolute top-3 right-2">
                      <div className="flex flex-row items-center justify-center">
                        <span onClick={() => clearFileHandler(index)} className="px-2 cursor-pointer">
                          <CloseDocumentIcon />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {nextStep === false && (
              <>
                {mediaUrl.length === 0 && postType === defaultPostType && (
                  <div
                    className="flex flex-col items-center py-2 rounded-xl"
                    onDrop={handleDrop}
                    onDragOver={(event) => event.preventDefault()}
                  >
                    <p className="text-xl my-4">Drag photos and videos here</p>
                    <span onClick={handleFileInputClick}>
                      <input
                        className="hidden"
                        type="file"
                        accept="image/, video/"
                        onChange={handleFileChange}
                        ref={InputFile}
                        multiple
                      />
                      <Button
                        title="Select from computer"
                        className="w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-14"
                      />
                    </span>
                  </div>
                )}
              </>
            )}

            {nextStep && (
              <div className="flex justify-center pb-[20px]">
                <Button
                  title="SHARE POST"
                  className="w-fit sm2:text-xl text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] rounded-full bg-brandprimary py-4 px-24"
                  loading={loadings?.createPost}
                  onClick={handleCreatePost}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
