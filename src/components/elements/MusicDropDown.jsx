import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const MusicDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const songs = [
    { title: 'Song 1', artist: 'Artist 1', thumbnail: 'https://via.placeholder.com/50' },
    { title: 'Song 2', artist: 'Artist 2', thumbnail: 'https://via.placeholder.com/50' },
    { title: 'Song 3', artist: 'Artist 3', thumbnail: 'https://via.placeholder.com/50' },
    { title: 'Song 4', artist: 'Artist 4', thumbnail: 'https://via.placeholder.com/50' },
  ];

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed top-[360px] left-[525px] w-[468px] h-[624px] bg-white rounded-t-[15.22px] border-[0.76px] opacity-0 flex flex-col shadow-md">
      <div className="flex items-center p-4 border-b">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="flex flex-col overflow-y-auto">
        {filteredSongs.map((song, index) => (
          <div key={index} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <img src={song.thumbnail} alt={song.title} className="w-12 h-12 rounded mr-4" />
            <div className="flex flex-col">
              <span className="font-medium">{song.title}</span>
              <span className="text-gray-500 text-sm">{song.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicDropdown;