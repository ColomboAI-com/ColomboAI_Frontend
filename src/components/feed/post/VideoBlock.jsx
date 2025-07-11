import React from "react";
import VideoPlayer from "@/components/video-player/VideoPlayer"; // This is VideoJS
import { useContext } from "react"; // Import useContext
import { GlobalContext } from "@/context/GlobalContext"; // Import GlobalContext

import { useState } from "react"; // Import useState
import MediaLikeAnimation from "@/components/animations/MediaLikeAnimation"; // Import the animation component

// Expects:
// mediaItem: { url: string, type: 'video', width?: number, height?: number, poster?: string }
// allMediaItems: array of all media items in the post, for gallery view
// currentIndexInPost: index of this mediaItem within allMediaItems
// postId: string - ID of the post
// onMediaLike: function - callback to trigger like action
export default function VideoBlock({ mediaItem, allMediaItems, currentIndexInPost, postId, onMediaLike }) {
  const { openMediaViewer } = useContext(GlobalContext);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);

  if (!mediaItem || !mediaItem.url) {
    // Render a placeholder for missing video or if loading
    return <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center"><p className="text-gray-500">Video unavailable</p></div>;
  }

  const { url, width: originalWidth, height: originalHeight, poster: mediaPoster } = mediaItem;

  // Default to 16:9 for videos. Can be adjusted if other ratios are common for videos.
  let aspectRatioClass = 'aspect-video';

  // Optionally, adjust container aspect ratio based on video dimensions
  if (originalWidth && originalHeight && originalHeight > 0) {
    const ratio = originalWidth / originalHeight;
    if (ratio < 1.2 && ratio > 0.8) { // More square-like
        aspectRatioClass = 'aspect-square';
    } else if (ratio < 0.8) { // More portrait like 4:5
        aspectRatioClass = 'aspect-[4/5]';
    }
    // Otherwise, it defaults to aspect-video (16:9), suitable for most landscape videos.
  }

  }

  const handleDoubleClick = () => {
    if (postId && onMediaLike) {
      onMediaLike(postId, true); // Pass true to indicate it's a like action
      setShowHeartAnimation(true);
    }
  };

  return (
    // The outer div now controls the aspect ratio of the video area.
    <div
      className={`w-full ${aspectRatioClass} overflow-hidden relative bg-black cursor-pointer`}
      onClick={() => { // Single click opens the media viewer
        if (mediaItem && mediaItem.url) {
          const slides = allMediaItems && allMediaItems.length > 0 ? allMediaItems : [mediaItem];
          const startIndex = allMediaItems && allMediaItems.length > 0 ? currentIndexInPost : 0;
          openMediaViewer(slides, startIndex);
        }
      }}
      onDoubleClick={handleDoubleClick}
    >
      <VideoPlayer
        // Note: The VideoPlayer component (VideoJS) is expected to be fluid and fill this container.
        // We might need to ensure its internal <video> tag also uses object-fit: cover if the video's
        // own aspect ratio doesn't match the container's forced aspect ratio and we want cropping.
        // Video.js default is usually 'contain'. This might need adjustment in VideoPlayer.jsx
        src={url + "#t=0.1"} // Appending #t=0.1 can help with poster display and player readiness
        isPlayerClickable // Prop from original implementation
        poster={mediaPoster || "/images/home/feed-banner-img.png"} // Use poster from mediaItem or default
        // options={{ controlBar: false }} // Example: further customize player options if needed
      />
      {showHeartAnimation && <MediaLikeAnimation onAnimationEnd={() => setShowHeartAnimation(false)} />}
    </div>
  );
}

// The local Video component using ReactPlayer was not used by the exported VideoBlock, so it's removed.
