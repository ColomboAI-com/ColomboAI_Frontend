import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import axios from 'axios';

const MusicOverlay = ({ song_id, isPlaying, onPlayPause, onClose }) => {
  const [song, setSong] = useState(null);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const audioRef = useRef(new Audio());
  const isMounted = useRef(true);

  const destroyWavesurfer = useCallback(() => {
    if (wavesurfer.current) {
      try {
        wavesurfer.current.destroy();
      } catch (err) {
        console.error("Error destroying wavesurfer:", err);
      } finally {
        wavesurfer.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      destroyWavesurfer();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [destroyWavesurfer]);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`https://api.jamendo.com/v3.0/tracks/`, {
          params: {
            client_id: 'de0269ba',
            id: song_id,
            format: 'json'
          }
        });
        if (isMounted.current && response.data.results && response.data.results.length > 0) {
          setSong(response.data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    if (song_id) {
      fetchSong();
    }
  }, [song_id]);

  const togglePlay = () => {
    onPlayPause();
  };

  useEffect(() => {
    if (waveformRef.current && song) {
      destroyWavesurfer();

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
        if (isMounted.current && isPlaying) {
          wavesurfer.current.play().catch(err => console.error("Wavesurfer play error:", err));
        }
      });

      wavesurfer.current.on('finish', () => {
        if (isMounted.current) {
          onPlayPause(false);
        }
      });

      return () => {
        destroyWavesurfer();
      };
    }
  }, [song, isPlaying, onPlayPause, destroyWavesurfer]);

  useEffect(() => {
    if (wavesurfer.current && audioRef.current) {
      try {
        if (isPlaying) {
          Promise.all([
            wavesurfer.current.play(),
            audioRef.current.play()
          ]).catch(err => console.error("Play error:", err));
        } else {
          wavesurfer.current.pause();
          audioRef.current.pause();
        }
      } catch (error) {
        console.error("Playback control error:", error);
      }
    }
  }, [isPlaying]);

  if (!song) return null;

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 text-black bg-opacity-90">
      <div className="flex justify-between items-center">
        {/* Add additional elements here, if needed */}
      </div>
      <div className="relative top-[-20px] mx-auto" style={{ right: 'auto', maxWidth: '400px', width: '100%' }}>
        <div className="flex flex-col items-center mt-auto mb-4">
          <h3 className="text-xl text-center font-circularStd text-[20px] font-bold">{song.name}</h3>
          <p className="text-sm opacity-80 text-center font-circularStd text-[14px] font-[450]">by {song.artist_name}</p>
        </div>

        <div className="relative mx-auto overflow-hidden rounded-lg mt-6" style={{ width: '100%', maxWidth: '400px' }}>
          <div ref={waveformRef} className="w-full h-[73px]" />
        </div>

        {/* Single Play/Pause Button centered below waveform */}
        <div className="flex justify-center mt-6">
          <button
            onClick={togglePlay}
            className="bg-white rounded-full p-4 flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="text-blue-600 w-8 h-8" />
            ) : (
              <Play className="text-blue-600 w-8 h-8" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicOverlay;
