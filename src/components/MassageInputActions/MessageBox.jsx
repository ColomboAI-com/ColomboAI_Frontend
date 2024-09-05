'use client';

import React from 'react';
import { ShareGenAiIcon, CopyGenAiIcon } from "../Icons";


const MessageBox = ({ message, isUser, sendMessage }) => {
  if (isUser) {
    return (
      <div className="bg-gray-100  p-3 rounded-lg max-w-md ml-auto font-circular"   style={{borderRadius: '18px 18px 0px 18px'}}>
        <p className='font-sans font-circulartext-[16px]  leading-[20.24px] text-left'style={{ letterSpacing: '0.1em', color: '#8B8B8B' }}>{message.content}</p>
        {message.file && <p className="font-sans font-circular text-[13px] font-[700] leading-[17.71px] text-left  " 
  style={{ letterSpacing: '0.1em',
    color: 'rgba(139, 139, 139, 1)', }}>{message.file.name}</p>}
      </div>
    );
  }

  return (
    <div className=" p-3 rounded-lg max-w-3xl bg-gradient-to-b"style={{ background: 'linear-gradient(180deg, #6237FF 30.5%, #258EFF 100%)', borderRadius: '18px 18px 18px 0px' }} >
      <p className="font-sans font-circular text-[16px] font-[450] leading-[20.24px]  text-white" style={{ letterSpacing: '-0.20437875390052795px' }}>
        {message.content}</p>
        <div className="">
          {/* <ShareGenAiIcon w={15} h={15}  />
          <CopyGenAiIcon w={21} h={21}  /> */}
        </div>
    </div>
  );
};

export default MessageBox;