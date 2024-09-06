"use client";

import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, UploudIcon, PeeksIcon, RemoveIcon } from "../Icons";

const InputBar = ({ sendMessage, setUploadedFile }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || file) {
      sendMessage(message, file);
      setMessage('');
      setFile(null);
      setUploadedFile(null);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadedFile(selectedFile);
    // setMessage(`~${selectedFile.name}`);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const borderStyle = {
    border: '0.5px solid transparent',
    backgroundClip: 'padding-box',
    background: 'linear-gradient(white, white) padding-box, linear-gradient(180deg, #FF0049 0%, #FFBE3B 25%, #00BB5C 50%, #187DC4 75%, #58268B 100%) border-box',
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
//             <UploudIcon w={20} h={17} />
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

<div className='relative'>
<form onSubmit={handleSubmit} className="py-[21px]">
  <div 
    className="relative w-full h-[50px] overflow-hidden font-circular font-sans focus-within:outline-none rounded-[25px]"
    style={borderStyle}
  >
    <input
      type="text"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    //   placeholder={file ? '' : "Ask or create anything..."}
       placeholder="Ask or create anything..."
      className="w-full h-full py-[17px] px-[35px] pr-[100px] text-[#1E71F2] text-[16px] tracking-[0.1em] font-sans overflow-hidden text-ellipsis whitespace-nowrap bg-transparent focus:outline-none"
    />
    <div className="absolute top-0 right-0 h-full flex items-center pr-[25px]">
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="mr-[20px]"
      >
        <UploudIcon w={20} h={17} />
      </button>
      <button type="submit">
      <SendIcon w={20} h={16} fill={message.trim() || file ? '#1E71F2' : '#1E71F2'} />
      </button>
    </div>
  </div>
  <input
    type="file"
    ref={fileInputRef}
    onChange={handleFileChange}
    className="hidden"
  />
  {file && (
    <div className="mt-4 flex items-center font-sans font-circular mr-2 absolute left-[37px]">
      <span className="flex text-[16px] text-[#1E71F2] font-medium leading-[20.24px] tracking-[0.1em] mr-2">
      <PeeksIcon w={16} h={16} className="mr-2 left-[-29px]" />
        ~ {file.name}
      </span>
      <button type="button" onClick={handleRemoveFile} className='font-circular' >
        <RemoveIcon w={12} h={12} />
      </button>
    </div>
  )}
</form>
</div>
  );
};

export default InputBar;
