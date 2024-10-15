import { useState } from 'react';

// interface SearchData {
//   type: string;
//   username?: string;
//   profile?: string;
//   thoughts?: string;
//   image?: string;
//   video?: string;
//   vibe?: string;
// }

const SearchPage = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [searchData, setSearchData] = useState([
    { type: 'vibes', vibe: 'Good morning' },
    { type: 'video', video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { type: 'accounts', username: 'John Doe', profile: 'Software Engineer', thoughts: 'I love coding' },
    { type: 'images', image: 'https://picsum.photos/200/300' },
    { type: 'thoughts', thoughts: 'I love coding' },
    { type: 'vibes', vibe: 'Good afternoon' },
    { type: 'video', video: 'https://www.youtube.com/watch?v=jNQXAC9IVRw' },
    { type: 'accounts', username: 'Jane Doe', profile: 'Data Scientist', thoughts: 'I love data' },
    { type: 'images', image: 'https://picsum.photos/200/301' },
    { type: 'thoughts', thoughts: 'I love data' },
  ]);

  const filteredData = searchData.filter((data) => {
    if (activeTab === 'all') return true;
    return data.type === activeTab;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'accounts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('accounts')}
        >
          Accounts
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'vibes' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('vibes')}
        >
          Vibes
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'video' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('video')}
        >
          Video
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'images' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('images')}
        >
          Images
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'thoughts' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'} rounded`}
          onClick={() => setActiveTab('thoughts')}
        >
          Thoughts
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredData.map((data, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            {data.type === 'accounts' && (
              <div>
                <h2 className="text-lg font-bold">{data.username}</h2>
                <p className="text-gray-600">{data.profile}</p>
                <p className="text-gray-600">{data.thoughts}</p>
              </div>
            )}
            {data.type === 'vibes' && (
              <div>
                <h2 className="text-lg font-bold">Vibes</h2>
                <p className="text-gray-600">{data.vibe}</p>
              </div>
            )}
            {data.type === 'video' && (
              <div>
                <h2 className="text-lg font-bold">Video</h2>
                <iframe
                  className="w-full h-64"
                  src={data.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
            )}
            {data.type === 'images' && (
              <div>
                <h2 className="text-lg font-bold">Images</h2>
                <img className="w-full h-64 object-cover" src={data.image} alt="Image" />
              </div>
            )}
            {data.type === 'thoughts' && (
              <div>
                <h2 className="text-lg font-bold">Thoughts</h2>
                <p className="text-gray-600">{data.thoughts}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;