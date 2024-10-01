import React, { useEffect, useRef} from 'react';
import { Play, Pause} from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

const MusicOverlay = ({ song, isPlaying, onPlayPause, onClose }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (waveformRef.current && song) {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(255, 255, 255, 0.5)',
        progressColor: '#1E71F2',
        cursorColor: 'transparent',
        barWidth: 2,
        barRadius: 3,
        barGap: 1,
        responsive: true,
        height: 73,
        normalize: true,
        partialRender: true,
      });

      wavesurfer.current.load(song.audio);

      wavesurfer.current.on('ready', () => {
        if (isPlaying) {
          wavesurfer.current.play();
          audioRef.current.play();
        }
      });

      wavesurfer.current.on('finish', () => {
        onPlayPause(false);
      });
    }

    audioRef.current.src = song.audio;
    audioRef.current.addEventListener('ended', () => onPlayPause(false));

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }
      audioRef.current.removeEventListener('ended', () => onPlayPause(false));
    };
  }, [song, onPlayPause]);

  useEffect(() => {
    if (wavesurfer.current && audioRef.current) {
      if (isPlaying) {
        wavesurfer.current.play();
        audioRef.current.play();
      } else {
        wavesurfer.current.pause();
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    onPlayPause(!isPlaying);
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 text-black bg-opacity-90">
      <div className="flex justify-between items-center">
      </div>
    <div className="relative top-[64px]" style={{ right: 'auto' }}>
      <div className="flex flex-col items-center mt-auto mb-4">
        <h3 className="text-xl text-center font-circularStd text-[20px] font-bold">{song.name}</h3>
        <p className="text-sm opacity-80 text-center font-circularStd text-[14px] font-[450]">by {song.artist_name}</p>
      </div>

      <div className="relative mx-auto overflow-hidden rounded-lg mt-6" style={{ width: '100%', maxWidth: '400px' }}>
        <div ref={waveformRef} className="w-full h-[73px]" />
      </div>
</div>
      <div className="flex justify-center mt-6">
        {/* <button
          onClick={togglePlay}
          className="bg-white rounded-full p-4"
        >
          {isPlaying ? (
            <Pause className="text-blue-600 w-8 h-8" />
          ) : (
            <Play className="text-blue-600 w-8 h-8" />
          )}
        </button> */}
      </div>
    </div>
  );
};

export default MusicOverlay;