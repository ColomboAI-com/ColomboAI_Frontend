"use client";
import React from 'react';
import { HistoryIcon, SettingIcon } from "../Icons";


const RightSideIcons = () => {
    return (
      <div className="fixed top-[113px] left-[1281px] w-[83px] h-[27px] flex items-center justify-between">
      <button className="">
        <HistoryIcon w={29} h={27}/>
      </button>
      <button className=" ">
        <SettingIcon w={26} h={26}/>
      </button>
    </div>
       
      
      );
};

export default RightSideIcons;