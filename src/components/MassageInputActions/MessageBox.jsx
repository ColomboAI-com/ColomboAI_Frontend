// import React, { useEffect, useState } from 'react';
// import {
//   Disc3,
//   Volume2,
//   StopCircle,
//   Layers3,
//   Plus,
// } from 'lucide-react';
// // import Markdown from 'markdown-to-jsx';
// // import Copy from './MessageActions/Copy';
// // import Rewrite from './MessageActions/Rewrite';
// // import SearchImages from './SearchImages';
// // import SearchVideos from './SearchVideos';
// // import { useSpeech } from 'react-text-to-speech';
// // import { useCleanText } from './hooks/useCleanText';

// const MessageBox = ({
//   message,
//   messageIndex,
//   history,
//   loading,
//   dividerRef,
//   isLast,
//   rewrite,
//   sendMessage,
// }) => {
//   const [parsedMessage, setParsedMessage] = useState(message.content);
//   const [speechMessage, setSpeechMessage] = useState(message.content);
  
//   const cleanText = useCleanText(message.content);

//   useEffect(() => {
//     const withoutReferences = cleanText.replace(/\[\d+\]/g, '');
    
//     setParsedMessage(withoutReferences);
//     setSpeechMessage(withoutReferences);
//   }, [message.content, cleanText]);

//   const { speechStatus, start, stop } = useSpeech({ text: speechMessage });

//   return (
//     <div>
//       {message.role === 'user' && (
//         <div>
//           <h2>{cleanText}</h2>
//         </div>
//       )}

//       {message.role === 'assistant' && (
//         <div>
//           <div ref={dividerRef}>
//             <div>
//               <div>
//                 <Disc3
//                   size={20}
//                 />
//                 <h3>Answer</h3>
//               </div>
//               <Markdown>
//                 {parsedMessage}
//               </Markdown>
//               {!loading || !isLast ? (
//                 <div>
//                   <div>
//                     <Rewrite rewrite={rewrite} messageId={message.messageId} />
//                   </div>
//                   <div>
//                     <Copy initialMessage={message.content} message={message} />
//                     <button
//                       onClick={() => {
//                         if (speechStatus === 'started') {
//                           stop();
//                         } else {
//                           start();
//                         }
//                       }}
//                     >
//                       {speechStatus === 'started' ? (
//                         <StopCircle size={18} />
//                       ) : (
//                         <Volume2 size={18} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ) : null}
//               {isLast &&
//                 message.suggestions &&
//                 message.suggestions.length > 0 &&
//                 message.role === 'assistant' &&
//                 !loading && (
//                   <>
//                     <div />
//                     <div>
//                       <div>
//                         <Layers3 />
//                         <h3>Related</h3>
//                       </div>
//                       <div>
//                         {message.suggestions.map((suggestion, i) => (
//                           <div key={i}>
//                             <div />
//                             <div
//                               onClick={() => {
//                                 sendMessage(suggestion);
//                               }}
//                             >
//                               <p>{suggestion}</p>
//                               <Plus size={20} />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 )}
//             </div>
//           </div>
//           <div>
//             <SearchImages
//               query={cleanText}
//               chat_history={history.slice(0, messageIndex - 1)}
//             />
//             <SearchVideos
//               chat_history={history.slice(0, messageIndex - 1)}
//               query={cleanText}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBox;


import React from 'react';

const MessageBox = ({ message, isUser, sendMessage }) => {
  if (isUser) {
    return (
      <div className="bg-gray-100  p-3 rounded-lg max-w-md ml-auto"   style={{borderRadius: '18px 18px 0px 18px'}}>
        <p className='font-circular text-[16px]  leading-[20.24px] text-left'style={{ letterSpacing: '0.1em', color: '#8B8B8B' }}>{message.content}</p>
        {message.file && <p className="font-circular text-[16px] font-bold leading-[20.24px] text-left " 
  style={{ letterSpacing: '0.1em' }}>{message.file.name}</p>}
      </div>
    );
  }

  return (
    <div className=" p-3 rounded-lg max-w-3xl bg-gradient-to-b"style={{ background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)', borderRadius: '18px 18px 18px 0px' }} >
      <p className="font-circular text-[16px] font-[450] leading-[20.24px]  text-white" style={{ letterSpacing: '-0.20437875390052795px' }}>{message.content}</p>
      {/* Add any additional UI elements for assistant messages here */}
    </div>
  );
};

export default MessageBox;