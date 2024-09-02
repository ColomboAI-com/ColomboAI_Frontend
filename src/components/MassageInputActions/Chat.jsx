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

// 'use client';

// import React, { Fragment, useEffect, useRef } from 'react';
// import MessageInput from './MessageInput.jsx';

// const Chat = ({ loading, messages = [], sendMessage }) => {
//   const messageEnd = useRef(null);

//   useEffect(() => {
//     if (messageEnd.current) {
//       messageEnd.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <div className="flex flex-col space-y-6 pt-8 pb-44 lg:pb-32 sm:mx-4 md:mx-8">
//       {messages.map((msg, i) => (
//         <Fragment key={i}>
//           <div className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
//             {msg.content}
//           </div>
//           {i < messages.length - 1 && (
//             <div className="h-px w-full bg-light-secondary dark:bg-dark-secondary" />
//           )}
//         </Fragment>
//       ))}
//       {loading && <div className="p-4 rounded-lg bg-gray-100">Loading...</div>}
//       <div ref={messageEnd} className="h-0" />
//       <div className="fixed bottom-24 lg:bottom-10 left-0 right-0 px-4">
//         <MessageInput loading={loading} sendMessage={sendMessage} />
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React from 'react';
import MessageBox from './MessageBox';

const Chat = ({ loading, messages, sendMessage }) => {
  return (
    <div className="space-y-4 mt-4">
      {messages.map((msg, i) => (
        <MessageBox
          key={i}
          message={msg}
          isUser={msg.role === 'user'}
          sendMessage={sendMessage}
        />
      ))}
      {loading && <div className="text-center">Loading...</div>}
    </div>
  );
};

export default Chat;
