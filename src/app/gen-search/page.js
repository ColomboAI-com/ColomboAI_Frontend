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

import React, { useState, useEffect, useCallback, useRef } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import InputBar from "../../components/layouts/InputBar.jsx";
import RightSideIcons from "../../components/gen-ai/RightSideIcons.jsx";
import Chat from "../../components/MassageInputActions/Chat.jsx";
import HistoryChat from "@/components/MassageInputActions/HistoryChat.jsx";
import { Plus_Jakarta_Sans } from "@next/font/google";
import { UploadIcon } from "../../components/Icons.jsx";
import FooterAdComponent from "@/components/ads/Ad.jsx";
import SideTopAdComponent from "@/components/ads/SideTopAd.jsx";
import { v4 as uuidv4 } from "uuid"; // Importing UUID to generate unique identifiers
import SideAdComponent from "@/components/ads/SideAd.jsx";

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

function GenSearch() {
  const [messages, setMessages] = useState([]);
  const [messageBuffer, setMessageBuffer] = useState("");
  const [urlBuffer, setUrlBuffer] = useState(""); // Buffer to store URLs
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatId, setChatId] = useState(uuidv4()); // State for storing a unique chat ID
  const [currentQuery, setCurrentQuery] = useState("");
  const fileInputRef = useRef(null);
  const [sources, setSources] = useState([]);
  const [displaySource, setDisplaySource] = useState([]);

  // const socketUrl = "ws://35.239.74.176:3001/";
  const socketUrl = "wss://genaimlapi.colomboai.com";

  const httpUrl = "http://35.239.74.176:3001/";

  const {
    sendMessage: sendWebSocketMessage,
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("WebSocket connection established."),
    onClose: () => console.log("WebSocket connection closed."),
    onError: (error) => console.error("WebSocket error:", error),
    shouldReconnect: (closeEvent) => true,
  });

  let newSources = [];
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     handleReceivedMessage(lastMessage.data);
  //   }
  // }, [lastMessage]);

  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     //console.log("last message:", lastMessage);
  //     const messageData = JSON.parse(lastMessage.data);

  //     switch (messageData.type) {
  //       case "messageEnd":
  //         // Concatenate message data first and URL data at the endz

  //         const fullMessage = messageBuffer;
  //         handleReceivedMessage(fullMessage);
  //         setMessageBuffer(""); // Clear the message buffer
  //         setUrlBuffer(""); // Clear the URL buffer
  //         break;
  //       case "sources":
  //         // Handle 'sources' type, append each URL from the metadata as a new line
  //         if (messageData.data.length > 0) {
  //           const urls = messageData.data
  //             .map((item) => item.metadata.url + "\n") // Extract URL and add newline
  //             .join(""); // Collect all URLs
  //           setUrlBuffer((prev) => prev + urls);

  //           const newSources = messageData.data.map((item) => ({
  //             title: item.metadata.title,
  //             url: item.metadata.url,
  //           }));
  //           setSources(newSources);
  //           console.log("newsources:", newSources);
  //         }
  //         break;
  //       case "message":
  //         // Append 'message' type data directly to the buffer
  //         setMessageBuffer((prev) => prev + messageData.data);
  //         break;
  //       default:
  //         // Optionally handle other types or errors
  //         break;
  //     }
  //   }
  // }, [lastMessage]);
  useEffect(() => {
    if (lastMessage !== null) {
      const messageData = JSON.parse(lastMessage.data);

      switch (messageData.type) {
        case "messageEnd":
          handleReceivedMessage(messageBuffer, sources);
          setMessageBuffer(""); // Clear the message buffer after handling
          setSources([]); // Clear sources after they're passed
          break;
        case "sources":
          const newSources = messageData.data.map((item) => ({
            title: item.metadata.title,
            url: item.metadata.url,
            pageContent: item.pageContent,
          }));
          // setSources(newSources); // Set newSources ready for when message ends
          setSources((prevSources) => [...prevSources, ...newSources]);
          break;
        case "message":
          setMessageBuffer((prev) => prev + messageData.data);
          break;
        default:
          break;
      }
    }
  }, [lastMessage]);

  const handleReceivedMessage = (content, sources) => {
    console.log("sources:", sources);
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: content, sources: sources },
    ]);
    setLoading(false);
  };

  const sendMessage = useCallback(
    (message, file) => {
      setLoading(true);
      setCurrentQuery(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: message, file: file },
      ]);

      const messagePayload = {
        type: "message",
        message: {
          chatId: chatId,
          content: message,
        },
        focusMode: "webSearch",
        history: messages.map((msg) => [msg.role, msg.content]),
      };

      console.log("message payload:", messagePayload);

      const formattedMessage = JSON.stringify(messagePayload);

      if (readyState === ReadyState.OPEN) {
        sendWebSocketMessage(formattedMessage);
        console.log("Sent message via WebSocket:", formattedMessage);
      } else {
        console.error("WebSocket is not open, using fallback.");
      }
    },
    [readyState, sendWebSocketMessage, messages, chatId]
  );

  const onUploadChange = (bool) => {
    if (bool) {
      setIsUploading(true);
    } else {
      setIsUploading(false);
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
    <>
      <div className="flex flex-col min-h-screen">
        {/* <header className="sticky top-0 z-50 bg-white shadow-md">
          <RightSideIcons />
        </header> */}
        <main className="flex-grow">
          <div className="flex flex-row items-start">
            <div className="w-full md:w-[70%] lg:w-[70%] px-5 lg:px-20 mt-4">
              <InputBar
                sendMessage={sendMessage}
                setUploadedFile={setUploadedFile}
                uploading={onUploadChange}
                uploadedFile={fileInputRef}
              />
            </div>
            <RightSideIcons />
          </div>
          {!isUploading && (
            <div>
              {messages.length === 0 ? (
                <p className="md:text-[0.8rem] mt-[1rem] lg:text-[0.9375rem] md:ml-[1.8rem] lg:ml-[5rem] font-[450] text-justify font-sans text-[#ACACAC] md:w-[36rem] lg:w-[48rem]">
                  Welcome to GenAI Search, your go-to tool for instant answers
                  and web exploration! Simply type your question or topic of
                  interest, and GenAI will provide you with accurate answers
                  along with related links from the web. Whether you are seeking
                  quick information or diving deeper into a topic, GenAI Search
                  has you covered.
                </p>
              ) : (
                <Chat
                  loading={loading}
                  messages={messages}
                  sendMessage={sendMessage}
                  chatId={chatId}
                  query={currentQuery}
                  sources={sources}
                />
              )}
            </div>
          )}
          <HistoryChat />
          <div className=" absolute bottom-0 left-[198px] w-[728px] h-[90px] ">
            <FooterAdComponent />
          </div>
        </main>
      </div>
      {messages.length === 0 && (
        <div className=" fixed top-[220px] right-5 w-[300px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
          <div className="w-[300px]  h-[250px] cursor-pointer">
            <SideTopAdComponent divid={"top2"} />
          </div>
          <div className="w-[300px] h-[600px] cursor-pointer">
            <SideAdComponent divid={"bottom2"} />
          </div>
        </div>
      )}
    </>
  );
}

export default GenSearch;
