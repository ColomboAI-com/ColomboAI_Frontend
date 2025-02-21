import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { useInView } from "react-intersection-observer";
import { Play, Pause } from "lucide-react";

export const VideoJS = (props) => {
  const { ref, inView } = useInView();
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { src, onReady, isPlayerClickable = true } = props;

  let lastScrollPosition = useRef(0);

  const [isReady, setIsReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoElement.setAttribute("playsinline", "true");
      videoElement.setAttribute("muted", "true");

      videoRef.current.appendChild(videoElement);

      const options = {
        autoplay: false,
        muted: isMuted,
        controls: false,
        responsive: true,
        fluid: true,
        playsinline: true,
        preload: "auto",
        sources: [
          {
            src: src,
            type: "video/mp4",
          },
        ],
        ...(props.options || {}),
      };

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          autoplay: false,
          muted: isMuted,
          playsinline: true,
          // poster:
          //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPajftntxU93XKwxVQjFYiasz8qcWQa9Xqw&s",
        },
        () => {
          onReady && onReady(player);
          setIsReady(true);
          // player.play();
        }
      ));
    } else {
      const player = playerRef.current;

      player.autoplay(false);
      player.muted(isMuted);
      player.src([
        {
          src: src,
          type: "video/mp4",
        },
      ]);
    }
  }, [videoRef]);

  useEffect(() => {
    if (isReady && inView && isPlayerClickable) {
      setTimeout(() => {
        playerRef.current?.play();
      }, 500);
    } else {
      playerRef.current?.pause();
    }
  }, [isReady, inView, playerRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  const handlPlayerClick = () => {
    const player = playerRef.current;
    if (!player.isFullscreen() && props.isPlayerClickable) {
      try {
        const postsContainer = document.getElementById("scroll-section");
        lastScrollPosition.current = postsContainer.scrollTop;
        player.requestFullscreen(); // Enter fullscreen mode
      } catch (err) {}
      setTimeout(() => {
        player.play();
      }, 200);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement) {
        // Restore the saved scroll position
        const scrollSection = document.getElementById("scroll-section");
        if (scrollSection) {
          console.log(
            "lastScrollPosition.current: " + lastScrollPosition.current
          );
          scrollSection.scrollTop = lastScrollPosition.current;
        }
      }
    });
  }, []);

  return (
    <>
      <div data-vjs-player className="h-full w-[100%] relative">
        {!playerRef?.current?.isFullscreen() && (
          <div
            className="h-[100%] w-[100%] absolute z-[99]"
            onClick={handlPlayerClick}
          />
        )}
        <div
          className="intersection-observer-element h-10 w-10 mt-[100px] absolute bg-red-500"
          ref={ref}
        />
        <div ref={videoRef} className="h-full w-[100%]" />
        <div
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            playerRef.current.muted(!isMuted);
            setIsMuted(!isMuted);
          }}
          className="flex items-center justify-center absolute bottom-1 right-2 z-[999]"
        >
          <div className="flex items-center justify-center rounded-full bg-black p-1.5 [&_path]:stroke-white">
            {isMuted ? (
              <Play size={16} className="!text-white" />
            ) : (
              <Pause size={16} className="!text-white" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoJS;
