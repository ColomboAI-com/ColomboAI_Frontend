"use client";
// import React, { useState } from 'react';
// import "../../../src/app/globals.css"
// import SideAdComponent from '../ads/SideAd';
// import SideTopAdComponent from '../ads/SideTopAd';

// const SearchImages = ({ messages }) => {
//   const [images, setImages] = useState([
//     { img_src: '../../../images/home/scoob1.png', title: 'Scooby 1' },
//     { img_src: '../../../images/home/scoob2.png', title: 'Scooby 2' },
//     { img_src: '../../../images/home/scoob3.png', title: 'Scooby 3' },
//     { img_src: '../../../images/home/scoob4.png', title: 'Scooby 4' },
//     { img_src: '../../../images/home/event.png', title: 'Promo 1' },
//     { img_src: '../../../images/home/sale.png', title: 'Promo 2' },
//   ]);
//   const [messageNum, setMessageNum] = useState(messages)

//   return (
//     <div className=" fixed top-[220px] right-5 w-[351px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
//       <div className="grid grid-cols-2 gap-2">

//         {images.slice(0, 4).map((image, i) => (
//           <img
//             key={i}
//             src={image.img_src}
//             alt={image.title}
//             className="h-full w-[351px] aspect-video object-cover rounded-lg transition duration-200 hover:scale-[1.02] cursor-pointer"
//           />
//         ))}
//       </div>

//           <div className='w-[300px] h-[250px] transition duration-200 hover:scale-[1.02] cursor-pointer'>
//             <SideTopAdComponent/>

//           </div>
//           <div className='w-[300px] h-[600px]  transition duration-200 hover:scale-[1.02] cursor-pointer'>
//             <SideAdComponent/>
//           </div>
//       {/* {images.slice(4).map((image, i) => (
//         <img
//           key={i + 4}
//           src={image.img_src}
//           alt={image.title}
//           className="w-[90%] transition duration-200 hover:scale-[1.02] cursor-pointer"
//         />
//       ))} */}
//     </div>
//   );
// };

// export default SearchImages;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../../src/app/globals.css";
// import SideAdComponent from "../ads/SideAd";
// import SideTopAdComponent from "../ads/SideTopAd";

// const SearchImages = ({ messages, query, chatId }) => {
//   console.log("chat messages to get images", messages);
//   console.log("user query", query);
//   console.log("chat Id", chatId);

//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post(
//           "https://genaimlapi.colomboai.com/images",
//           {
//             // query: query,
//             // chat_history: messages,
//             // chat_model_provider: "groq",
//             // chat_model: "Llama 3.1 70B",
//             query:
//               "Can you provide the latest recipe of Pav Bhaji by Ranveer Brar?",
//             chat_history: [
//               {
//                 id: 201,
//                 content: "Hi",
//                 chatId: "7f632dbea847fbcc5403bc72fe592e41fd45215c",
//                 messageId: "cffe2cd042d250",
//                 role: "user",
//                 metadata: '{"createdAt":"2024-09-11T23:33:40.651Z"}',
//               },
//               {
//                 id: 202,
//                 content:
//                   "Hello. How can I assist you today? Do you have a question or topic you'd like to discuss?",
//                 chatId: "7f632dbea847fbcc5403bc72fe592e41fd45215c",
//                 messageId: "cffe2cd042d250",
//                 role: "assistant",
//                 metadata: '{"createdAt":"2024-09-11T23:33:41.282Z"}',
//               },
//             ],
//             chat_model_provider: "groq",
//             chat_model: "Llama 3.1 70B",
//           }
//         );
//         setImages(response.data.images);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchData();
//   }, [query]);

//   return (
//     <div className="fixed top-[220px] right-5 w-[351px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
//       <div className="grid grid-cols-2 gap-2">
//         {images.slice(0, 4).map((image, i) => (
//           <a key={i} href={image.url} target="_blank" rel="noopener noreferrer">
//             <img
//               src={image.img_src}
//               alt={image.title}
//               className="h-full w-[351px] aspect-video object-cover rounded-lg transition duration-200 hover:scale-[1.02] cursor-pointer"
//             />
//           </a>
//         ))}
//       </div>
//       <div className="w-[300px] h-[250px] transition duration-200 hover:scale-[1.02] cursor-pointer">
//         <SideTopAdComponent />
//       </div>
//       <div className="w-[300px] h-[600px] transition duration-200 hover:scale-[1.02] cursor-pointer">
//         <SideAdComponent />
//       </div>
//     </div>
//   );
// };

// export default SearchImages;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../../../src/app/globals.css";
// import SideAdComponent from "../ads/SideAd";
// import SideTopAdComponent from "../ads/SideTopAd";

// const SearchImages = ({ chatId }) => {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     const fetchChatAndImages = async () => {
//       try {
//         // Fetch chat history
//         const chatResponse = await axios.get(
//           `https://genaimlapi.colomboai.com/chats/${chatId}`
//         );
//         const messages = chatResponse.data.messages;
//         const lastUserMessage = messages
//           .filter((msg) => msg.role === "user")
//           .pop();

//         if (lastUserMessage) {
//           // Fetch images based on the last user message content
//           const imagesResponse = await axios.post(
//             "https://genaimlapi.colomboai.com/images",
//             {
//               query: lastUserMessage.content,
//               chat_history: messages,
//               chat_model_provider: "groq",
//               chat_model: "Llama 3.1 70B",
//             }
//           );
//           setImages(imagesResponse.data.images);
//         } else {
//           console.log("No user messages found in the chat history.");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchChatAndImages();
//   }, [chatId]); // Dependency on chatId ensures that the effect runs when chatId changes

//   return (
//     <div className="fixed top-[220px] right-5 w-[351px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
//       <div className="grid grid-cols-2 gap-2">
//         {/* {images.map((image, i) => ( */}
//         {images.slice(0, 4).map((image, i) => (
//           <a key={i} href={image.url} target="_blank" rel="noopener noreferrer">
//             <img
//               src={image.img_src}
//               alt={image.title}
//               className="h-full w-[351px] aspect-video object-cover rounded-lg transition duration-200 hover:scale-[1.02] cursor-pointer"
//             />
//           </a>
//         ))}
//       </div>
//       <div className="w-[300px] h-[250px] transition duration-200 hover:scale-[1.02] cursor-pointer">
//         <SideTopAdComponent />
//       </div>
//       <div className="w-[300px] h-[600px] transition duration-200 hover:scale-[1.02] cursor-pointer">
//         <SideAdComponent />
//       </div>
//     </div>
//   );
// };

// export default SearchImages;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../src/app/globals.css";
import SideAdComponent from "../ads/SideAd";
import SideTopAdComponent from "../ads/SideTopAd";

const SearchImages = ({ chatId, query }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Function to fetch chat messages and images
    const fetchChatAndImages = async () => {
      try {
        // Fetch the chat messages first
        const chatResponse = await axios.get(
          `https://genaimlapi.colomboai.com/chats/${chatId}`
        );
        const messages = chatResponse.data.messages;

        // Check if there's a new query to fetch images for
        if (query) {
          // Fetch images based on the query
          const imagesResponse = await axios.post(
            "https://genaimlapi.colomboai.com/images",
            {
              query: query,
              chat_history: messages,
              chat_model_provider: "groq",
              chat_model: "Llama 3.1 70B",
            }
          );
          setImages(imagesResponse.data.images.slice(0, 4)); // Only store first 4 images
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query) {
      // Ensure there is a query before fetching
      fetchChatAndImages();
    }
  }, [chatId, query]); // Dependency on chatId and query to refetch when they change

  return (
    <div className="fixed top-[220px] right-5 w-[351px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
      <div className="grid grid-cols-2 gap-2">
        {images.map((image, i) => (
          <a key={i} href={image.url} target="_blank" rel="noopener noreferrer">
            <img
              src={image.img_src}
              alt={image.title}
              className="h-full w-[351px] aspect-video object-cover rounded-lg transition duration-200 hover:scale-[1.02] cursor-pointer"
            />
          </a>
        ))}
      </div>
      <div className="w-[300px] h-[250px] transition duration-200 hover:scale-[1.02] cursor-pointer">
        <SideTopAdComponent />
      </div>
      <div className="w-[300px] h-[600px] transition duration-200 hover:scale-[1.02] cursor-pointer">
        <SideAdComponent />
      </div>
    </div>
  );
};

export default SearchImages;
