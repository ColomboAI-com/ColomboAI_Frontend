import React from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "@/components/video-player/VideoPlayer";

export default function VideoBlock({
  video = ["https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv"],
}) {
  const getVideoJsOptions = (src) => ({
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
  });

  const handlePlayerReady = (player) => {
    // player is ready
  };

  return (
    <div id="video" className="sm:col-span-3">
      <div className="object-cover md:h-[24rem] sm:h-[30rem]">
        {typeof video === "object" ? (
          video.map((src) => (
            <VideoPlayer key={src} onReady={handlePlayerReady} src={src} />
          ))
        ) : (
          <VideoPlayer
            options={getVideoJsOptions(video)}
            onReady={handlePlayerReady}
          />
        )}
      </div>
    </div>
  );
}

function Video({ src }) {
  return (
    <ReactPlayer
      className="inset-0 object-cover w-full h-full min-w-full"
      url={src}
      controls={true}
    />
  );
}
