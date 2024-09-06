// // import { cn } from '../lib/utils';
// // import { ArrowUp } from 'lucide-react';
// // import { useEffect, useRef, useState } from 'react';
// // // import TextareaAutosize from 'react-textarea-autosize';
// // // import Attach from './MessageInputActions/Attach';
// // // import CopilotToggle from './MessageInputActions/CopilotToggle';
// // import InputBar from '../layouts/InputBar';

// // const MessageInput = ({ sendMessage, loading, onFileUpload }) => {
// //   const [copilotEnabled, setCopilotEnabled] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [textareaRows, setTextareaRows] = useState(1);
// //   const [mode, setMode] = useState('single');
// //   const [attachedFiles, setAttachedFiles] = useState([]);

// //   const inputRef = useRef(null);

// //   useEffect(() => {
// //     if (textareaRows >= 2 && message && mode === 'single') {
// //       setMode('multi');
// //     } else if (!message && mode === 'multi') {
// //       setMode('single');
// //     }
// //   }, [textareaRows, mode, message]);

// //   const handleFileChange = (files) => {
// //     setAttachedFiles(files);
// //     onFileUpload(files);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (loading || message.trim().length === 0) return;
// //     sendMessage(message, attachedFiles);
// //     setMessage('');
// //     setAttachedFiles([]);
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className={cn(
// //         'bg-light-secondary dark:bg-dark-secondary p-4 flex items-center overflow-hidden border border-light-200 dark:border-dark-200',
// //         mode === 'multi' ? 'flex-col rounded-lg' : 'flex-row rounded-full',
// //       )}
// //     >
// //       <div className="flex flex-row items-center w-full">
// //         <Attach
// //           onChange={handleFileChange}
// //           onFileUpload={onFileUpload}
// //           attachedFiles={attachedFiles}
// //         />
// //         <InputBar
// //           ref={inputRef}
// //           value={message}
// //           onChange={(e) => setMessage(e.target.value)}
// //           onHeightChange={(height, props) => {
// //             setTextareaRows(Math.ceil(height / props.rowHeight));
// //           }}
// //           className="transition bg-transparent dark:placeholder:text-white/50 placeholder:text-sm text-sm dark:text-white resize-none focus:outline-none w-full px-2 max-h-24 lg:max-h-36 xl:max-h-48 flex-grow flex-shrink"
// //           placeholder="Ask a follow-up"
// //         />
// //         <div className="flex flex-row items-center space-x-4">
// //           <CopilotToggle
// //             copilotEnabled={copilotEnabled}
// //             setCopilotEnabled={setCopilotEnabled}
// //           />
// //           <button
// //             type="submit"
// //             disabled={message.trim().length === 0 || loading}
// //             className="bg-[#24A0ED] text-white disabled:text-black/50 dark:disabled:text-white/50 hover:bg-opacity-85 transition duration-100 disabled:bg-[#e0e0dc79] dark:disabled:bg-[#ececec21] rounded-full p-2"
// //           >
// //             <ArrowUp className="bg-background" size={17} />
// //           </button>
// //         </div>
// //       </div>
// //     </form>
// //   );
// // };

// // export default MessageInput;

// "use client";

// import React, { useRef, useState, useEffect } from 'react';
// import { cn } from '../lib/utils';
// import { SendIcon, UploudIcon } from "../Icons";
// import { X, ArrowUp } from 'lucide-react';

// const MessageInput = ({ sendMessage, loading, onFileUpload }) => {
//   const [message, setMessage] = useState('');
//   const [mode, setMode] = useState('single');
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (message && mode === 'single') {
//       setMode('multi');
//     } else if (!message && mode === 'multi') {
//       setMode('single');
//     }
//   }, [mode, message]);

//   const handleFileUpload = (event) => {
//     const newFiles = Array.from(event.target.files);
//     const updatedFiles = [...uploadedFiles, ...newFiles];
//     setUploadedFiles(updatedFiles);
//     onFileUpload(updatedFiles);
//   };

//   const removeFile = (fileToRemove) => {
//     const updatedFiles = uploadedFiles.filter(file => file !== fileToRemove);
//     setUploadedFiles(updatedFiles);
//     onFileUpload(updatedFiles);
//   };

//   const triggerFileUpload = () => {
//     fileInputRef.current.click();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (loading || message.trim().length === 0) return;
//     sendMessage(message, uploadedFiles);
//     setMessage('');
//     setUploadedFiles([]);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className={cn(
//         'bg-light-secondary dark:bg-dark-secondary p-4 flex flex-col items-center overflow-hidden border border-light-200 dark:border-dark-200',
//         mode === 'multi' ? 'rounded-lg' : 'rounded-full',
//       )}
//     >
//       <div className="relative w-full">
//         <input
//           type="text"
//           placeholder="Ask or create anything..."
//           className="w-full h-[50px] border-[0.5px] border-brandprimary rounded-[50px] py-[17px] px-[35px] text-[#ACACAC] text-[16px] tracking-[4px] font-sans"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <input
//           type="file"
//           ref={fileInputRef}
//           onChange={handleFileUpload}
//           className="hidden"
//           accept="*/*"
//           multiple
//         />
//         <button
//           type="button"
//           className="absolute top-[15px] right-[75px]"
//           onClick={triggerFileUpload}
//         >
//           <UploudIcon w={20} h={17} />
//         </button>
//         <button
//           type="submit"
//           className="absolute top-[15px] right-[34px]"
//           disabled={message.trim().length === 0 || loading}
//         >
//           <SendIcon w={20} h={16} fill={message.trim().length === 0 || loading ? '#ACACAC' : '#1E71F2'} />
//         </button>
//       </div>
//       {uploadedFiles.length > 0 && (
//         <ul className="w-full space-y-2 mt-2">
//           {uploadedFiles.map((file, index) => (
//             <li key={index} className="flex items-center justify-between p-2 rounded bg-light-100 dark:bg-dark-300">
//               <span className="text-sm truncate">{file.name}</span>
//               <InputBar
//                 onClick={() => removeFile(file)}
//                 className="text-red-500 hover:text-red-700"
//               >
//                 <X size={16} />
//               </InputBar>
//             </li>
//           ))}
//         </ul>
//       )}
//     </form>
//   );
// };

// export default MessageInput;

"use client";
import React, { useState } from 'react';
import { SendIcon } from "../Icons";

const MessageInput = ({ loading, sendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      {/* <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading}
      /> */}
      {/* <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={loading || !message.trim()}
      >
        <SendIcon w={20} h={16} fill={loading || !message.trim() ? '#ACACAC' : '#ACACAC'} />
      </button> */}
    </form>
  );
};

export default MessageInput;