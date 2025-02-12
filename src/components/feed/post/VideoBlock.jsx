import React, { useContext } from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "@/components/video-player/VideoPlayer";

export default function VideoBlock({
  video = ["https://www.youtube.com/embed/b1d0uzuGN6Q?si=KVP5iZPEAUP_S8wv"],
}) {
  return (
    <div id="video" className="sm:col-span-3">
      <div className="object-cover md:h-[24rem] sm:h-auto">
        {typeof video === "object" ? (
          video.map((src) => (
            <VideoPlayer
              onReady={() => {}}
              src={src + "#t=2"}
              isPlayerClickable
            />
          ))
        ) : (
          <VideoPlayer
            onReady={() => {}}
            src={video + "#t=2"}
            isPlayerClickable
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
