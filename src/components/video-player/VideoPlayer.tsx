import React from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
// import { useInView } from "react-intersection-observer";

export const VideoJS = (props) => {
  // const { ref, inView } = useInView();
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { src, onReady } = props;

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
        muted: true,
        controls: true,
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
      };

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          autoplay: false,
          muted: true,
          playsinline: true,
          // poster:
          //   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGPajftntxU93XKwxVQjFYiasz8qcWQa9Xqw&s",
        },
        () => {
          onReady && onReady(player);
          // player.play();
        }
      ));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(false);
      player.muted(true);
      player.src([
        {
          src: src,
          type: "video/mp4",
        },
      ]);
    }
  }, [videoRef]);

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

  return (
    <div data-vjs-player className="h-[100%] w-[100%]">
      <div ref={videoRef} className="h-[100%] w-[100%]" />
    </div>
  );
};

export default VideoJS;
