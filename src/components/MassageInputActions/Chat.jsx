// 'use client';

// import React, { Fragment, useEffect, useRef, useState } from 'react';
// import MessageInput from './MessageInput.jsx';
// import InputBar from '../layouts/InputBar.jsx';
// import MessageBox from './MessageBox';
// import MessageBoxLoading from './MessageBoxLoading';

// const Chat = ({
//   loading,
//   messages,
//   sendMessage,
//   messageAppeared,
//   rewrite,
//   onFileUpload
// }) => {
//   const [dividerWidth, setDividerWidth] = useState(0);
//   const dividerRef = useRef(null);
//   const messageEnd = useRef(null);
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const updateDividerWidth = () => {
//       if (dividerRef.current) {
//         setDividerWidth(dividerRef.current.scrollWidth);
//       }
//     };

//     updateDividerWidth();

//     window.addEventListener('resize', updateDividerWidth);

//     return () => {
//       window.removeEventListener('resize', updateDividerWidth);
//     };
//   });

//   useEffect(() => {
//     if (messageEnd.current) {
//       messageEnd.current.scrollIntoView({ behavior: 'smooth' });
//     }

//     if (messages.length === 1) {
//       document.title = `${messages[0].content.substring(0, 30)} - Perplexica`;
//     }
//   }, [messages]);

//   const handleSendMessage = (message, files) => {
//     sendMessage(message, files);
//   };

//   return (
//     <div className="flex flex-col space-y-6 pt-8 pb-44 lg:pb-32 sm:mx-4 md:mx-8">
//       {messages.map((msg, i) => {
//         const isLast = i === messages.length - 1;

//         return (
//           <Fragment key={msg.messageId}>
//             <MessageBox
//               key={i}
//               message={msg}
//               messageIndex={i}
//               history={messages}
//               loading={loading}
//               dividerRef={isLast ? dividerRef : undefined}
//               isLast={isLast}
//               rewrite={rewrite}
//               sendMessage={(message) => sendMessage(message)}
//             />
//             {!isLast && msg.role === 'assistant' && (
//               <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//             )}
//           </Fragment>
//         );
//       })}
//       {loading && !messageAppeared && <MessageBoxLoading />}
//       <div ref={messageEnd} className="h-0" />
//       {dividerWidth > 0 && (
//         <div
//           className="bottom-24 lg:bottom-10 fixed z-40"
//           style={{ width: dividerWidth }}
//         >
//           <MessageInput loading={loading} sendMessage={handleSendMessage} onFileUpload={onFileUpload} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;

// import React from 'react';
// import MessageBox from './MessageBox';

// const Chat = ({ loading, messages, sendMessage }) => {
//   return (
//     <div className="space-y-4 mt-4">
//       {messages.map((msg, i) => (
//         <MessageBox
//           key={i}
//           message={msg}
//           isUser={msg.role === 'user'}
//           sendMessage={sendMessage}
//         />
//       ))}
//       {loading && <div className="text-center">Loading...</div>}
//     </div>
//   );
// };

// export default Chat;
'use client';
import React, { useState, useEffect } from 'react';
import MessageBox from './MessageBox';
import SearchImages from './SearchImages';
import leftArrow from '../../../public/images/icons/leftArrow.png'
import rightArrow from '../../../public/images/icons/rightArrow.png'
import { Plus_Jakarta_Sans } from '@next/font/google';
import Image from 'next/image';


const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const Chat = ({ loading, messages, sendMessage }) => {
  const chatContainerStyle = {
    maxWidth: '700px',
    // margin: '0 auto',
    padding: '20px',
    position: 'relative'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '8px 0',
    // backgroundColor: '#f3f4f6',
    borderRadius: '4px',
  };

  const [messageNum, setMessageNum] = useState(false)

  useEffect(() => {
    if (messages.length > 0) {
      setMessageNum(true)
    } else {
      setMessageNum(false)
    }
  }, [messages])

  return (
    <div style={{ position: 'relative' }} className={plusJakartaSans.className}>
      {messages.length > 0 ? <div style={chatContainerStyle} className='ml-[7rem] flex flex-col items-center'>
        <div
          className="flex flex-col w-[48rem] gap-3 text-center p-3 bg-[#F7F7F7] border-[1px] rounded-3xl border-blue-500"
        >
          <div
            className='flex items-center justify-between'
          >
            <Image src={leftArrow} alt='colombo' className='ml-1' />
            <p className='flex-grow text-center font-[450] text-[#1E71F2]'>https://vimeo.com/blog/post/what-is-a-video-player/</p>
            <div className='flex items-center gap-2'>
              <p className='mr-1 text-[#8B8B8B] text-lg font-[450]'>$3</p>
              <Image src={rightArrow} alt='colombo' />
            </div>
          </div>
          <p className='font-[450] text-[#8B8B8B] mx-3'>What is a video player? Plus, 5 platforms to consider. Today, video streaming online is very much part of our daily lives. But what exactly is the mechanism that allows us to play video to on a computer or smartphone?</p>
        </div>
        <div className='flex flex-row justify-center gap-3 my-[1rem] w-[48rem]'>
          <div className='rounded-xl bg-[#F7F7F7] border-[1px] border-[#ACACAC] p-1 gap-2 flex flex-col items-center'>
            <p className='text-[#1E71F2] border-b-[#1E71F2] border-b-[1px] text-[0.6rem]'>coschedule.com</p>
            <p className='text-[#ACACAC] mx-1 text-[0.6rem]'>What Is a​ Video? - Ultimate Marketing Dictionary</p>
          </div>
          <div className='rounded-xl bg-[#F7F7F7] border-[1px] border-[#ACACAC] p-1 gap-2 flex flex-col items-center'>
            <p className='text-[#1E71F2] border-b-[#1E71F2] border-b-[1px] text-[0.6rem]'>info.flip.com</p>
            <p className='text-[#ACACAC] mx-1 text-[0.6rem]'>Flip is a video discussion and sharing app, free f...</p>
          </div>
          <div className='rounded-xl bg-[#F7F7F7] border-[1px] border-[#ACACAC] p-1 gap-2 flex flex-col items-center'>
            <p className='text-[#1E71F2] border-b-[#1E71F2] border-b-[1px] text-[0.6rem]'>arxiv.org</p>
            <p className='text-[#ACACAC] mx-1 text-[0.6rem]'>An Image is Worth 16x16 Words, What is a Video Worth?</p>
          </div>
        </div>
        {messages.map((msg, i) => (
          <MessageBox
            key={i}
            message={msg}
            isUser={msg.role === 'user'}
            sendMessage={sendMessage}
          />
        ))}
        {loading && (
          <div style={loadingStyle}>
            Loading...
          </div>
        )}
      </div> :
        <p className="text-[15px] absolute font-[450] text-justify  text-[#ACACAC] max-w-[806px] h-[60px] top-[21px] left-[5rem]">
          Welcome to GenAI Search, your go-to tool for instant answers and web exploration! Simply type your question or topic of interest, and GenAI will provide you with accurate answers along with related links from the web. Whether you are seeking quick information or diving deeper into a topic, GenAI Search has you covered.
        </p>}
      <SearchImages messages={messageNum} />
    </div>
  );
};

export default Chat;
