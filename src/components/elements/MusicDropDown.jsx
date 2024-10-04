import React, { useState, useEffect, useRef } from "react";
import { Search, Play, Pause, ChevronDown } from "lucide-react";
import "../../app/globals.css";

const https = require("https");

const MusicDropDown = ({ onSongSelect, setSongId, width }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(new Audio());

  const CLIENT_ID = 'de0269ba'; 

  const genres = [
    { name: "Pop", image: "/api/placeholder/100/100" },
    { name: "Rock", image: "/api/placeholder/100/100" },
    { name: "Hip-hop", image: "/api/placeholder/100/100" },
    { name: "Jazz", image: "/api/placeholder/100/100" },
    { name: "R&B", image: "/api/placeholder/100/100" },
    { name: "Classical", image: "/api/placeholder/100/100" },
  ];

  const getMusicUrl = (type) => {
    return new Promise((resolve, reject) => {
      const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=16&search=${type}&include=musicinfo`;

      https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData.results);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const results = await getMusicUrl(searchTerm || "popular");
        setSongs(results);
      } catch (error) {
        console.error("Error in fetchSongs:", error);
        setSongs([]);
      }
    };

    fetchSongs();
  }, [searchTerm]);

  useEffect(() => {
    const handleAudioEnd = () => setPlaying(null);
    audioRef.current.addEventListener("ended", handleAudioEnd);
    return () => {
      audioRef.current.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  const togglePlay = (song, event) => {
    event.stopPropagation();
    if (playing === song.id) {
      audioRef.current.pause();
      setPlaying(null);
    } else {
      if (playing) {
        audioRef.current.pause();
      }
      audioRef.current.src = song.audio;
      audioRef.current.play();
      setPlaying(song.id);
      handleSongSelect(song)
    }
  };

  const handleSongSelect = (song) => {
    if (playing) {
      setPlaying(null);
    }
    onSongSelect(song);
  };

  const handSelectSong = (songId) => {
    setSongId(songId)
  }
  

  return (
    <div className="max-h-[20rem] overflow-y-scroll bg-blue-600 hide-scrollbar rounded-t-[15.22px] rounded-b-[0.9rem] flex flex-col p-6 text-white" style={{width: width ? `${width}px` : `auto`}}>
      <h1 className="text-2xl font-bold mb-4 text-center">Add Music</h1>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search music and artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black focus:outline-none"
        />
      </div>
      <div className="border-b border-white mb-4"></div>

      <h2 className="text-xl font-semibold mb-3">Genres</h2>
      <div className="flex justify-between mb-6">
        {genres.map((genre) => (
          <div key={genre.name} className="relative w-[65px] h-[65px] rounded-xl overflow-hidden">
            <img src={genre.image} alt={genre.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-xs font-medium">{genre.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-b border-white mb-4"></div>

      <h2 className="text-xl font-semibold mb-3">Trending Songs</h2>
      <div className="flex flex-col space-y-4">
        {songs.slice(0, 7).map((song) => (
          <div key={song.id} className="flex items-center">
            <img src={song.image} alt={song.name} className="w-10 h-10 rounded-full object-cover mr-3"/>
            <div className="flex-grow">
              <p className="font-medium text-sm">{song.name}</p>
              <p className="text-xs opacity-80">by {song.artist_name}</p>
            </div>
            <button onClick={(e) => togglePlay(song, e)} className="p-2 bg-white rounded-full">
              {playing === song.id ? (
                <Pause className="text-blue-600 w-4 h-4" />
              ) : (
                <Play className="text-blue-600 w-4 h-4" />
              )}
            </button>
          </div>
        ))}
      </div>
      <button className="mt-4 text-center text-sm flex items-center justify-center">
        <span className="mr-1">more</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
export default MusicDropDown;