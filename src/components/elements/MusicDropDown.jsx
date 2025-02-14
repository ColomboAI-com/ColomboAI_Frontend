import React, { useState, useEffect, useRef } from "react";
import { Search, Play, Pause, ChevronDown } from "lucide-react";
import "../../app/globals.css";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

// const https = require("https");

const MusicDropDown = ({ onSongSelect, setSongId, width }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [playing, setPlaying] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const audioRef = useRef(new Audio());

  const CLIENT_ID = "de0269ba";

  const genres = [
    { name: "Pop", value: "pop", image: "../../../images/music/pop.png" },
    { name: "Rock", value: "rock", image: "../../../images/music/rock.png" },
    {
      name: "Hip-hop",
      value: "hip-hop",
      image: "../../../images/music/hip-hop.png",
    },
    { name: "Jazz", value: "jazz", image: "../../../images/music/jazz.png" },
    { name: "R&B", value: "rnb", image: "../../../images/music/r&b.png" },
    {
      name: "Classical",
      value: "classical",
      image: "../../../images/music/classical.png",
    },
  ];

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      setPlaying(null);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const getMusicUrl = async (type) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.jamendo.com/v3.0/tracks/`, {
        params: {
          client_id: CLIENT_ID,
          format: "json",
          limit: 50,
          search: type,
          include: "musicinfo",
          ...(selectedGenre && { tags: [selectedGenre] }),
        },
      });
      return response.data.results;
    } catch (error) {
      console.error("Error fetching music:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
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
  }, [searchTerm, selectedGenre]);

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
    }
  };

  const handleSongSelect = (song) => {
    if (playing === song.id) {
      audioRef.current.pause();
      setPlaying(null);
    }
    onSongSelect(song);
  };

  const loadMore = () => {
    setDisplayCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="max-h-[35rem] w-auto overflow-y-scroll bg-blue-600 hide-scrollbar rounded-t-[15.22px] rounded-b-[0.9rem] flex flex-col p-6 text-white shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Add Music</h1>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search music and artists"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 text-black focus:outline-none"
        />
      </div>
      <div className="border-b border-white mb-4"></div>

      <h2 className="text-xl font-semibold mb-3">Genres</h2>
      <div className="flex justify-between mb-6">
        {genres.map((genre) => (
          <div
            key={genre.name}
            onClick={() => setSelectedGenre(genre.value)}
            role="button"
            className="relative w-[65px] h-[65px] rounded-xl overflow-hidden transition-transform duration-200 transform hover:scale-105"
          >
            <img src={genre.image} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-xs font-medium">{genre.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-b border-white mb-4"></div>

      <h2 className="text-xl font-semibold mb-3">Trending Songs</h2>
      <div className="flex flex-col space-y-4">
        {isLoading && (
          <div className="flex items-center justify-center">
            <ThreeDots
              visible={true}
              height="24"
              width="24"
              color="#3B82F6"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        )}
        {songs.slice(0, displayCount).map((song) => (
          <div
            key={song.id}
            className="flex items-center p-2 hover:bg-blue-500 rounded-lg cursor-pointer"
            onClick={() => handleSongSelect(song)}
          >
            <img
              src={song.image}
              alt={song.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-grow">
              <p className="font-medium text-sm">{song.name}</p>
              <p className="text-xs opacity-80">by {song.artist_name}</p>
            </div>
            <button
              onClick={(e) => {
                togglePlay(song, e);
              }}
              className="p-2 bg-gray-200 rounded-full"
            >
              {playing === song.id ? (
                <Pause className="text-blue-600 w-4 h-4" />
              ) : (
                <Play className="text-blue-600 w-4 h-4" />
              )}
            </button>
          </div>
        ))}
        {songs.length === 0 && !isLoading && (
          <div className="text-center text-sm">No songs found</div>
        )}
      </div>
      {displayCount < songs.length && (
        <button
          onClick={loadMore}
          className="mt-4 text-center text-sm flex items-center justify-center hover:bg-blue-700 p-2 rounded"
        >
          <span className="mr-1">more</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default MusicDropDown;
