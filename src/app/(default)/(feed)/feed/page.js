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
import InputBar from "@/components/layouts/InputBar";

const Feed = () => {
  return (
    <div>
      {/* <div className="hidden lg:block">
        <InputBar/>
      </div> */}

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
