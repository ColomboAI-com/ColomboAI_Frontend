"use client";
import React from 'react';
import { HistoryIcon, SettingIcon } from "../Icons";
import Link from 'next/link';


const RightSideIcons = () => {
    return (
      <div className="fixed top-[113px] left-[1281px] w-[83px] h-[27px] flex items-center justify-between">
      <Link  className="" href={"/history"}>
        <HistoryIcon w={29} h={27}/>
      </Link>
      <button className=" ">
        <SettingIcon w={26} h={26}/>
      </button>
    </div>
       
      
      );
};

export default RightSideIcons;