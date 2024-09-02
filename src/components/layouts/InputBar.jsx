// "use client";
// import React, { useRef, useState } from 'react';
// import { SendIcon, UploudIcon, PeeksIcon, RemoveIcon } from "../Icons";

// const InputBar = ({ onFileUpload }) => {
//     const [uploadedFile, setUploadedFile] = useState(null);
//     const [inputValue, setInputValue] = useState('');
//     const fileInputRef = useRef(null);

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setUploadedFile(file);
//             setInputValue(`~${file.name}`);
//             onFileUpload([file]);
//         }
//     };

//     const removeFile = () => {
//         setUploadedFile(null);
//         setInputValue('');
//         onFileUpload([]);
//     };

//     const triggerFileUpload = () => {
//         fileInputRef.current.click();
//     };

//     return (
//         <div className="relative py-[21px]">
//             <div className="relative flex items-center">
//                 <div className="flex items-center w-full h-[50px] border-[0.5px] border-brandprimary rounded-[50px] py-[17px] pl-[35px] pr-[110px]">
//                     <input
//                         type="text"
//                         placeholder="Ask or create anything..."
//                         className="w-full h-full text-[#ACACAC] text-[16px] font-sans outline-none truncate"
//                         value={inputValue}
//                         onChange={(e) => setInputValue(e.target.value)}
//                         readOnly={!!uploadedFile}
//                     />
//                     {uploadedFile && (
//                         <button
//                             onClick={removeFile}
//                             className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700 p-1"
//                         >
//                             <RemoveIcon size={16} />
//                         </button>
//                     )}
//                 </div>
//                 <button
//                     className="absolute right-[75px]"
//                     onClick={triggerFileUpload}
//                 >
//                     <UploudIcon w={20} h={17} />
//                 </button>
//                 {/* //main submit btn */}
//                 <button className="absolute right-[34px]">
//                     <SendIcon w={20} h={16} fill={'#1E71F2'} />
//                 </button>
//             </div>
//             <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 accept="*/*"
//             />
//         </div>
//     );
// };

// export default InputBar;

// "use client";
// import React, { useRef, useState } from 'react';
// import { SendIcon, UploudIcon, RemoveIcon } from "../Icons";

// const InputBar = ({ sendMessage }) => {
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [inputValue, setInputValue] = useState('');
//   const fileInputRef = useRef(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setUploadedFile(file);
//       setInputValue(`~${file.name}`);
//     }
//   };

//   const removeFile = () => {
//     setUploadedFile(null);
//     setInputValue('');
//   };

//   const triggerFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (inputValue.trim()) {
//       sendMessage(inputValue, uploadedFile ? [uploadedFile] : []);
//       setInputValue('');
//       setUploadedFile(null);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="relative py-[21px]">
//       <div className="relative flex items-center">
//         <div className="flex items-center w-full h-[50px] border-[0.5px] border-brandprimary rounded-[50px] py-[17px] pl-[35px] pr-[110px]">
//           <input
//             type="text"
//             placeholder="Ask or create anything..."
//             className="w-full h-full text-[#ACACAC] text-[16px] font-sans outline-none truncate"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             readOnly={!!uploadedFile}
//           />
//           {uploadedFile && (
//             <button
//               onClick={removeFile}
//               className="flex-shrink-0 ml-2 text-gray-500 hover:text-gray-700 p-1"
//               type="button"
//             >
//               <RemoveIcon size={16} />
//             </button>
//           )}
//         </div>
//         <button
//           className="absolute right-[75px]"
//           onClick={triggerFileUpload}
//           type="button"
//         >
//           <UploudIcon w={20} h={17} />
//         </button>
//         <button className="absolute right-[34px]" type="submit">
//           <SendIcon w={20} h={16} fill={'#1E71F2'} />
//         </button>
//       </div>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileUpload}
//         className="hidden"
//         accept="*/*"
//       />
//     </form>
//   );
// };

// export default InputBar;

"use client";

import React, { useState, useRef } from 'react';
import { SendIcon, UploudIcon } from "../Icons";

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
  };

  return (
    <form onSubmit={handleSubmit} className="relative py-[21px]">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask or create anything..."
        className="w-full h-[50px] border-[0.5px] font-circular border-brandprimary  rounded-[50px] py-[17px] px-[35px] text-[#ACACAC] text-[16px] tracking-[4px] font-sans"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="absolute top-[39px] right-[75px]"
      >
        <UploudIcon w={20} h={17} />
      </button>
      <button
        type="submit"
        className="absolute top-[39px] right-[34px]"
      >
        <SendIcon w={20} h={16} fill={message.trim() || file ? '#1E71F2' : '#1E71F2'} />
      </button>
      {file && (
        <div className="mt-2 text-[16px] text-[#1E71F2] ont-circular text-base font-medium leading-[20.24px] tracking-[0.1em] ">
           {file.name}
        </div>
      )}
    </form>
  );
};

export default InputBar;
