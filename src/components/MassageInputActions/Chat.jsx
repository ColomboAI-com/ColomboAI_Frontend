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
    <div style={{ position: 'relative' }}>
      {messages.length > 0 ? <div style={chatContainerStyle}>
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
      <SearchImages messages={messageNum}/>
    </div>
  );
};

export default Chat;
