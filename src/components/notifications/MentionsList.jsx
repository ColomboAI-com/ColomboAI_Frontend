"use client";

export const MentionsList = ({notifications}) => {
  const mentions = [
    { id: 1, user: "John Doe", message: "mentioned you in a comment.", profilePic: "https://via.placeholder.com/50", postImage: "https://via.placeholder.com/50x50" },
    { id: 2, user: "Jane Smith", message: "tagged you in a post.", profilePic: "https://via.placeholder.com/50", postImage: "https://via.placeholder.com/50x50" },
    { id: 3, user: "Alice Johnson", message: "added you to their story.", profilePic: "https://via.placeholder.com/50", postImage: "https://via.placeholder.com/50x50" }
  ];

  return (
    <div className="text-sm text-navbaraction bg-white">
      {mentions.map(mention => (
        <div key={mention.id} className="flex items-center p-2 border rounded space-x-4">
          <img src={mention.profilePic} alt="Profile" className="w-[46px] h-[46px] rounded-full" /> 
          <div className="flex-grow">
            <strong>{mention.user}</strong> {mention.message}
          </div>
          <img src={mention.postImage} alt="Post" className="w-[33px] h-[33px] rounded" /> 
        </div>
      ))}
    </div>
  );
};
