import { VibesLikesIcon } from "@/components/Icons";
import { FeedContext } from "@/context/FeedContext";
import React, { useContext, useState } from "react";

const LikeVibe = ({ vibe }) => {

  const [likeCounts, setLikeCounts] = useState(vibe?.counts?.like || 0);
  const [isLiked, setIsLiked] = useState(vibe?.interactions?.isLiked);
  const { likePost } = useContext(FeedContext);

  const onLikeVibe = async () => {
    setIsLiked(!isLiked)
    if (isLiked) setLikeCounts(prev => (prev - 1))
    else setLikeCounts(prev => (prev + 1))
    await likePost(vibe?._id)
  }

  return (
    <div className="flex flex-col items-center gap-[2px] md:gap-1" onClick={onLikeVibe}>
      <VibesLikesIcon w={25} h={25} fill={"#ffffff"} />
      <p className="text-[10px]">{likeCounts}</p>
    </div>
  );
};

export default LikeVibe;
