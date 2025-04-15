"use client";
import Post from "@/components/elements/cards/Post";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FeedContext } from "@/context/FeedContext";

const SinglePost = () => {
  const params = useParams();
  const { postId } = params;
  const [currPost, setCurrPost] = useState(null);
  const { getPostById } = useContext(FeedContext);

  const getPostDetails = async () => {
    let post = await getPostById(postId);
    setCurrPost(post);
  };

  useEffect(() => {
    getPostDetails();
  }, []);

  return (
    <div className="relative flex flex-col mx-auto justify-center sm:w-[375px] w-[680px] md:w-[680px] lg:w-[680px]">
      <div className="sm:px-0 md:px-0">{currPost && <Post post={currPost} index={0} />}</div>
    </div>
  );
};

export default SinglePost;
