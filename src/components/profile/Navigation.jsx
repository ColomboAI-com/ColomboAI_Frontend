"use client";
import { useState } from "react";
import {
  PostsIcon,
  ThoughtIcon,
  VideoIcon,
  BookmarkIcon,
  TagIcon,
} from "../Icons";
import Post from "./Post";
import Thought from "./Thought";
import Video from "./Video";
import Bookmark from "./Bookmark";
import Tag from "./Tag";
import ReactPlayer from "react-player";

const IconButton = ({ label, onClick, children }) => (
  <div
    className="mx-4"
    onClick={onClick}
    role="button"
    tabIndex="0"
    aria-label={label}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
      }
    }}
  >
    <div className="w-[29px] mx-auto">{children}</div>
  </div>
);

const Navigation = ({ username }) => {
  const [activeTab, setActiveTab] = useState("post");

  const renderComponent = () => {
    switch (activeTab) {
      case "post":
        return <Post username={username} />;
      case "thought":
        return <Thought username={username} />;
      case "video":
        return <Video username={username} />;
      case "bookmark":
        return <Bookmark username={username} />;
      case "tags":
        return <Tag username={username} />;
    }
  };

  return (
    <div className="bg-white ">
      <div className="pt-4 flex flex-wrap items-center justify-evenly">
        <IconButton label="Posts" onClick={() => setActiveTab("post")}>
          <PostsIcon
            w={30}
            h={30}
            fill={activeTab === "post" ? "#1E71F2" : "#ACACAC"}
          />
        </IconButton>

        <IconButton label="Thoughts" onClick={() => setActiveTab("thought")}>
          <ThoughtIcon
            w={35}
            h={35}
            fill={activeTab === "thought" ? "#1E71F2" : "#ACACAC"}
          />
        </IconButton>

        <IconButton label="Videos" onClick={() => setActiveTab("video")}>
          <VideoIcon
            w={30}
            h={30}
            fill={activeTab === "video" ? "#1E71F2" : "#ACACAC"}
          />
        </IconButton>

        <IconButton label="Bookmarks" onClick={() => setActiveTab("bookmark")}>
          <BookmarkIcon
            w={25}
            h={25}
            fill={activeTab === "bookmark" ? "#1E71F2" : "#ACACAC"}
          />
        </IconButton>

        <IconButton label="Tags" onClick={() => setActiveTab("tags")}>
          <TagIcon
            w={30}
            h={30}
            fill={activeTab === "tags" ? "#1E71F2" : "#ACACAC"}
          />
        </IconButton>
      </div>
      <div className="border- border-green-400 mt-2">{renderComponent()}</div>
    </div>
  );
};

export default Navigation;
