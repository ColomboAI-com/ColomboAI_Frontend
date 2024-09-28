// import React, { useState, useEffect, useRef } from 'react';
// import { Search, Play, Pause, Volume2, VolumeX } from 'lucide-react';

// const https = require('https');

// const MusicSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [songs, setSongs] = useState([]);
//   const [playing, setPlaying] = useState(null);
//   const [muted, setMuted] = useState(false);
//   const audioRef = useRef(new Audio());

//   const CLIENT_ID = 'de0269ba'; // client ID

//   const getMusicUrl = (type) => {
//     return new Promise((resolve, reject) => {
//       const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=16&search=${type}&include=musicinfo`;
      
//       https.get(url, (response) => {
//         let data = '';
//         response.on('data', (chunk) => {
//           data += chunk;
//         });

//         response.on('end', () => {
//           try {
//             const parsedData = JSON.parse(data);
//             console.log('API response:', parsedData);
//             resolve(parsedData.results);
//           } catch (error) {
//             console.error('Error parsing JSON:', error);
//             reject(error);
//           }
//         });
//       }).on('error', (error) => {
//         console.error('Error fetching music:', error);
//         reject(error);
//       });
//     });
//   };

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const results = await getMusicUrl(searchTerm || 'popular');
//         setSongs(results);
//       } catch (error) {
//         console.error('Error in fetchSongs:', error);
//         setSongs([]);
//       }
//     };

//     fetchSongs();
//   }, [searchTerm]);

//   useEffect(() => {
//     audioRef.current.addEventListener('ended', () => setPlaying(null));
//     return () => {
//       audioRef.current.removeEventListener('ended', () => setPlaying(null));
//     };
//   }, []);

//   const togglePlay = (song) => {
//     if (playing === song.id) {
//       audioRef.current.pause();
//       setPlaying(null);
//     } else {
//       if (playing) {
//         audioRef.current.pause();
//       }
//       audioRef.current.src = song.audio;
//       audioRef.current.play();
//       setPlaying(song.id);
//     }
//   };

//   const toggleMute = () => {
//     audioRef.current.muted = !audioRef.current.muted;
//     setMuted(!muted);
//   };

//   return (
//     <div className="w-full max-w-md bg-white rounded-lg border shadow-md flex flex-col p-4">
//       <div className="flex items-center mb-4">
//         <Search className="text-gray-400 mr-2" />
//         <input
//           type="text"
//           placeholder="Search music..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border rounded focus:outline-none"
//         />
//         <button onClick={toggleMute} className="ml-2 p-2">
//           {muted ? <VolumeX /> : <Volume2 />}
//         </button>
//       </div>
//       <div className="flex flex-col overflow-y-auto max-h-96">
//         {songs.map((song) => (
//           <div key={song.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
//             <img src={song.image} alt={song.name} className="w-12 h-12 rounded mr-4" />
//             <div className="flex-grow">
//               <span className="font-medium">{song.name}</span>
//               <span className="text-gray-500 text-sm block">{song.artist_name}</span>
//             </div>
//             <button onClick={() => togglePlay(song)} className="p-2">
//               {playing === song.id ? <Pause /> : <Play />}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MusicSearch;

// import React, { useState, useEffect, useRef } from 'react';
// import { Search, Play, Pause, ChevronDown } from 'lucide-react';

// const https = require('https');

// const MusicSearch = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [songs, setSongs] = useState([]);
//   const [playing, setPlaying] = useState(null);
//   const audioRef = useRef(new Audio());

//   const CLIENT_ID = 'de0269ba'; // client ID

//   const genres = [
//     { name: 'Pop', image: '/api/placeholder/100/100' },
//     { name: 'Rock', image: '/api/placeholder/100/100' },
//     { name: 'Hip-hop', image: '/api/placeholder/100/100' },
//     { name: 'Jazz', image: '/api/placeholder/100/100' },
//     { name: 'R&B', image: '/api/placeholder/100/100' },
//     { name: 'Classical', image: '/api/placeholder/100/100' },
//   ];

//   const getMusicUrl = (type) => {
//     return new Promise((resolve, reject) => {
//       const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=16&search=${type}&include=musicinfo`;
      
//       https.get(url, (response) => {
//         let data = '';
//         response.on('data', (chunk) => {
//           data += chunk;
//         });

//         response.on('end', () => {
//           try {
//             const parsedData = JSON.parse(data);
//             console.log('API response:', parsedData);
//             resolve(parsedData.results);
//           } catch (error) {
//             console.error('Error parsing JSON:', error);
//             reject(error);
//           }
//         });
//       }).on('error', (error) => {
//         console.error('Error fetching music:', error);
//         reject(error);
//       });
//     });
//   };

//   useEffect(() => {
//     const fetchSongs = async () => {
//       try {
//         const results = await getMusicUrl(searchTerm || 'popular');
//         setSongs(results);
//       } catch (error) {
//         console.error('Error in fetchSongs:', error);
//         setSongs([]);
//       }
//     };

//     fetchSongs();
//   }, [searchTerm]);

//   useEffect(() => {
//     audioRef.current.addEventListener('ended', () => setPlaying(null));
//     return () => {
//       audioRef.current.removeEventListener('ended', () => setPlaying(null));
//     };
//   }, []);

//   const togglePlay = (song) => {
//     if (playing === song.id) {
//       audioRef.current.pause();
//       setPlaying(null);
//     } else {
//       if (playing) {
//         audioRef.current.pause();
//       }
//       audioRef.current.src = song.audio;
//       audioRef.current.play();
//       setPlaying(song.id);
//     }
//   };

//   return (
//     <div className="w-full max-w-md bg-blue-600 rounded-2xl shadow-lg flex flex-col p-6 text-white">
//       <h1 className="text-2xl font-bold mb-4 text-center">Add Music</h1>
      
//       <div className="relative mb-6">
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search music and artists"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 rounded-full bg-white text-black focus:outline-none"
//         />
//       </div>

//       <h2 className="text-xl font-semibold mb-3">Genres</h2>
//       <div className="flex justify-between mb-6">
//         {genres.map((genre) => (
//           <div key={genre.name} className="flex flex-col items-center">
//             <img src={genre.image} alt={genre.name} className="w-14 h-14 rounded-lg object-cover mb-1" />
//             <p className="text-xs">{genre.name}</p>
//           </div>
//         ))}
//       </div>

//       <h2 className="text-xl font-semibold mb-3">Trending Songs</h2>
//       <div className="flex flex-col space-y-4">
//         {songs.slice(0, 7).map((song) => (
//           <div key={song.id} className="flex items-center">
//             <img src={song.image} alt={song.name} className="w-12 h-12 rounded-md mr-3" />
//             <div className="flex-grow">
//               <p className="font-medium text-sm">{song.name}</p>
//               <p className="text-xs text-gray-300">by {song.artist_name}</p>
//             </div>
//             <button onClick={() => togglePlay(song)} className="p-2 bg-white rounded-full">
//               {playing === song.id ? 
//                 <Pause className="text-blue-600 w-5 h-5" /> : 
//                 <Play className="text-blue-600 w-5 h-5" />
//               }
//             </button>
//           </div>
//         ))}
//       </div>

//       <button className="mt-4 text-center text-sm flex items-center justify-center">
//         <span className="mr-1">more</span>
//         <ChevronDown className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default MusicSearch;