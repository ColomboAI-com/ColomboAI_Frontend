import React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import plugins if needed, e.g., for video, thumbnails, zoom
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Navigation from "yet-another-react-lightbox/plugins/navigation";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/fullscreen.css";
import "yet-another-react-lightbox/plugins/zoom.css"; // Import Zoom plugin CSS

// Our custom VideoPlayer component (Video.js wrapper)
// We might need to adapt this or use ReactPlayer directly if VideoJS has issues within YARL
// For now, let's assume we might use a simpler player for the lightbox or adapt VideoJS.
import React, { useState, useCallback, useEffect } from "react"; // Added useState, useCallback, useEffect
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Video from "yet-another-react-lightbox/plugins/video"; // Still useful for YARL to recognize video type
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Navigation from "yet-another-react-lightbox/plugins/navigation";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import ReactPlayer from "react-player";
import { VolumeUpIcon, VolumeOffIcon, ArrowPathIcon as LoopIcon } from "@heroicons/react/24/outline"; // Using Heroicons

// Custom Video Slide Component
const CustomVideoSlide = ({ slide, rect, playingOverride }) => {
  const [isMuted, setIsMuted] = useState(true); // Autoplay should be muted initially
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // For autoplay

  useEffect(() => {
    // If YARL changes slide or lightbox closes/opens, ensure autoplay (muted)
    setIsPlaying(true);
    setIsMuted(true);
  }, [slide.src]); // Reset when slide source changes

  // If playingOverride is controlled by YARL (e.g. when it auto-advances or pauses on close)
  useEffect(() => {
    if (playingOverride !== undefined) {
        setIsPlaying(playingOverride);
    }
  }, [playingOverride]);


  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Note: ReactPlayer's own controls are disabled (controls={false})
  // We are building custom toggles on top.
  return (
    <div style={{ position: "relative", width: rect.width, height: rect.height, backgroundColor: "black" }}>
      <ReactPlayer
        url={slide.src}
        playing={isPlaying}
        loop={isLooping}
        muted={isMuted}
        controls={false} // Disable default controls to use our custom ones
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        config={{
            file: {
                attributes: {
                    poster: slide.poster, // Use poster from slide data
                    // objectFit: 'cover' // This might be needed on the video element itself if ReactPlayer doesn't do it
                }
            }
        }}
      />
      {/* Custom Controls Overlay */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          gap: "15px",
          padding: "8px",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px"
        }}
      >
        <button onClick={() => setIsMuted(!isMuted)} className="text-white">
          {isMuted ? <VolumeOffIcon className="h-6 w-6" /> : <VolumeUpIcon className="h-6 w-6" />}
        </button>
        <button onClick={() => setIsLooping(!isLooping)} className={`text-white ${isLooping ? 'text-blue-400' : ''}`}>
          <LoopIcon className="h-6 w-6" />
        </button>
        {/* Optional: Play/Pause button if needed, ReactPlayer might have its own click-to-play/pause */}
        {/* <button onClick={handlePlayPause} className="text-white">
          {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
        </button> */}
      </div>
    </div>
  );
};


const AdvancedMediaViewer = ({
  open,
  close,
  slides: initialSlides = [],
  index = 0,
}) => {
  if (!open || !initialSlides || initialSlides.length === 0) {
    return null;
  }

  // Prepare slides for YARL, especially for the custom video renderer
  const yarlSlides = initialSlides.map(slide => {
    if (slide.type === 'video') {
      return {
        ...slide, // Pass all original slide data (src, poster, width, height)
        // type: 'video' is already there from input
      };
    }
    return slide; // Image slides are fine as is { src, width, height }
  });

  return (
    <Lightbox
      open={open}
      close={close}
      slides={yarlSlides}
      index={index}
      plugins={[Video, Zoom, Thumbnails, Navigation, Fullscreen]}
      animation={{ fade: 300, swipe: 300 }}
      carousel={{ finite: initialSlides.length <= 1 }}
      controller={{ closeOnBackdropClick: true }} // Explicitly enable click on backdrop to close
      render={{
        slide: ({ slide, rect,
            // YARL provides `playing` state for video slides when using its Video plugin,
            // which might be useful if we weren't completely overriding.
            // For a fully custom ReactPlayer, we manage play state internally.
         }) => {
          if (slide.type === "video") {
            // Pass the original slide data which includes src, poster etc.
            return <CustomVideoSlide slide={slide} rect={rect} />;
          }
          // For images, let YARL handle default rendering or use its Image slide component
          return undefined;
        },
        // Optionally customize other parts like thumbnails, header, footer for controls
      }}
    />
  );
};

export default AdvancedMediaViewer;
