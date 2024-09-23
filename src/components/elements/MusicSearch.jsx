import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const MusicSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Mock API call to Jamendo
    const fetchSongs = async () => {
      // In a real application, you would make an API call to Jamendo 
      // example:
      // const response = await fetch('https://api.jamendo.com/v3.0/tracks/?client_id=YOUR_CLIENT_ID&format=json&limit=20');
      // const data = await response.json();
      // setSongs(data.results);
      const mockSongs = [
        { id: 1, name: 'Energetic Rock', artist_name: 'John Doe', image: '/api/placeholder/50/50' },
        { id: 2, name: 'Mellow Jazz', artist_name: 'Jane Smith', image: '/api/placeholder/50/50' },
        { id: 3, name: 'Electronic Beats', artist_name: 'DJ Spark', image: '/api/placeholder/50/50' },
        { id: 4, name: 'Acoustic Vibes', artist_name: 'The Strummers', image: '/api/placeholder/50/50' },
      ];
      setSongs(mockSongs);
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    song.artist_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md bg-white rounded-t-lg border shadow-md flex flex-col">
      <div className="flex items-center p-4 border-b">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search music..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none"
        />
      </div>
      <div className="flex flex-col overflow-y-auto max-h-96">
        {filteredSongs.map((song) => (
          <div key={song.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
            <img src={song.image} alt={song.name} className="w-12 h-12 rounded mr-4" />
            <div className="flex flex-col">
              <span className="font-medium">{song.name}</span>
              <span className="text-gray-500 text-sm">{song.artist_name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;