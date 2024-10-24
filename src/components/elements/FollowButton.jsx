"use client";
import React, { useState } from "react";
import axios from "axios";
import { ROOT_URL_FEED, ROOT_URL_AUTH } from "@/utlils/rootURL";
import { getCookie } from "@/utlils/cookies";

const FollowButton = ({ followeeId }) => {
  const [toggled, setIsToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFollowUnfollow = async () => {
    setLoading(true); // Start loading
    try {
      const res = await axios.patch(
        `${ROOT_URL_AUTH}/follow/${followeeId}`, 
        
        {
          headers: {
            Authorization: getCookie("token"), 
          },
        }
      );
      setIsToggled((prev) => !prev); // Toggle follow/unfollow status
    } catch (err) {
      console.error("Error during follow/unfollow:", err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <button
      onClick={handleFollowUnfollow}
      disabled={loading} 
      className={`px-4 py-1 text-sm font-semibold rounded-full transition-colors duration-300 ${
        toggled
          ? "bg-blue-500 text-white hover:bg-blue-600" 
          : "bg-white text-blue-500 hover:bg-blue-50"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`} 
    >
      {loading ? "Processing..." : toggled ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
