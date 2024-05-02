import { Verified } from "../Icons";

const Profile = () => {
  const userData = {
    name: "Kai Kawaii",
    username: "@kai_kawaii01",
    bio: "Brooding Beyblade master with a fiery phoenix Bit-Beast, Dranzer, transforms from lone wolf to a valued teammate.",
    profilePicture: "/images/profile/Ellipse246.png",
    coverImage: "/images/profile/Rectangle40138.png",
    posts: 488,
    followers: "30.6m",
    following: 108
  };

  return (
    <div className="max-w-4xl mx-auto relative">
      <img
        src={userData.coverImage}
        alt="Cover"
        className="w-full h-55 object-cover"
      />

      <button className="absolute top-1/2 left-4 -translate-y-1/2 bg-white text-brandprimary font-bold py-2 px-4 rounded-full border-2 border-brandprimary">
        Follow
      </button>
      <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-brandprimary text-white font-bold py-2 px-4 rounded-full">
        Message
      </button>

      <div className="flex flex-col items-center -mt-16">
        <img
          src={userData.profilePicture}
          alt="Profile"
          className="rounded-full h-30 w-30 "
        />

        <h1 className="mt-4 text-3xl font-bold text-gray-900 flex items-center">
          {userData.name}
          <span className="text-brandprimary text-xl ml-2">
            <Verified/>
          </span>
        </h1>

        <div className="text-center text-brandplaceholder mb-4">
          {userData.username}
        </div>

        <p className="text-brandprimary text-center mt-2 px-6 text-2xl">
          {userData.bio}
        </p>

        <div className="flex justify-around w-full mt-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{userData.posts}</div>
            <div className="font-bold text-brandprimary">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{userData.followers}</div>
            <div className="font-bold text-brandprimary">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{userData.following.toLocaleString()}</div>
            <div className="font-bold text-brandprimary">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
