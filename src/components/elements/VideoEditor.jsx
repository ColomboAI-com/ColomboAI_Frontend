import React, { useState, useEffect, useRef } from 'react';
import { VideoPlayIcon, VideoForwardIcon, VideoPreviousIcon } from "../Icons";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import ReactPlayer from 'react-player';

export const VideoEditor = ({ videoUrl, onClose, onTrim }) => {
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
  const [zoomLevel, setZoomLevel] = useState(1);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = new FFmpeg();
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
      await ffmpegInstance.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
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
      const inputData = await fetchFile(videoUrl);
      await ffmpeg.writeFile('input.mp4', inputData);
      
      await ffmpeg.exec([
        '-i', 'input.mp4',
        '-ss', `${trimStart}`,
        '-to', `${trimEnd}`,
        '-c', 'copy',
        'output.mp4'
      ]);
      
      const data = await ffmpeg.readFile('output.mp4');
      const trimmedBlob = new Blob([data.buffer], { type: 'video/mp4' });
      const trimmedFile = new File([trimmedBlob], 'trimmed_video.mp4', { type: 'video/mp4' });
      onTrim(trimmedFile);
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
    const time = (x / rect.width) * duration / zoomLevel;

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

  const handleTimelineClick = (e) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickedTime = (x / rect.width) * duration / zoomLevel;
    videoRef.current.currentTime = clickedTime;
    setCurrentTime(clickedTime);
  };

  const handleZoomIn = () => {
    setZoomLevel(prevZoom => Math.min(prevZoom * 1.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel(prevZoom => Math.max(prevZoom / 1.5, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  const timelineStyle = {
    width: `${100 * zoomLevel}%`,
    transform: `translateX(${-(currentTime / duration) * 100 * (zoomLevel - 1)}%)`,
  };

  console.log(videoUrl);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-[#2563EB] rounded-lg overflow-hidden w-[600px]">
        <ReactPlayer 
          ref={videoRef} 
          url={videoUrl} 
          className="w-full aspect-video object-cover" 
          onClick={togglePlayPause}
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
              <button className="text-white text-2xl font-bold" onClick={handleZoomIn}>+</button>
              <button className="text-white text-2xl font-bold" onClick={handleZoomOut}>-</button>
              <button className="text-white text-2xl" onClick={handleResetZoom}>↔️</button>
            </div>
          </div>
          
          <div 
            className="relative h-20 bg-[#1E40AF] rounded-lg cursor-pointer overflow-hidden" 
            ref={timelineRef}
            onClick={handleTimelineClick}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex" style={timelineStyle}>
              {thumbnails.map((thumb, index) => (
                <img key={index} src={thumb} className="h-full" style={{width: `${100 / thumbnailCount}%`}} alt={`Thumbnail ${index}`} />
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
            <div 
              className="absolute top-0 bottom-0 bg-transparent border-2 border-white"
              style={{
                left: `${(trimStart / duration) * 100 * zoomLevel}%`,
                right: `${100 - (trimEnd / duration) * 100 * zoomLevel}%`
              }}
            ></div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{left: `${(trimStart / duration) * 100 * zoomLevel}%`}}
              onMouseDown={(e) => handleTrimmerDragStart(e, 'start')}
            >
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
            </div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
              style={{right: `${100 - (trimEnd / duration) * 100 * zoomLevel}%`}}
              onMouseDown={(e) => handleTrimmerDragStart(e, 'end')}
            >
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
            </div>
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white"
              style={{left: `${(currentTime / duration) * 100 * zoomLevel}%`}}
            ></div>
          </div>
        </div>
        
        <div className="p-4 flex justify-between">
          <button 
            onClick={handleTrim} 
            className="bg-green-500 text-white py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Trim Video'}
          </button>
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

// import React, { useState, useEffect, useRef } from 'react';
// import { VideoPlayIcon, VideoForwardIcon, VideoPreviousIcon } from "../Icons";
// import dynamic from 'next/dynamic';

// const DynamicFFmpeg = dynamic(() => import('@ffmpeg/ffmpeg').then(mod => mod.createFFmpeg), { ssr: false });

// export const VideoEditor = ({ videoUrl, onTrimComplete, onClose }) => {
//   const [ffmpeg, setFfmpeg] = useState(null);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   const [trimStart, setTrimStart] = useState(0);
//   const [trimEnd, setTrimEnd] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);
//   const [thumbnails, setThumbnails] = useState([]);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isDragging, setIsDragging] = useState(null);
//   const [thumbnailCount, setThumbnailCount] = useState(5);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const timelineRef = useRef(null);

//   useEffect(() => {
//     const loadFFmpeg = async () => {
//       const ffmpegInstance = await DynamicFFmpeg();
//       setFfmpeg(ffmpegInstance);
//     };
//     loadFFmpeg();
//   }, []);

//   useEffect(() => {
//     if (videoRef.current) {
//       const video = videoRef.current;
//       video.addEventListener('loadedmetadata', () => {
//         setDuration(video.duration);
//         setTrimEnd(video.duration);
//         generateThumbnails();
//       });
//       video.addEventListener('timeupdate', handleTimeUpdate);
//     }

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
//       }
//     };
//   }, [videoRef, trimEnd, thumbnailCount]);

//   useEffect(() => {
//     document.addEventListener('mousemove', handleTrimmerDrag);
//     document.addEventListener('mouseup', handleTrimmerDragEnd);
//     return () => {
//       document.removeEventListener('mousemove', handleTrimmerDrag);
//       document.removeEventListener('mouseup', handleTrimmerDragEnd);
//     };
//   }, [isDragging, duration, trimStart, trimEnd]);

//   const handleTimeUpdate = () => {
//     const video = videoRef.current;
//     setCurrentTime(video.currentTime);
//     if (video.currentTime >= trimEnd) {
//       video.pause();
//       video.currentTime = trimStart;
//       setIsPlaying(false);
//     }
//   };

//   const generateThumbnails = async () => {
//     const video = videoRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     const thumbnailWidth = 120;
//     const thumbnailHeight = 68;

//     let thumbs = [];
//     for (let i = 0; i < thumbnailCount; i++) {
//       video.currentTime = (duration / thumbnailCount) * i;
//       await new Promise(resolve => {
//         video.onseeked = () => {
//           context.drawImage(video, 0, 0, thumbnailWidth, thumbnailHeight);
//           thumbs.push(canvas.toDataURL());
//           resolve();
//         };
//       });
//     }
//     setThumbnails(thumbs);
//   };

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
//         '-ss', `${trimStart}`,
//         '-to', `${trimEnd}`,
//         '-c', 'copy',
//         'output.mp4'
//       );
//       const trimmedData = ffmpeg.FS('readFile', 'output.mp4');
//       const trimmedUrl = URL.createObjectURL(new Blob([trimmedData.buffer], { type: 'video/mp4' }));
//       onTrimComplete(trimmedUrl);
//     } catch (error) {
//       console.error('Error trimming video:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600);
//     const minutes = Math.floor((time % 3600) / 60);
//     const seconds = Math.floor(time % 60);
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
//   };

//   const handleTrimmerDragStart = (e, handle) => {
//     e.preventDefault();
//     setIsDragging(handle);
//   };

//   const handleTrimmerDrag = (e) => {
//     if (!isDragging || !timelineRef.current) return;
//     const rect = timelineRef.current.getBoundingClientRect();
//     const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
//     const time = (x / rect.width) * duration / zoomLevel;

//     if (isDragging === 'start') {
//       setTrimStart(Math.min(time, trimEnd - 1));
//     } else if (isDragging === 'end') {
//       setTrimEnd(Math.max(time, trimStart + 1));
//     }
//   };

//   const handleTrimmerDragEnd = () => {
//     setIsDragging(null);
//   };

//   const togglePlayPause = () => {
//     const video = videoRef.current;
//     if (isPlaying) {
//       video.pause();
//     } else {
//       video.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleForward = () => {
//     videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, trimEnd);
//   };

//   const handleBackward = () => {
//     videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, trimStart);
//   };

//   const handleTimelineClick = (e) => {
//     if (!timelineRef.current) return;
//     const rect = timelineRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const clickedTime = (x / rect.width) * duration / zoomLevel;
//     videoRef.current.currentTime = clickedTime;
//     setCurrentTime(clickedTime);
//   };

//   const handleZoomIn = () => {
//     setZoomLevel(prevZoom => Math.min(prevZoom * 1.5, 4));
//   };

//   const handleZoomOut = () => {
//     setZoomLevel(prevZoom => Math.max(prevZoom / 1.5, 1));
//   };

//   const handleResetZoom = () => {
//     setZoomLevel(1);
//   };

//   const timelineStyle = {
//     width: `${100 * zoomLevel}%`,
//     transform: `translateX(${-(currentTime / duration) * 100 * (zoomLevel - 1)}%)`,
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center">
//       <div className="bg-[#2563EB] rounded-lg overflow-hidden w-[600px]">
//         <ReactPlayer 
//           ref={videoRef} 
//           src={videoUrl} 
//           className="w-full aspect-video object-cover" 
//           onClick={togglePlayPause}
//         />
//         <canvas ref={canvasRef} style={{ display: 'none' }} width="120" height="68" />
        
//         <div className="p-4 text-white">
//           <div className="flex justify-center items-center mb-4 space-x-6">
//             <button className="p-1" onClick={handleBackward}><VideoPreviousIcon /></button>
//             <button className="p-1" onClick={togglePlayPause}>
//               <VideoPlayIcon />
//             </button>
//             <button className="p-1" onClick={handleForward}><VideoForwardIcon /></button>
//           </div>
          
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-lg">{formatTime(currentTime)} / {formatTime(duration)}</span>
//             <div className="flex items-center space-x-3">
//               <button className="text-white text-2xl font-bold" onClick={handleZoomIn}>+</button>
//               <button className="text-white text-2xl font-bold" onClick={handleZoomOut}>-</button>
//               <button className="text-white text-2xl" onClick={handleResetZoom}>↔️</button>
//             </div>
//           </div>
          
//           <div 
//             className="relative h-20 bg-[#1E40AF] rounded-lg cursor-pointer overflow-hidden" 
//             ref={timelineRef}
//             onClick={handleTimelineClick}
//           >
//             <div className="absolute top-0 left-0 right-0 bottom-0 flex" style={timelineStyle}>
//               {thumbnails.map((thumb, index) => (
//                 <img key={index} src={thumb} className="h-full" style={{width: `${100 / thumbnailCount}%`}} alt={`Thumbnail ${index}`} />
//               ))}
//             </div>
//             <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
//             <div 
//               className="absolute top-0 bottom-0 bg-transparent border-2 border-white"
//               style={{
//                 left: `${(trimStart / duration) * 100 * zoomLevel}%`,
//                 right: `${100 - (trimEnd / duration) * 100 * zoomLevel}%`
//               }}
//             ></div>
//             <div 
//               className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
//               style={{left: `${(trimStart / duration) * 100 * zoomLevel}%`}}
//               onMouseDown={(e) => handleTrimmerDragStart(e, 'start')}
//             >
//               <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
//             </div>
//             <div 
//               className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
//               style={{right: `${100 - (trimEnd / duration) * 100 * zoomLevel}%`}}
//               onMouseDown={(e) => handleTrimmerDragStart(e, 'end')}
//             >
//               <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-8 bg-white rounded-sm"></div>
//             </div>
//             <div 
//               className="absolute top-0 bottom-0 w-0.5 bg-white"
//               style={{left: `${(currentTime / duration) * 100 * zoomLevel}%`}}
//             ></div>
//           </div>
//         </div>
        
//         <div className="p-4 flex justify-between">
//           {/* <button 
//             onClick={handleTrim} 
//             className="bg-green-500 text-white py-2 px-4 rounded"
//             disabled={isLoading}
//           >
//             {isLoading ? 'Processing...' : 'Trim Video'}
//           </button> */}
//           <button 
//             onClick={onClose}
//             className="bg-white text-black py-2 px-4 rounded"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };