import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

import { useState } from "react"; // Import useState
import MediaLikeAnimation from "@/components/animations/MediaLikeAnimation"; // Import the animation component

// Expects:
// mediaItem: { url: string, type: 'image', width?: number, height?: number }
// allMediaItems: array of all media items in the post, for gallery view
// currentIndexInPost: index of this mediaItem within allMediaItems
// postId: string - ID of the post
// onMediaLike: function - callback to trigger like action (e.g., from FeedContext via PostCard)
export default function ImageBlock({ mediaItem, allMediaItems, currentIndexInPost, postId, onMediaLike }) {
  const { openMediaViewer } = useContext(GlobalContext);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);


  if (!mediaItem || !mediaItem.url) {
    // Optionally render a placeholder or return null if no image
    return <div className="w-full aspect-square bg-gray-200 dark:bg-gray-800"></div>;
  }

  const { url, width: originalWidth, height: originalHeight } = mediaItem;

  let aspectRatioClass = 'aspect-square'; // Default to 1:1 (square)

  // Determine aspect ratio class based on original dimensions if available
  // This logic helps choose a container aspect ratio that's close to the image's,
  // minimizing cropping while maintaining some standard shapes.
  if (originalWidth && originalHeight && originalHeight > 0) {
    const ratio = originalWidth / originalHeight;
    if (ratio > 1.3) { // Landscape (wider than ~4:3)
      aspectRatioClass = 'aspect-video'; // 16:9
    } else if (ratio < 0.9) { // Portrait (taller than ~10:9)
      aspectRatioClass = 'aspect-[4/5]'; // 4:5
    } else { // Close to square
      aspectRatioClass = 'aspect-square'; // 1:1
    }
  }

  const handleDoubleClick = () => {
    if (postId && onMediaLike) {
      onMediaLike(postId, true); // Pass true to indicate it's a like action
      setShowHeartAnimation(true);
    }
  };

  return (
    <div
      onClick={() => { // Single click opens the media viewer
        if (mediaItem && mediaItem.url) {
          const slides = allMediaItems && allMediaItems.length > 0 ? allMediaItems : [mediaItem];
          const startIndex = allMediaItems && allMediaItems.length > 0 ? currentIndexInPost : 0;
          openMediaViewer(slides, startIndex);
        }
      }}
      onDoubleClick={handleDoubleClick}
      className={`w-full ${aspectRatioClass} overflow-hidden relative bg-gray-100 dark:bg-gray-700 cursor-pointer`}
    >
      <Image
        src={url}
        alt="Post image"
        layout="fill"
        objectFit="cover"
        className=""
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 680px"
      />
      {showHeartAnimation && <MediaLikeAnimation onAnimationEnd={() => setShowHeartAnimation(false)} />}
    </div>
  );
}