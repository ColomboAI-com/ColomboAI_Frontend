"use client";
import Post from "@/components/elements/cards/Post";
import Loader from "@/components/Loader";
import NoDataFound from "@/components/NoDataFound";
import { FeedContext } from "@/context/FeedContext";
import { UserProfileContext } from "@/context/UserProfileContext";
import { useContext, useEffect } from "react";
import Image from "next/image";
import ContentBlock from "../feed/post/ContentBlock";
import ImageBlock from "../feed/post/ImageBlock";
import VideoBlock from "../feed/post/VideoBlock";
import React, { useState } from "react";
import VideoPlayer from "../video-player/VideoPlayer";
import Modal from "../elements/Modal";
import CommentSection from "../comment/CommentSection";

const metaInfoData = {
  thought: {
    title: "No thoughts yet.",
    image: "/images/home/no-thoughts.svg",
  },
  image: {
    title: "No posts yet.",
    image: "/images/home/no-posts.svg",
  },
  video: {
    image: "/images/home/no-videos.svg",
    title: "No vibes or videos yet.",
  },
};
const PostCard = ({ post, onClick }) => {
  console.log(post);
  const image = post?.media?.[0];
  console.log(image);
  return (
    <div
      role="button"
      onClick={onClick}
      className="w-full h-full md:w-[233px] md:h-[233px] [&_.video-js]:max-h-[233px] [&_.video-js]:!pt-0 [&_.video-js]:!w-full [&_.video-js]:!h-full"
    >
      {post?.type === "video" && (
        <VideoPlayer
          onReady={() => {}}
          src={image + "#t=2"}
          className="w-full h-full"
          options={{
            controls: false,
            autoPlay: false,
          }}
          isPlayerClickable={false}
        />
      )}
      {post?.type === "image" && (
        <img src={image} alt="Post Image" className="w-full h-full" />
      )}
    </div>
  );
};

export default function ProfileRenderFeed({ username, filter }) {
  const [specificPost, setSpecificPost] = useState(null);
  const { posts, getPosts, loadings, page, resetFeedValues } =
    useContext(UserProfileContext);
  const metaInfo = metaInfoData[filter];

  useEffect(() => {
    getPosts(username, filter, 1, 20);
    return () => resetFeedValues();
  }, [username, filter]);

  const handleFeedScroll = () => {
    const feedSection = document.getElementById("feed_section");
    if (
      feedSection &&
      !loadings.getPost &&
      feedSection.scrollTop + feedSection.clientHeight ===
        feedSection.scrollHeight
    )
      getPosts(username, filter, page, 20);
  };

  useEffect(() => {
    const feedSection = document.getElementById("feed_section");
    feedSection?.addEventListener("scroll", handleFeedScroll);
    return () => feedSection?.removeEventListener("scroll", handleFeedScroll);
  }, [page, loadings.getPost]);

  console.log(posts, specificPost);

  if (loadings.getPost && !posts.length) return <Loader className={"mt-5"} />;

  return (
    <div>
      {posts.length ? (
        <div className="flex flex-col md:flex-row flex-wrap gap-2 md:gap-0">
          {posts.map((i, index) =>
            filter === "thought" ? (
              <Post post={i} key={index} />
            ) : (
              <PostCard
                post={i}
                key={index}
                onClick={() => setSpecificPost(i)}
              />
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-2 h-[calc(100vh-725px)] min-h-[200px]">
          <img src={metaInfo.image} />
          <p className="text-center text-sm text-gray-500">
            {metaInfo.title || "No data found"}
          </p>
        </div>
      )}

      {specificPost && (
        <Modal
          isOpen={!!specificPost}
          setIsOpen={() => setSpecificPost(null)}
          className="mx-[150px]"
        >
          <CommentSection
            setIsCommentOpen={!!specificPost}
            specificPostId={specificPost?._id}
            posts={specificPost}
            onClose={() => setSpecificPost(null)}
          />
        </Modal>
      )}
    </div>
  );
}
