// "use client";

// import React, { useState } from 'react';
// import InputBar from '../../components/layouts/InputBar.jsx';
// import RightSideIcons from '../../components/gen-ai/RightSideIcons.jsx';
// import Chat from '../../components/MassageInputActions/Chat.jsx';
// import HistoryChat from '@/components/MassageInputActions/HistoryChat.jsx';

// function GenSearch() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);

//    const sendMessage = (message, file) => {
//         setLoading(true);

//         setTimeout(() => {
//           setMessages([...messages, 
//             { role: 'user', content: message, file: file },
//             { role: 'assistant', content: 'Scooby-Doo is a beloved animated series featuring a talking Great Dane and his teenage friends, Shaggy, Fred, Daphne, and Velma. Together, they form Mystery Inc. and embark on thrilling adventures to solve supernatural mysteries. With their iconic "Scooby-Dooby-Doo" catchphrase and wacky antics' }
//           ]);
//           setLoading(false);
//         }, 1000);
//       };



//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 bg-white shadow-md">
//         <RightSideIcons />
//       </header>
//       <main className="flex-grow">
//         <div className="w-full lg:w-[70%] px-5 lg:px-20  mt-4">
//           <InputBar sendMessage={sendMessage} setUploadedFile={setUploadedFile} />
//         </div>

//         {messages.length === 0 ? (
//           <p className="text-[15px] absolute font-[450] text-justify  text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px] ">
//             Welcome to GenAI Search, your go-to tool for instant answers and web exploration! Simply type your question or topic of interest, and GenAI will provide you with accurate answers along with related links from the web. Whether you are seeking quick information or diving deeper into a topic, GenAI Search has you covered.
//           </p>
//         ) : (
//           <Chat
//             loading={loading}
//             messages={messages}
//             sendMessage={sendMessage}
//           />
//         )}
//         <HistoryChat/>
//       </main>
//     </div>
//   );
// }

// export default GenSearch;

"use client";

import React, { useState, useCallback, useRef } from 'react';
import InputBar from '../../components/layouts/InputBar.jsx';
import RightSideIcons from '../../components/gen-ai/RightSideIcons.jsx';
import ChatWindow from '../../components/MassageInputActions/ChatWindow.jsx';
import HistoryChat from '@/components/MassageInputActions/HistoryChat.jsx';
import { Plus_Jakarta_Sans } from '@next/font/google';
import { UploadIcon } from "../../components/Icons.jsx";


const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

function GenSearch() {
  const [chatId, setChatId] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [initialFile, setInitialFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleStartChat = useCallback((message, file) => {
    const newChatId = Date.now().toString();
    setChatId(newChatId);
    setShowChat(true);
    setInitialMessage(message);
    setInitialFile(file);
  }, []);

  const onUploadChange = (bool) => {
    if (bool) {
      setIsUploading(true)
    } else {
      setIsUploading(false)
    }
  }

  const borderStyle = {
    border: '0.5px solid transparent',
    backgroundClip: 'padding-box',
    background: 'linear-gradient(white, white) padding-box, linear-gradient(180deg, #FF0049 0%, #FFBE3B 25%, #00BB5C 50%, #187DC4 75%, #58268B 100%) border-box',
    borderImageSlice: 1,
  };


  return (
    <main className={plusJakartaSans.className}>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <RightSideIcons />
        </header>
        <main className="flex-grow">
          <div className="w-full lg:w-[70%] px-5 lg:px-20 mt-4">
            <InputBar sendMessage={handleStartChat} setUploadedFile={setInitialFile} uploading={onUploadChange} uploadedFile={fileInputRef} />
          </div>
          {isUploading ? null : <div>
            <ChatWindow id={chatId} initialMessage={initialMessage} initialFile={initialFile} />
          </div>}
          <HistoryChat />
        </main> 
      </div>
    </main>
  );
}

export default GenSearch