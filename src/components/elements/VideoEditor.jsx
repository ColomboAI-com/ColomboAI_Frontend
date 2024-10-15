import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ffmpeg library
const DynamicFFmpeg = dynamic(() => import('@ffmpeg/ffmpeg').then(mod => mod.createFFmpeg), { ssr: false });

export const VideoEditor = ({ videoUrl, onTrimComplete, onClose }) => {
  const [ffmpeg, setFfmpeg] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [trimmedUrl, setTrimmedUrl] = useState(null); // State to hold the trimmed video URL
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96 flex flex-col">
        <h2 className="text-xl mb-4 text-center">Video Editor</h2>

        {/* Original Video Player */}
        <div className="relative mb-4">
          <video src={videoUrl} controls ref={videoRef} className="w-full" />
        </div>

        {/* Editing Controls */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <label className="w-1/3 text-right pr-2">Start Time:</label>
            <input
              type="number"
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
              className="border p-1 w-2/3"
              min="0"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-1/3 text-right pr-2">End Time:</label>
            <input
              type="number"
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
              className="border p-1 w-2/3"
              min="0"
            />
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
