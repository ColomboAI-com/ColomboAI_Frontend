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
      '-i', 'input.mp4',
      '-i', 'audio.mp3',
      '-map', '0:v',           
      '-map', '1:a',           
      '-c:v', 'copy',          
      '-shortest',             
      'output.mp4'
    ]);

    
    const data = await ffmpeg.readFile('output.mp4');
    const processedBlob = new Blob([data.buffer], { type: 'video/mp4' });
    return new File([processedBlob], 'processed_video.mp4', { type: 'video/mp4' });

  } catch (error) {
    console.error('Error processing video:', error);
    throw new Error('Failed to process video with audio');
  }
};