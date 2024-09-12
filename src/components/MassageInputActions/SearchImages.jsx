'use client';
import React, { useState } from 'react';
import "../../../src/app/globals.css"
import SideAdComponent from '../ads/SideAd';
import SideTopAdComponent from '../ads/SideTopAd';


const SearchImages = ({ messages }) => {
  const [images, setImages] = useState([
    { img_src: '../../../images/home/scoob1.png', title: 'Scooby 1' },
    { img_src: '../../../images/home/scoob2.png', title: 'Scooby 2' },
    { img_src: '../../../images/home/scoob3.png', title: 'Scooby 3' },
    { img_src: '../../../images/home/scoob4.png', title: 'Scooby 4' },
    { img_src: '../../../images/home/event.png', title: 'Promo 1' },
    { img_src: '../../../images/home/sale.png', title: 'Promo 2' },
  ]);
  const [messageNum, setMessageNum] = useState(messages)

  return (
    <div className="fixed top-[220px] right-5 w-[351px] flex flex-col items-center gap-2.5 h-[calc(100vh-110px)] hide-scrollbar overflow-y-auto">
      <div className="grid grid-cols-2 gap-2">
       
        {images.slice(0, 4).map((image, i) => (
          <img
            key={i}
            src={image.img_src}
            alt={image.title}
            className="h-full w-[351px] aspect-video object-cover rounded-lg transition duration-200 hover:scale-[1.02] cursor-pointer"
          />
        ))}
      </div>
      <div className="w-[300px] h-[250px] cursor-pointer">
          <SideTopAdComponent />
        </div>
        <div className="w-[300px] h-[600px]  cursor-pointer">
          <SideAdComponent />
        </div>
          {/* <div className='w-[300px] h-[250px] transition duration-200 hover:scale-[1.02] cursor-pointer'>
            <SideTopAdComponent/>
            
          </div>
          <div className='w-[300px] h-[600px]  transition duration-200 hover:scale-[1.02] cursor-pointer'>
            <SideAdComponent/>
          </div> */}
      {/* {images.slice(4).map((image, i) => (
        <img
          key={i + 4}
          src={image.img_src}
          alt={image.title}
          className="w-[90%] transition duration-200 hover:scale-[1.02] cursor-pointer"
        />
      ))} */}
    </div>
  );
};

export default SearchImages;