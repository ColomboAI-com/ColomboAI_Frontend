"use client";
import React from 'react';
import { HistoryIcon, SettingIcon } from "../Icons";
import Link from 'next/link';

const RightSideIcons = () => {
    return (
      <div className="flex items-center mt-[3rem] gap-5 md:ml-[8rem] lg:ml-[10rem] xl:ml-[16rem]">
      <Link  className="" href={"/history"}>
        <HistoryIcon w={29} h={27}/>
      </Link>
      {/* <button className=" ">
        <SettingIcon w={26} h={26}/>
      </button> */}
    </div>
       
      
      );
};

export default RightSideIcons;