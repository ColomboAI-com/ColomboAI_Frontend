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
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = await DynamicFFmpeg();
      setFfmpeg(ffmpegInstance);
    };
    loadFFmpeg();
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.current.duration);
        setEnd(videoRef.current.duration);
        generateThumbnails();
      });
      videoRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(videoRef.current.currentTime);
      });
    }
  }, [videoRef]);

  const generateThumbnails = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const thumbnailCount = 5;
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
        '-ss', `${start}`,
        '-to', `${end}`,
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
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    videoRef.current.currentTime = seekTime;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden w-[600px]">
        <video ref={videoRef} src={videoUrl} className="w-full aspect-video object-cover" controls />
        <canvas ref={canvasRef} style={{ display: 'none' }} width="120" height="68" />
        
        <div className="bg-blue-600 p-4 text-white">
        <div className="flex justify-center items-center mb-4">
            <div className="flex rounded-full p-1">
              <button className="p-1"><VideoPreviousIcon /></button>
              <button className="p-1"><VideoPlayIcon /></button>
              <button className="p-1"><VideoForwardIcon /></button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            <div>
              <button className="ml-2 px-2 py-1 rounded">+</button>
              <button className="ml-2 px-2 py-1 rounded">-</button>
              <button className="ml-2 px-2 py-1 rounded">↔️</button>
            </div>
          </div>
          
          <div className="relative h-16 bg-blue-800 rounded cursor-pointer" onClick={handleSeek}>
            <div className="absolute left-0 top-0 h-full bg-blue-400" style={{width: `${(currentTime / duration) * 100}%`}}></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end overflow-hidden">
              {thumbnails.map((thumb, index) => (
                <img key={index} src={thumb} className="h-full w-1/5 object-cover" alt={`Thumbnail ${index}`} />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs px-1">
              {[0, 0.2, 0.4, 0.6, 0.8, 1].map((fraction) => (
                <span key={fraction}>{formatTime(duration * fraction)}</span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between mt-2">
            <button className="p-1 bg-blue-500 rounded" onClick={() => setStart(currentTime)}>Set Start: {formatTime(start)}</button>
            <button className="p-1 bg-blue-500 rounded" onClick={() => setEnd(currentTime)}>Set End: {formatTime(end)}</button>
          </div>
        </div>
        
        <div className="flex justify-between p-4">
          <button 
            onClick={handleTrim} 
            className="bg-blue-500 text-white py-2 px-4 rounded" 
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Trim Video'}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};