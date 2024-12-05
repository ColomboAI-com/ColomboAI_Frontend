import { useEffect, useState } from "react";

export default function VibesAd() {
  return (
    <div
      id="videoContainer"
      className={`relative mx-auto sm:h-[calc(100vh-0px)] md:h-[32.5] lg:h-[32.5rem] xl:h-[35rem]  aspect-[9/16] sm:w-full md:w-[470px] shadow-lg border-t border-black transition-all duration-1000`}
    >
      <video
        className="w-full h-full"
        autoPlay
        muted
        controls
        loop
      >
        <source
          src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
