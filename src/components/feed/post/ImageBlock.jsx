import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Image from "next/image";

// Expects:
// mediaItem: { url: string, type: 'image', width?: number, height?: number }
// allMediaItems: array of all media items in the post, for gallery view
// currentIndexInPost: index of this mediaItem within allMediaItems
export default function ImageBlock({ mediaItem, allMediaItems, currentIndexInPost }) {
  const { openMediaViewer } = useContext(GlobalContext);


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

  return (
    <div
      onClick={() => {
        if (mediaItem && mediaItem.url) {
          const slides = allMediaItems && allMediaItems.length > 0 ? allMediaItems : [mediaItem];
          const startIndex = allMediaItems && allMediaItems.length > 0 ? currentIndexInPost : 0;
          openMediaViewer(slides, startIndex);
        }
      }}
      // The container itself defines the aspect ratio.
      // Removed fixed height classes like md:h-[30rem].
      className={`w-full ${aspectRatioClass} overflow-hidden relative bg-gray-100 dark:bg-gray-700 cursor-pointer`}
    >
      <Image
        src={url}
        alt="Post image"
        layout="fill"
        objectFit="cover" // Ensures the image covers the aspect ratio container, cropping if necessary.
        className="" // Removed bg-white, parent has bg now for loading state
        loading="lazy"
        // Consider more dynamic sizes based on the column layout and chosen aspectRatioClass
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 680px"
      />
    </div>
  );
}