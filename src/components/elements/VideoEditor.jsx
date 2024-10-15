import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ffmpeg library
const DynamicFFmpeg = dynamic(() => import('@ffmpeg/ffmpeg').then(mod => mod.createFFmpeg), { ssr: false });

export const VideoEditor = ({ videoUrl, onTrimComplete, onClose }) => {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(null);
  const [thumbnailCount, setThumbnailCount] = useState(5);
  const [zoomLevel, setZoomLevel] = useState(1);
  const videoRef = useRef(null);

  // Load ffmpeg when component mounts
  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpegInstance = await DynamicFFmpeg();
      setFfmpeg(ffmpegInstance);
    };
    loadFFmpeg();
  }, []);

  // Handle video trimming
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
      setTrimmedUrl(trimmedUrl); // Update the state with the trimmed video URL
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

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-[#2563EB] rounded-lg overflow-hidden w-[600px]">
        <video 
          ref={videoRef} 
          src={videoUrl} 
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

        {/* Trimmed Video Player */}
        {trimmedUrl && (
          <div className="relative mb-4">
            <video src={trimmedUrl} controls className="w-full" />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleTrim}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Trim Video'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};