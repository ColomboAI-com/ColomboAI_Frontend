"use client";

import React, { useState, useRef } from "react";
import { SendIcon, UploadIcon, PeeksIcon, RemoveIcon } from "../Icons";
import { useRouter } from "next/navigation";

const InputBar = ({ sendMessage, setUploadedFile, uploading, uploadedFile }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(uploadedFile);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      // router.push(`https://caidev.colomboai.com/genai-search/?q=${message}`);
      if (message.trim() || file) {
        window.location.href = `https://caidev.colomboai.com/genai-search/?q=${message}`;
        // window.location.href = `http://localhost:3001/genai-search/?q=${message}`;
        sendMessage(message, file);
        setMessage("");
        setFile(null);
        setUploadedFile(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadedFile(selectedFile);
    setIsUploading(false);
    // uploading(false);
    // setMessage(`~${selectedFile.name}`);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const borderStyle = {
    border: "0.5px solid transparent",
    backgroundClip: "padding-box",
    background:
      "linear-gradient(white, white) padding-box, linear-gradient(180deg, #FF0049 0%, #FFBE3B 25%, #00BB5C 50%, #187DC4 75%, #58268B 100%) border-box",
    borderImageSlice: 1,
  };

  return (
    //need this one
    //     <div className='relative'>
    //     <form onSubmit={handleSubmit} className="py-[21px]">
    //       <div className="relative w-full h-[50px] border-[0.5px] font-circular border-brandprimary rounded-[50px] overflow-hidden">
    //         <input
    //           type="text"
    //           value={message}
    //           onChange={(e) => setMessage(e.target.value)}
    //           placeholder="Ask or create anything..."
    //           className="w-full h-full py-[17px] px-[35px] pr-[100px] text-[#1E71F2] border-brandprimary text-[16px] tracking-[4px] font-sans overflow-hidden text-ellipsis whitespace-nowrap "
    //         />
    //         <div className="absolute top-0 right-0 h-full flex items-center pr-[25px]">
    //           <button
    //             type="button"
    //             onClick={() => fileInputRef.current.click()}
    //             className="mr-[20px]"
    //           >
    //             <UploadIcon w={20} h={17} />
    //           </button>
    //           <button type="submit">
    //             <SendIcon w={20} h={16} fill={message.trim() || file ? '#1E71F2' : '#1E71F2'} />
    //           </button>
    //         </div>
    //       </div>
    //       <input
    //         type="file"
    //         ref={fileInputRef}
    //         onChange={handleFileChange}
    //         className="hidden"
    //       />
    //       {file && (
    //         <div className="mt-2 flex items-center mr-2">
    //           <span className="text-[16px] text-[#1E71F2] font-circular text-base font-medium leading-[20.24px] tracking-[0.1em] mr-2">
    //             ~ {file.name}
    //           </span>
    //           <button type="button" onClick={handleRemoveFile}>
    //             <RemoveIcon w={12} h={12} />
    //           </button>
    //         </div>
    //       )}
    //     </form>
    //   </div>

    <div className="relative">
      {!isUploading ? (
        <form onSubmit={handleSubmit} className="lg:pb-[21px] sm:pb-0 pt-[21px] flex flex-row w-full justify-center">
          <div
            className="relative sm:w-[20rem] md:w-full h-[50px] overflow-hidden font-circular font-sans focus-within:outline-none rounded-[25px]"
            style={borderStyle}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              //   placeholder={file ? '' : "Ask or create anything..."}
              placeholder="Ask or create anything..."
              className="w-full max-w-[45rem] sm: h-full py-[17px] px-[35px]  text-[#1E71F2] text-[16px] tracking-[0.1rem] font-sans overflow-hidden text-ellipsis whitespace-nowrap bg-transparent focus:outline-none"
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-[25px]">
              <button
                type="button"
                // onClick={() => fileInputRef.current.click()}
                onClick={(e) => [uploading(true), setIsUploading(true)]}
                className="mr-[20px]"
              >
                <UploadIcon w={20} h={17} />
              </button>
              <button type="submit">
                <SendIcon w={20} h={16} fill={message.trim() || file ? "#1E71F2" : "#1E71F2"} />
              </button>
            </div>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          {file && (
            <div className="mt-4 flex items-center font-sans font-circular mr-2 absolute left-[37px]">
              <span className="flex text-[16px] text-[#1E71F2] font-medium leading-[20.24px] tracking-[0.1em] mr-2">
                <PeeksIcon w={16} h={16} className="mr-2 left-[-29px]" />~ {file.name}
              </span>
              <button type="button" onClick={handleRemoveFile} className="font-circular">
                <RemoveIcon w={12} h={12} />
              </button>
            </div>
          )}
        </form>
      ) : (
        <div
          className="flex flex-col items-center md:w-[28rem] md:h-[10.52rem] lg:w-[30rem] lg:h-[11.32rem] xl:w-[45rem] xl:h-[17rem] mt-[1.2rem] ml-[6rem] rounded-[1.5rem]"
          style={borderStyle}
        >
          <p className="lg:p-1 xl:p-5 font-[700] md:text-base lg:text-lg xl:text-xl">
            Drag and Drop or upload your file here
          </p>
          <hr className="border-[0.1px] md:w-[28rem] lg:w-[30rem] xl:w-[45rem] border-[#FF0049]" />
          <button
            type="button"
            onClick={() => [fileInputRef.current.click()]}
            className="lg:mt-[0.3rem] xl:mt-[1rem]"
          >
            <UploadIcon w={80} h={80} />
          </button>
          <button
            style={{
              background: "linear-gradient(180deg, #6237FF, #258EFF)",
              color: "white",
              border: "none",
              borderRadius: "15px",
              cursor: "pointer",
              fontWeight: "normal",
            }}
            className="mt-[0.3rem] xl:mt-[0.5rem] md:text-[0.8rem] lg:text-[0.8rem] xl:text-[1rem] md:px-[1.25rem] md:py-[0.3rem] lg:px-[1.25rem] lg:py-[0.3rem] xl:px-[1.75rem] xl:py-[0.4rem]"
            onClick={() => [fileInputRef.current.click()]}
          >
            UPLOAD
          </button>
          <p className="text-[#8B8B8B] md:mt-[0.75rem] lg:mt-[0.5rem] xl:mt-[1.75rem] md:text-xs lg:text-sm">
            Max ??mb only
          </p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        </div>
      )}
    </div>
  );
};

export default InputBar;
