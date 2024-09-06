'use client';

// import React from 'react';
// import { ShareGenAiIcon, CopyGenAiIcon } from "../Icons";


// const MessageBox = ({ message, isUser, sendMessage }) => {
//   if (isUser) {
//     return (
//       <div className="bg-gray-100  p-3 rounded-lg max-w-md ml-auto font-circular"   style={{borderRadius: '18px 18px 0px 18px'}}>
//         <p className='font-sans font-circulartext-[16px]  leading-[20.24px] text-left'style={{ letterSpacing: '0.1em', color: '#8B8B8B' }}>{message.content}</p>
//         {message.file && <p className="font-sans font-circular text-[13px] font-[700] leading-[17.71px] text-left  " 
//   style={{ letterSpacing: '0.1em',
//     color: 'rgba(139, 139, 139, 1)', }}>{message.file.name}</p>}
//       </div>
//     );
//   }

//   return (
//     <div className=" p-3 rounded-lg max-w-3xl bg-gradient-to-b"style={{ background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)', borderRadius: '18px 18px 18px 0px' }} >
//       <p className="font-sans font-circular text-[16px] font-[450] leading-[20.24px]  text-white" style={{ letterSpacing: '-0.20437875390052795px' }}>
//         {message.content}</p>
//         <div className="">
//           {/* <ShareGenAiIcon w={15} h={15}  />
//           <CopyGenAiIcon w={21} h={21}  /> */}
//         </div>
//     </div>
//   );
// };

// export default MessageBox;


import React from 'react';
import { ShareGenAiIcon, CopyGenAiIcon } from "../Icons";

const MessageBox = ({ message, isUser, sendMessage }) => {
  const contentStyle = {
    width: '700px',
    minHeight: '113px',
    margin: '0 auto',
    position: 'relative',
  };

//   const sidebarStyle = {
//     width: '351px',
//     height: '223px',
//     position: 'absolute',
//     top: '220px',
//     right: '0',
//     borderRadius: '10px 0 0 0',
//     opacity: 1,
//     display: 'grid',
//     gridTemplateColumns: 'repeat(2, 1fr)',
//     gap: '0px',
//   };

  const messageStyle = isUser
    ? {
        backgroundColor: '#F3F4F6',
        borderRadius: '18px 18px 0px 18px',
        padding: '12px',
        maxWidth: '80%',
        marginLeft: 'auto',
      }
    : {
        background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)',
        borderRadius: '18px 18px 18px 0px',
        padding: '12px',
        maxWidth: '80%',
      };

  const textStyle = {
    fontFamily: 'Circular, sans-serif',
    fontSize: '16px',
    lineHeight: '20.24px',
    letterSpacing: isUser ? '0.1em' : '-0.20437875390052795px',
    color: isUser ? '#8B8B8B' : '#FFFFFF',
    textAlign: 'left',
  };

  const fileNameStyle = {
    fontFamily: 'Circular, sans-serif',
    fontSize: '13px',
    fontWeight: '700',
    lineHeight: '17.71px',
    letterSpacing: '0.1em',
    color: 'rgba(139, 139, 139, 1)',
    marginTop: '5px',
  };

  return (
    <div className='' style={contentStyle}>
      <div style={messageStyle}>
        <p style={textStyle}>{message.content}</p>
        {isUser && message.file && (
          <p style={fileNameStyle}>{message.file.name}</p>
        )}
        {!isUser && (
          <div style={{ marginTop: '10px' }}>
            {/* <ShareGenAiIcon w={15} h={15} style={{ marginRight: '10px' }} />
            <CopyGenAiIcon w={21} h={21} /> */}
          </div>
        )}
      </div>
   
    </div>
  );
};

export default MessageBox;


// import React from 'react';
// import { ShareGenAiIcon, CopyGenAiIcon } from "../Icons";

// const MessageBox = ({ message, isUser }) => {
//   const messageStyle = isUser
//     ? {
//         backgroundColor: '#F3F4F6',
//         borderRadius: '18px 18px 0px 18px',
//         padding: '12px',
//         maxWidth: '80%',
//         marginLeft: 'auto',
//         // width: '313px',
//         left: '585px',
//         // position: 'absolute'
//       }
//     : {
//         background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)',
//         borderRadius: '18px 18px 18px 0px',
//         padding: '12px',
//         maxWidth: '80%',
//         width: '642px',
//         left: '97px',
//         // position: 'relative',
//         top: '75px'
//       };

//   const textStyle = {
//     fontFamily: 'Circular, sans-serif',
//     fontSize: '16px',
//     lineHeight: '20.24px',
//     color: isUser ? '#8B8B8B' : '#FFFFFF',
//     textAlign: 'left',
//   };

//   return (
//     <div style={messageStyle}>
//       <p style={textStyle}>{message.content}</p>
//       {!isUser && (
//         <div style={{ marginTop: '10px' }} >
//           {/* <ShareGenAiIcon w={15} h={15}  />
//           <CopyGenAiIcon w={21} h={21} /> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageBox;