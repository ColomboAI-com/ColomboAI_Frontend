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
//           <p className="text-[15px] absolute font-[450] text-justify font-sans text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px] ">
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

// import React, { useState, useEffect, useCallback } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import InputBar from "../../components/layouts/InputBar.jsx";
// import RightSideIcons from "../../components/gen-ai/RightSideIcons.jsx";
// import Chat from "../../components/MassageInputActions/Chat.jsx";
// import HistoryChat from "@/components/MassageInputActions/HistoryChat.jsx";

// function GenSearch() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const socketUrl = "ws://35.239.74.176:3001/";
//   const httpUrl = "http://35.239.74.176:3001/";

//   const {
//     sendMessage: sendWebSocketMessage,
//     lastMessage,
//     readyState,
//   } = useWebSocket(socketUrl, {
//     onOpen: () => console.log("WebSocket connection established."),
//     onClose: () => console.log("WebSocket connection closed."),
//     onError: (error) => console.error("WebSocket error:", error),
//     shouldReconnect: (closeEvent) => true,
//   });

//   useEffect(() => {
//     if (lastMessage !== null) {
//       console.log("last message:", lastMessage);
//       handleReceivedMessage(lastMessage.data);
//     }
//   }, [lastMessage]);

//   const handleReceivedMessage = (content) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "assistant", content: content },
//     ]);
//     setLoading(false);
//     console.log("Received message:", content);
//   };

//   const sendHttpRequest = async (message) => {
//     try {
//       const response = await fetch(httpUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       handleReceivedMessage(data.message);
//     } catch (error) {
//       console.error("Error sending HTTP request:", error);
//       setTimeout(() => {
//         handleReceivedMessage(
//           'Scooby-Doo is a beloved animated series featuring a talking Great Dane and his teenage friends, Shaggy, Fred, Daphne, and Velma. Together, they form Mystery Inc. and embark on thrilling adventures to solve supernatural mysteries. With their iconic "Scooby-Dooby-Doo" catchphrase and wacky antics'
//         );
//       }, 1000);
//     }
//   };

//   const sendMessage = useCallback(
//     (message, file) => {
//       setLoading(true);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "user", content: message, file: file },
//       ]);

//       if (readyState === ReadyState.OPEN) {
//         sendWebSocketMessage(message);
//         console.log("Sent message via WebSocket:", message);
//       } else {
//         console.log("WebSocket is not open. Using HTTP POST.");
//         sendHttpRequest(message);
//       }
//     },
//     [readyState, sendWebSocketMessage]
//   );

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 bg-white shadow-md">
//         <RightSideIcons />
//       </header>
//       <main className="flex-grow">
//         <div className="w-full lg:w-[70%] px-5 lg:px-20 mt-4">
//           <InputBar
//             sendMessage={sendMessage}
//             setUploadedFile={setUploadedFile}
//           />
//         </div>

//         {messages.length === 0 ? (
//           <p className="text-[15px] absolute font-[450] text-justify font-sans text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px] ">
//             Welcome to GenAI Search, your go-to tool for instant answers and web
//             exploration! Simply type your question or topic of interest, and
//             GenAI will provide you with accurate answers along with related
//             links from the web. Whether you are seeking quick information or
//             diving deeper into a topic, GenAI Search has you covered.
//           </p>
//         ) : (
//           <Chat
//             loading={loading}
//             messages={messages}
//             sendMessage={sendMessage}
//           />
//         )}
//         <HistoryChat />
//       </main>
//     </div>
//   );
// }

// export default GenSearch;
// import React, { useState, useEffect, useCallback } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import InputBar from "../../components/layouts/InputBar.jsx";
// import RightSideIcons from "../../components/gen-ai/RightSideIcons.jsx";
// import Chat from "../../components/MassageInputActions/Chat.jsx";
// import HistoryChat from "@/components/MassageInputActions/HistoryChat.jsx";
// import { v4 as uuidv4 } from "uuid"; // Importing UUID to generate unique identifiers

// function GenSearch() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [chatId, setChatId] = useState(uuidv4()); // State for storing a unique chat ID

//   const socketUrl = "ws://35.239.74.176:3001/";
//   const httpUrl = "http://35.239.74.176:3001/";

//   const {
//     sendMessage: sendWebSocketMessage,
//     lastMessage,
//     readyState,
//   } = useWebSocket(socketUrl, {
//     onOpen: () => console.log("WebSocket connection established."),
//     onClose: () => console.log("WebSocket connection closed."),
//     onError: (error) => console.error("WebSocket error:", error),
//     shouldReconnect: (closeEvent) => true,
//   });

//   // useEffect(() => {
//   //   if (lastMessage !== null) {
//   //     console.log("last message:", lastMessage);
//   //     handleReceivedMessage(lastMessage.data);
//   //   }
//   // }, [lastMessage]);
//   useEffect(() => {
//     if (lastMessage !== null) {
//       console.log("last message:", lastMessage);
//       const messageData = JSON.parse(lastMessage.data);
//       if (messageData.type === "sources") {
//         // Assuming the data comes in the type "sources" with an array under "data"
//         handleReceivedMessage(messageData.data[0].pageContent); // Display the first source's page content
//       } else {
//         handleReceivedMessage(lastMessage.data);
//       }
//     }
//   }, [lastMessage]);
//   // useEffect(() => {
//   //   if (lastMessage !== null) {
//   //     console.log("last message:", lastMessage);
//   //     const messageData = JSON.parse(lastMessage.data);
//   //     // Only handle the message if it contains the expected type and data
//   //     if (messageData.type === "sources" && messageData.data.length > 0) {
//   //       handleReceivedMessage(messageData.data[0].pageContent); // Display the first source's page content
//   //     }
//   //   }
//   // }, [lastMessage]);

//   const handleReceivedMessage = (content) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "assistant", content: content },
//     ]);
//     setLoading(false);
//     console.log("Received message:", content);
//   };

//   // const handleReceivedMessage = (data) => {
//   //   try {
//   //     const parsedData = JSON.parse(data);
//   //     if (parsedData && parsedData.data && parsedData.data.length > 0) {
//   //       // Only take the first item's content from the data array
//   //       const firstContent = parsedData.data[0].pageContent;
//   //       setMessages((prevMessages) => [
//   //         ...prevMessages,
//   //         { role: "assistant", content: firstContent },
//   //       ]);
//   //     } else {
//   //       // Handle cases where data is not as expected
//   //       setMessages((prevMessages) => [
//   //         ...prevMessages,
//   //         { role: "assistant", content: "No relevant data found." },
//   //       ]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error parsing message data:", error);
//   //     setMessages((prevMessages) => [
//   //       ...prevMessages,
//   //       { role: "assistant", content: "Failed to process the data received." },
//   //     ]);
//   //   }
//   //   setLoading(false);
//   // };
//   // const handleReceivedMessage = (data) => {
//   //   try {
//   //     const parsedData = JSON.parse(data);
//   //     if (parsedData && parsedData.data && parsedData.data.length > 0) {
//   //       const firstContent = parsedData.data[0].pageContent;
//   //       // Clearing previous messages and setting the new one
//   //       setMessages([{ role: "assistant", content: firstContent }]);
//   //     } else {
//   //       // If no valid data is found, we clear previous messages and show a default message
//   //       setMessages([
//   //         { role: "assistant", content: "No relevant data found." },
//   //       ]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error parsing message data:", error);
//   //     // Clearing and setting error message
//   //     setMessages([
//   //       { role: "assistant", content: "Failed to process the data received." },
//   //     ]);
//   //   }
//   //   setLoading(false);
//   // };

//   // const handleReceivedMessage = (data) => {
//   //   try {
//   //     const parsedData = JSON.parse(data);
//   //     if (parsedData && parsedData.data && parsedData.data.length > 0) {
//   //       // Extract and use only the first item
//   //       const firstContent = parsedData.data[0].pageContent;
//   //       setMessages([{ role: "assistant", content: firstContent }]);
//   //     } else {
//   //       // Setting this only when data is confirmed to be empty or invalid
//   //       setMessages([
//   //         { role: "assistant", content: "No relevant data found." },
//   //       ]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error parsing message data:", error);
//   //     setMessages([
//   //       { role: "assistant", content: "Failed to process the data received." },
//   //     ]);
//   //   }
//   //   setLoading(false);
//   // };

//   const sendHttpRequest = async (message) => {
//     try {
//       const response = await fetch(httpUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       handleReceivedMessage(data.message);
//     } catch (error) {
//       console.error("Error sending HTTP request:", error);
//       setTimeout(() => {
//         handleReceivedMessage("Error message as fallback");
//       }, 1000);
//     }
//   };

//   const sendMessage = useCallback(
//     (message, file) => {
//       setLoading(true);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "user", content: message, file: file },
//       ]);

//       const messagePayload = {
//         type: "message",
//         message: {
//           chatId: chatId,
//           content: message,
//         },
//         focusMode: "webSearch", // Modify as needed for different features
//         history: messages.map((msg) => [msg.role, msg.content]),
//       };

//       const formattedMessage = JSON.stringify(messagePayload);

//       if (readyState === ReadyState.OPEN) {
//         sendWebSocketMessage(formattedMessage);
//         console.log("Sent message via WebSocket:", formattedMessage);
//       } else {
//         console.log("WebSocket is not open. Using HTTP POST.");
//         sendHttpRequest(formattedMessage);
//       }
//     },
//     [readyState, sendWebSocketMessage, messages, chatId]
//   );

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 bg-white shadow-md">
//         <RightSideIcons />
//       </header>
//       <main className="flex-grow">
//         <div className="w-full lg:w-[70%] px-5 lg:px-20 mt-4">
//           <InputBar
//             sendMessage={sendMessage}
//             setUploadedFile={setUploadedFile}
//           />
//         </div>
//         {messages.length === 0 ? (
//           <p className="text-[15px] absolute font-[450] text-justify font-sans text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px]">
//             Welcome to GenAI Search, your go-to tool for instant answers and web
//             exploration! Simply type your question or topic of interest, and
//             GenAI will provide you with accurate answers along with related
//             links from the web. Whether you are seeking quick information or
//             diving deeper into a topic, GenAI Search has you covered.
//           </p>
//         ) : (
//           <Chat
//             loading={loading}
//             messages={messages}
//             sendMessage={sendMessage}
//           />
//         )}
//         <HistoryChat />
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect, useCallback } from "react";
// import useWebSocket, { ReadyState } from "react-use-websocket";
// import InputBar from "../../components/layouts/InputBar.jsx";
// import RightSideIcons from "../../components/gen-ai/RightSideIcons.jsx";
// import Chat from "../../components/MassageInputActions/Chat.jsx";
// import HistoryChat from "@/components/MassageInputActions/HistoryChat.jsx";
// import { v4 as uuidv4 } from "uuid"; // Importing UUID to generate unique identifiers

// function GenSearch() {
//   const [messages, setMessages] = useState([]);
//   const [messageBuffer, setMessageBuffer] = useState(""); // Buffer to store incoming message parts
//   const [loading, setLoading] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [chatId, setChatId] = useState(uuidv4()); // State for storing a unique chat ID

//   const socketUrl = "ws://35.239.74.176:3001/";

//   const {
//     sendMessage: sendWebSocketMessage,
//     lastMessage,
//     readyState,
//   } = useWebSocket(socketUrl, {
//     onOpen: () => console.log("WebSocket connection established."),
//     onClose: () => console.log("WebSocket connection closed."),
//     onError: (error) => console.error("WebSocket error:", error),
//     shouldReconnect: (closeEvent) => true,
//   });

//   useEffect(() => {
//     if (lastMessage !== null) {
//       console.log("last message:", lastMessage);
//       const messageData = JSON.parse(lastMessage.data);
//       let urls = "";

//       switch (messageData.type) {
//         case "messageEnd":
//           // When 'messageEnd' is received, process the complete message and clear the buffer
//           handleReceivedMessage(messageBuffer);
//           setMessageBuffer(""); // Clear the buffer for the next message
//           break;
//         case "sources":
//           // Handle 'sources' type, append each URL from the metadata as a new line
//           if (messageData.data.length > 0) {
//             urls = messageData.data
//               .map((item) => item.metadata.url + "\n") // Extract URL and add newline
//               .join(""); // Join all URLs together without additional space
//             // setMessageBuffer((prevBuffer) => prevBuffer + urls);
//           }
//           break;
//         case "message":
//           // Append 'message' type data directly to the buffer
//           setMessageBuffer(
//             (prevBuffer) => prevBuffer + messageData.data + "\n" + urls
//           );
//           break;
//         default:
//           // Optionally handle other types or errors
//           break;
//       }
//     }
//   }, [lastMessage]);

//   const handleReceivedMessage = (content) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { role: "assistant", content: content },
//     ]);
//     setLoading(false);
//   };

//   const sendMessage = useCallback(
//     (message, file) => {
//       setLoading(true);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { role: "user", content: message, file: file },
//       ]);

//       const messagePayload = {
//         type: "message",
//         message: {
//           chatId: chatId,
//           content: message,
//         },
//         focusMode: "webSearch",
//         history: messages.map((msg) => [msg.role, msg.content]),
//       };

//       console.log("message payload:", messagePayload);

//       const formattedMessage = JSON.stringify(messagePayload);

//       if (readyState === ReadyState.OPEN) {
//         sendWebSocketMessage(formattedMessage);
//         console.log("Sent message via WebSocket:", formattedMessage);
//       } else {
//         console.error("WebSocket is not open, using fallback.");
//       }
//     },
//     [readyState, sendWebSocketMessage, messages, chatId]
//   );

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="sticky top-0 z-50 bg-white shadow-md">
//         <RightSideIcons />
//       </header>
//       <main className="flex-grow">
//         <div className="w-full lg:w-[70%] px-5 lg:px-20 mt-4">
//           <InputBar
//             sendMessage={sendMessage}
//             setUploadedFile={setUploadedFile}
//           />
//         </div>
//         {messages.length === 0 ? (
//           <p className="text-[15px] absolute font-[450] text-justify font-sans text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px]">
//             Welcome to GenAI Search, your go-to tool for instant answers and web
//             exploration! Simply type your question or topic of interest, and
//             GenAI will provide you with accurate answers along with related
//             links from the web. Whether you are seeking quick information or
//             diving deeper into a topic, GenAI Search has you covered.
//           </p>
//         ) : (
//           <Chat
//             loading={loading}
//             messages={messages}
//             sendMessage={sendMessage}
//           />
//         )}
//         <HistoryChat />
//       </main>
//     </div>
//   );
// }

// export default GenSearch;

import React, { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import InputBar from "../../components/layouts/InputBar.jsx";
import RightSideIcons from "../../components/gen-ai/RightSideIcons.jsx";
import Chat from "../../components/MassageInputActions/Chat.jsx";
import HistoryChat from "@/components/MassageInputActions/HistoryChat.jsx";
import { v4 as uuidv4 } from "uuid"; // Importing UUID to generate unique identifiers

function GenSearch() {
  const [messages, setMessages] = useState([]);
  const [messageBuffer, setMessageBuffer] = useState("");
  const [urlBuffer, setUrlBuffer] = useState(""); // Buffer to store URLs
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [chatId, setChatId] = useState(uuidv4()); // State for storing a unique chat ID

  const socketUrl = "ws://35.239.74.176:3001/";

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

  useEffect(() => {
    if (lastMessage !== null) {
      console.log("last message:", lastMessage);
      const messageData = JSON.parse(lastMessage.data);

      switch (messageData.type) {
        case "messageEnd":
          // Concatenate message data first and URL data at the end
          const fullMessage = messageBuffer + "\n" + urlBuffer;
          handleReceivedMessage(fullMessage);
          setMessageBuffer(""); // Clear the message buffer
          setUrlBuffer(""); // Clear the URL buffer
          break;
        case "sources":
          // Handle 'sources' type, append each URL from the metadata as a new line
          if (messageData.data.length > 0) {
            const urls = messageData.data
              .map((item) => item.metadata.url + "\n") // Extract URL and add newline
              .join(""); // Collect all URLs
            setUrlBuffer((prev) => prev + urls);
          }
          break;
        case "message":
          // Append 'message' type data directly to the buffer
          setMessageBuffer((prev) => prev + messageData.data);
          break;
        default:
          // Optionally handle other types or errors
          break;
      }
    }
  }, [lastMessage]);

  const handleReceivedMessage = (content) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: content },
    ]);
    setLoading(false);
  };

  const sendMessage = useCallback(
    (message, file) => {
      setLoading(true);
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <RightSideIcons />
      </header>
      <main className="flex-grow">
        <div className="w-full lg:w-[70%] px-5 lg:px-20 mt-4">
          <InputBar
            sendMessage={sendMessage}
            setUploadedFile={setUploadedFile}
          />
        </div>
        {messages.length === 0 ? (
          <p className="text-[15px] absolute font-[450] text-justify font-sans text-[#ACACAC] max-w-[806px] h-[60px] top-[216px] left-[192px]">
            Welcome to GenAI Search, your go-to tool for instant answers and web
            exploration! Simply type your question or topic of interest, and
            GenAI will provide you with accurate answers along with related
            links from the web. Whether you are seeking quick information or
            diving deeper into a topic, GenAI Search has you covered.
          </p>
        ) : (
          <Chat
            loading={loading}
            messages={messages}
            sendMessage={sendMessage}
          />
        )}
        <HistoryChat />
      </main>
    </div>
  );
}

export default GenSearch;
