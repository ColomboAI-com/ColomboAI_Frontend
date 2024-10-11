// import { useState, useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';

// // Dynamically import the ffmpeg library
// const DynamicFFmpeg = dynamic(() => import('@ffmpeg/ffmpeg').then(mod => mod.createFFmpeg), { ssr: false });

// export const VideoEditor = ({ videoUrl, onTrimComplete, onClose }) => {
//   const [ffmpeg, setFfmpeg] = useState(null);
//   const [start, setStart] = useState(0);
//   const [end, setEnd] = useState(30);
//   const [isLoading, setIsLoading] = useState(false);
//   const [trimmedUrl, setTrimmedUrl] = useState(null); // State to hold the trimmed video URL
//   const videoRef = useRef(null);

//   // Load ffmpeg when component mounts
//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       const ffmpegInstance = await DynamicFFmpeg();
//       setFfmpeg(ffmpegInstance);
//     };
//     loadFFmpeg();
//   }, []);

//   // Handle video trimming
//   const handleTrim = async () => {
//     if (!ffmpeg) {
//       console.error('FFmpeg is not loaded');
//       return;
//     }
//     setIsLoading(true);
//     try {
//       const response = await fetch(videoUrl);
//       const data = await response.arrayBuffer();
//       ffmpeg.FS('writeFile', 'input.mp4', new Uint8Array(data));

//       await ffmpeg.run(
//         '-i', 'input.mp4',
//         '-ss', `${start}`,
//         '-to', `${end}`,
//         '-c', 'copy',
//         'output.mp4'
//       );

//       const trimmedData = ffmpeg.FS('readFile', 'output.mp4');
//       const trimmedUrl = URL.createObjectURL(new Blob([trimmedData.buffer], { type: 'video/mp4' }));
//       setTrimmedUrl(trimmedUrl); // Update the state with the trimmed video URL
//       onTrimComplete(trimmedUrl);
//     } catch (error) {
//       console.error('Error trimming video:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-4 rounded-lg w-96 flex flex-col">
//         <h2 className="text-xl mb-4 text-center">Video Editor</h2>

//         {/* Original Video Player */}
//         <div className="relative mb-4">
//           <video src={videoUrl} controls ref={videoRef} className="w-full" />
//         </div>

//         {/* Editing Controls */}
//         <div className="mb-4">
//           <div className="flex items-center mb-2">
//             <label className="w-1/3 text-right pr-2">Start Time:</label>
//             <input
//               type="number"
//               value={start}
//               onChange={(e) => setStart(Number(e.target.value))}
//               className="border p-1 w-2/3"
//               min="0"
//             />
//           </div>
//           <div className="flex items-center mb-4">
//             <label className="w-1/3 text-right pr-2">End Time:</label>
//             <input
//               type="number"
//               value={end}
//               onChange={(e) => setEnd(Number(e.target.value))}
//               className="border p-1 w-2/3"
//               min="0"
//             />
//           </div>
//         </div>

//         {/* Trimmed Video Player */}
//         {trimmedUrl && (
//           <div className="relative mb-4">
//             <video src={trimmedUrl} controls className="w-full" />
//           </div>
//         )}

//         {/* Buttons */}
//         <div className="flex flex-col items-center">
//           <button
//             onClick={handleTrim}
//             className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : 'Trim Video'}
//           </button>
//           <button
//             onClick={onClose}
//             className="bg-gray-500 text-white py-2 px-4 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect, useRef } from 'react';
import { VideoPlayIcon, VideoForwardIcon, VideoPreviousIcon } from "../Icons";
import dynamic from 'next/dynamic';

const DynamicFFmpeg = dynamic(() => import('@ffmpeg/ffmpeg').then(mod => mod.createFFmpeg), { ssr: false });

export const VideoEditor = ({ videoUrl, onTrimComplete, onClose }) => {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(null);
  const [thumbnailCount, setThumbnailCount] = useState(5);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = await DynamicFFmpeg();
      setFfmpeg(ffmpegInstance);
    };
    loadFFmpeg();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener('loadedmetadata', () => {
        setDuration(video.duration);
        setTrimEnd(video.duration);
        generateThumbnails();
      });
      video.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [videoRef, trimEnd, thumbnailCount]);

  useEffect(() => {
    document.addEventListener('mousemove', handleTrimmerDrag);
    document.addEventListener('mouseup', handleTrimmerDragEnd);
    return () => {
      document.removeEventListener('mousemove', handleTrimmerDrag);
      document.removeEventListener('mouseup', handleTrimmerDragEnd);
    };
  }, [isDragging, duration, trimStart, trimEnd]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    if (video.currentTime >= trimEnd) {
      video.pause();
      video.currentTime = trimStart;
      setIsPlaying(false);
    }
  };

  const generateThumbnails = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const thumbnailWidth = 120;
    const thumbnailHeight = 68;

    let thumbs = [];
    for (let i = 0; i < thumbnailCount; i++) {
      video.currentTime = (duration / thumbnailCount) * i;
      await new Promise(resolve => {
        video.onseeked = () => {
          context.drawImage(video, 0, 0, thumbnailWidth, thumbnailHeight);
          thumbs.push(canvas.toDataURL());
          resolve();
        };
      });
    }
    setThumbnails(thumbs);
  };

  const handleTrim = async () => {
    if (!ffmpeg) {
      console.error('FFmpeg is not loaded');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(videoUrl);
      const data = await response.arrayBuffer();
      ffmpeg.FS('writeFile', 'input.mp4', new Uint8Array(data));
      await ffmpeg.run(
        '-i', 'input.mp4',
        '-ss', `${trimStart}`,
        '-to', `${trimEnd}`,
        '-c', 'copy',
        'output.mp4'
      );
      const trimmedData = ffmpeg.FS('readFile', 'output.mp4');
      const trimmedUrl = URL.createObjectURL(new Blob([trimmedData.buffer], { type: 'video/mp4' }));
      onTrimComplete(trimmedUrl);
    } catch (error) {
      console.error('Error trimming video:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTrimmerDragStart = (e, handle) => {
    e.preventDefault();
    setIsDragging(handle);
  };

  const handleTrimmerDrag = (e) => {
    if (!isDragging || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const time = (x / rect.width) * duration;

    if (isDragging === 'start') {
      setTrimStart(Math.min(time, trimEnd - 1));
    } else if (isDragging === 'end') {
      setTrimEnd(Math.max(time, trimStart + 1));
    }
  };

  const handleTrimmerDragEnd = () => {
    setIsDragging(null);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleForward = () => {
    videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, trimEnd);
  };

  const handleBackward = () => {
    videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, trimStart);
  };

  const handleThumbnailCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setThumbnailCount(count);
    generateThumbnails();
  };

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * duration;
    videoRef.current.currentTime = clickedTime;
    setCurrentTime(clickedTime);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-[#2563EB] rounded-lg overflow-hidden w-[600px]">
        <video 
          ref={videoRef} 
          src={videoUrl} 
          className="w-full aspect-video object-cover" 
          onClick={togglePlayPause}
          // style={{ display: 'none' }} // Hide the video player
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} width="120" height="68" />
        
        <div className="p-4 text-white">
          <div className="flex justify-center items-center mb-4 space-x-6">
            <button className="p-1" onClick={handleBackward}><VideoPreviousIcon /></button>
            <button className="p-1" onClick={togglePlayPause}>
              <VideoPlayIcon />
            </button>
            <button className="p-1" onClick={handleForward}><VideoForwardIcon /></button>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg">{formatTime(currentTime)} / {formatTime(duration)}</span>
            <div className="flex items-center space-x-3">
              <button className="text-white text-2xl font-bold">+</button>
              <button className="text-white text-2xl font-bold">-</button>
              <button className="text-white text-2xl">↔️</button>
            </div>
          </div>
          
          <div 
            className="relative h-20 bg-[#1E40AF] rounded-lg cursor-pointer overflow-hidden" 
            ref={timelineRef}
            onClick={handleTimelineClick}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex">
              {thumbnails.map((thumb, index) => (
                <img key={index} src={thumb} className="h-full" style={{width: `${100 / thumbnailCount}%`}} alt={`Thumbnail ${index}`} />
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
            <div 
              className="absolute top-0 bottom-0 bg-transparent border-2 border-white"
              style={{
                left: `${(trimStart / duration) * 100}%`,
                right: `${100 - (trimEnd / duration) * 100}%`
              }}
            ></div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{left: `${(trimStart / duration) * 100}%`}}
              onMouseDown={(e) => handleTrimmerDragStart(e, 'start')}
            >
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
            </div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{right: `${100 - (trimEnd / duration) * 100}%`}}
              onMouseDown={(e) => handleTrimmerDragStart(e, 'end')}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
            </div>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white"
              style={{left: `${(currentTime / duration) * 100}%`}}
            ></div>
          </div>
{/*           
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm">Trim: {formatTime(trimStart)} - {formatTime(trimEnd)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => {
                const newTime = parseFloat(e.target.value);
                setCurrentTime(newTime);
                videoRef.current.currentTime = newTime;
              }}
              className="w-full"
            />
          </div> */}
        </div>
        
        <div className="p-4 flex justify-between">
          {/* <button 
            onClick={handleTrim} 
            className="bg-green-500 text-white py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Trim Video'}
          </button> */}
          <button 
            onClick={onClose}
            className="bg-white text-black py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};