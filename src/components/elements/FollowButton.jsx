'use client';
import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "@/context/UserProfileContext"; 

const FollowButton = ({ userId }) => {//<FollowButton userId={vibe.creator._id}/>
  const { followUnfollowUser, userDetails } = useContext(UserProfileContext); 
  const [toggled, setIsToggled] = useState(false);

  useEffect(() => {
    
    if (userDetails?.is_following) {
      setIsToggled(true);
    }
  }, [userDetails]);

  const handleFollowClick = async () => {
    try {
      await followUnfollowUser(userId, toggled); 
      setIsToggled(!toggled); 
    } catch (error) {
      console.error("Error following/unfollowing user", error);
    }
  };
  return (
    <button
      onClick={handleFollowClick}
      className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
        toggled
          ? "bg-blue-500 text-white hover:bg-blue-600" 
          : "bg-white text-blue-500 hover:bg-blue-50"
      }`}
    >
        Follow
    </button>
  );
};

export default FollowButton;
