'use client';
import React, { useState, useContext, useEffect } from "react";
import { UserProfileContext } from "@/context/UserProfileContext";
import { clearCookie, getCookie } from "@/utlils/cookies";

const FollowButton = ({ userId,creatorName}) => { // <FollowButton userId={vibe.creator._id}/>
  const { followUnfollowUser, userDetails } = useContext(UserProfileContext); 
  const [toggled, setIsToggled] = useState(false);
  const [name, Setname] = useState();
  console.log(userId);

  // Set the initial state based on userDetails
  

  const handleFollowClick = async () => {
    try {
      await followUnfollowUser(userId, !toggled); // Pass the opposite of the current toggle state
       setIsToggled(prevToggled => !prevToggled); // Toggle the state
    } catch (error) {
      console.error("Error following/unfollowing user", error);
    }
  };
  const isUserCreator = getCookie('name');
  if(isUserCreator === creatorName)
  {
    return null;
  }
  return (
    <button
      onClick={handleFollowClick}
      className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
        toggled
          ? "bg-blue-500 text-white hover:bg-blue-600" 
          : "bg-white text-blue-500 hover:bg-blue-50"
      }`}
    >
      {toggled ? "Unfollow" : "Follow"} {/* Change button text based on toggled state */}
    </button>
  );
};

export default FollowButton;  
