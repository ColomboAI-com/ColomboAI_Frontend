import { LikeIcon } from "@/components/Icons";
import { FeedContext } from "@/context/FeedContext";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function LikePost({ post, setUserNotVerifiedModal }) {
  const [likeCounts, setLikeCounts] = useState(post?.counts?.likes || 0);
  const [isLiked, setIsLiked] = useState(post?.interactions?.isLiked || false);
  const { likePost } = useContext(FeedContext);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const onLikePost = async () => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }
    setIsLiked(!isLiked);
    if (isLiked) setLikeCounts((prev) => prev - 1);
    else setLikeCounts((prev) => prev + 1);
    await likePost(post?._id);
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });
  const isMediumScreen = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1025px)" });

  let iconWidth;
  if (isSmallScreen) {
    iconWidth = 20;
  } else if (isMediumScreen) {
    iconWidth = 50;
  } else if (isLargeScreen) {
    iconWidth = 50;
  }

  const updateUserVerifiedInfo = async () => {
    let userVerified = await localStorage.getItem("userVerified");
    let boolValue;

    if (typeof userVerified === "string") {
      boolValue = userVerified === "true";
    } else if (typeof userVerified === "boolean") {
      boolValue = userVerified;
    } else {
      boolValue = false;
    }

    setIsUserVerified(boolValue);
  };

  useEffect(() => {
    updateUserVerifiedInfo();
  }, []);
  return (
    <div className="flex items-center xl:gap-2 lg:gap-2 md:gap-2 gap-1">
      <div onClick={onLikePost}>
        <LikeIcon fill={isLiked && "#E95050"} w={iconWidth} />
      </div>
      <p className={`font-sans text-[14px] ${isLiked ? "text-brandprimary" : "text-sidebarlabel"}`}>
        {likeCounts}
      </p>
    </div>
  );
}
