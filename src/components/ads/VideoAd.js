import React, { useEffect } from "react";

const VideoAd = () => {
  useEffect(() => {
    // Load external scripts
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load required scripts
    Promise.all([
      loadScript("https://vjs.zencdn.net/7.18.1/video.js"),
      loadScript("https://imasdk.googleapis.com/js/sdkloader/ima3.js"),
    ]).then(() => {
      // Initialize Video.js
      const videoContainer = document.getElementById("videoContainer");
      const video = window.videojs("content_video");

      video.ready(() => {
        const bigPlayButton = document.querySelector(".vjs-big-play-button");
        if (bigPlayButton) bigPlayButton.innerHTML = "";
      });

      const toggleVideoSize = () => {
        const closeButton = document.querySelector(".close-btn");
        if (window.scrollY > 50) {
          videoContainer.classList.add("small");
          closeButton.style.display = "block";
        } else {
          videoContainer.classList.remove("small");
          closeButton.style.display = "none";
        }
      };

      window.addEventListener("scroll", toggleVideoSize());
      toggleVideoSize();
    });

    return () => {
      window.removeEventListener("scroll", toggleVideoSize);
    };
  }, []);

  return (
    <div className="video-container" id="videoContainer">
      <button
        className="close-btn"
        onClick={() => (document.getElementById("videoContainer").style.display = "none")}
      >
        ×
      </button>
      <video
        id="content_video"
        className="video-js vjs-default-skin"
        controls
        preload="auto"
        data-setup='{"autoplay": true, "muted": true}'
      >
        <source
          src="https://www.sample-videos.com/video321/mp4/720/big_buck_bunny_720p_30mb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoAd;
