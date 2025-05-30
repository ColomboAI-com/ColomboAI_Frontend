import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';

let ffmpegInstance = null;

const initializeFFmpeg = async () => {
  if (ffmpegInstance) {
    return ffmpegInstance;
  }

  try {
    const ffmpeg = new FFmpeg();
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd';
    
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    
    ffmpegInstance = ffmpeg;
    return ffmpegInstance;
  } catch (error) {
    console.error('Failed to initialize FFmpeg:', error);
    throw new Error('Failed to initialize video processor');
  }
};

export const processVideoWithAudio = async (videoFile, audioUrl) => {
  try {
    const ffmpeg = await initializeFFmpeg();

    const videoArrayBuffer = await videoFile.arrayBuffer();
    
    const audioResponse = await fetch(audioUrl);
    const audioArrayBuffer = await audioResponse.arrayBuffer();

    await ffmpeg.writeFile('input.mp4', new Uint8Array(videoArrayBuffer));
    await ffmpeg.writeFile('audio.mp3', new Uint8Array(audioArrayBuffer));

    await ffmpeg.exec([
      '-i', 'input.mp4', // Input video file
      '-i', 'audio.mp3', // Input audio file
      '-map', '0:v', // Select video stream from the first input (input.mp4)
      '-map', '1:a', // Select audio stream from the second input (audio.mp3)
      '-c:v', 'libx264', // Re-encode video to H.264 for wider compatibility
      '-profile:v', 'main', // Use H.264 Main profile for broader device support
      '-pix_fmt', 'yuv420p', // Set pixel format to yuv420p, common for H.264
      '-c:a', 'aac', // Explicitly set audio codec to AAC
      '-shortest', // Finish encoding when the shortest input stream ends
      '-movflags', '+faststart', // Optimize for web streaming (allows playback before full download)
      'output.mp4' // Output file name
    ]);

    
    const data = await ffmpeg.readFile('output.mp4');
    const processedBlob = new Blob([data.buffer], { type: 'video/mp4' });
    return new File([processedBlob], 'processed_video.mp4', { type: 'video/mp4' });

  } catch (error) {
    console.error('Error processing video:', error);
    throw new Error('Failed to process video with audio');
  }
};