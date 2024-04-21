/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Post from "@/components/elements/cards/Post";
import Thought from "@/components/elements/cards/Thought";

import Stories from "@/components/elements/sliders/Stories";
import Sugeested from "@/components/elements/sliders/Sugeested";
import LikeThis from "@/components/elements/sliders/LikeThis";
import SectionHeading from "@/components/elements/SectionHeading";

const Feed = () => {
  return (
    <div>
      <div className="relative pt-[26px] pb-[31px]">
        <input
          type="text"
          placeholder="Ask or create anything..."
          className="w-full h-[80px] border-[1px] border-brandprimary rounded-[50px] py-[28px] px-[35px] text-[#ACACAC] text-[20px] tracking-[4px] font-sans"
        ></input>
        <img
          src="/images/home/search-icon.png"
          className="absolute top-[52px] right-[35px]"
        />
      </div>

      <Stories />

      <Post />

      <SectionHeading title="Suggested Vibes For You"/>

      <Sugeested />

      <Thought />

      <SectionHeading title="You might like these"/>

      <LikeThis />
    </div>
  );
};

export default Feed;
