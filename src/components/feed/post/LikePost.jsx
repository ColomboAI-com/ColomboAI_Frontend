// import { LikeIcon } from "@/components/Icons"; // Remove custom icon
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { FeedContext } from "@/context/FeedContext";
import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function LikePost({ post, setUserNotVerifiedModal }) {
  const [likeCounts, setLikeCounts] = useState(post?.counts?.likes || 0);
  const [isLiked, setIsLiked] = useState(post?.interactions?.isLiked || false);
  const { likePost } = useContext(FeedContext);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(false); // State for animation

  // Synchronize with post prop changes from context
  useEffect(() => {
    setIsLiked(post?.interactions?.isLiked || false);
    setLikeCounts(post?.counts?.likes || 0);
  }, [post?.interactions?.isLiked, post?.counts?.likes]);

  const onLikePost = async () => {
    if (isUserVerified == false) {
      setUserNotVerifiedModal(true);
      return;
    }

    const originalIsLiked = isLiked;
    const originalLikeCounts = likeCounts;

    // Optimistic update
    const newLikedState = !originalIsLiked;
    setIsLiked(newLikedState);
    if (newLikedState) {
      setLikeCounts(prev => prev + 1);
      setAnimateHeart(true);
      setTimeout(() => setAnimateHeart(false), 300);
    } else {
      setLikeCounts(prev => prev - 1);
    }

    try {
      await likePost(post?._id);
      // Backend call successful, FeedContext will update the global 'posts' state.
      // The useEffect above will then ensure this component syncs if the prop changes.
    } catch (error) {
      console.error("Failed to like post:", error);
      // Revert optimistic update on error
      setIsLiked(originalIsLiked);
      setLikeCounts(originalLikeCounts);
      // Optionally show an error message to the user
    }
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
      <div
        onClick={onLikePost}
        className={`cursor-pointer transition-transform duration-150 ease-in-out ${
          animateHeart ? "transform scale-125" : "transform scale-100"
        }`}
      >
        {isLiked ? (
          <HeartIconSolid className="w-6 h-6 text-red-500" />
        ) : (
          <HeartIconOutline className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-red-500 dark:group-hover:text-red-400" />
        )}
      </div>
      <p className={`font-sans text-sm ${isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}> {/* text-[14px] to text-sm, updated colors */}
        {likeCounts}
      </p>
    </div>
  );
}
