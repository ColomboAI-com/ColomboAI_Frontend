"use client";
import { MessageBox } from "@/components/MessageBox";
import ProfilePicture from "@/components/elements/ProfilePicture";
import { UserProfileContext } from "@/context/UserProfileContext";
import Button from "@/elements/Button";
import { getSessionStorage } from "@/utlils/utils";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const { loadings, editProfile, getUserDetails } =
    useContext(UserProfileContext);
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(getSessionStorage("user-details"));
    if (userData && userData) {
      setUsername(userData?.user_name);
      setDisplayName(userData?.name);
      setBio(userData?.bio);
      setMediaUrl(userData?.profile_picture);
      setFile(userData?.profile_picture);
    }
  }, []);

  const handleFileInputClick = () => {
    document.querySelector('input[type="file"][accept="image/*"]').click();
  };

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const newFiles = selectedFiles[0];
      setFile(newFiles);
      setMediaUrl(URL.createObjectURL(newFiles));
    }
  };

  const handleSubmit = async () => {
    const res = await editProfile({
      user_name: username,
      name: displayName,
      profile_picture: file,
      bio: bio || "",
    });
    if (res) {
      getUserDetails(username);
      MessageBox("success", res.message);
      setCookie("username", username);
      router.push("/profile");
    }
  };

  return (
    <div className=" font-sans flex flex-col items-center max-w-lg my-12 mx-auto">
      <ProfilePicture
        size={110}
        image={
          mediaUrl !== "" && file !== null
            ? mediaUrl
            : `/images/home/profile-img.png`
        }
      />
      <span onClick={handleFileInputClick}>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={(e) => handleFileChange(e, "file")}
        />
        <button className=" text-brandprimary">Change Picture</button>
      </span>
      <div>
        <input
          type="text"
          className="mt-4 w-full rounded-[40px] border-[1px] border-[#ACACAC] bg-[#EEEEEE] px-[30px] py-[22px] text-black placeholder:text-brandplaceholder focus:border-[#ACACAC] focus:bg-[#EEEEEE] focus:outline-none"
          placeholder="Edit Username"
          autoComplete="off"
          maxLength={30}
          name={"username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="mt-4 w-full rounded-[40px] border-[1px] border-[#ACACAC] bg-[#EEEEEE] px-[30px] py-[22px] text-black placeholder:text-brandplaceholder focus:border-[#ACACAC] focus:bg-[#EEEEEE] focus:outline-none"
          placeholder="Edit Display name"
          autoComplete="off"
          maxLength={50}
          name={"name"}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <textarea
          type="text"
          className="mt-4 w-full h-[20vh] resize-none rounded-[40px] border-[1px] border-[#ACACAC] bg-[#EEEEEE] px-[30px] py-[22px] text-black placeholder:text-brandplaceholder focus:border-[#ACACAC] focus:bg-[#EEEEEE] focus:outline-none"
          placeholder="Edit Bio"
          autoComplete="off"
          name={"email"}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          type="text"
          className="mt-4 w-full rounded-[40px] border-[1px] border-[#ACACAC] bg-[#EEEEEE] px-[30px] py-[22px] text-black placeholder:text-brandplaceholder focus:border-[#ACACAC] focus:bg-[#EEEEEE] focus:outline-none"
          placeholder="Edit Link"
          autoComplete="off"
          maxLength={50}
          name={"link"}
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button
          title={"UPDATE"}
          className={
            "mt-[17px] block w-full rounded-[40px] font-sans font-[700] bg-brandprimary px-[30px] py-[22px] text-white focus:bg-brandprimary transition duration-300 ease-in"
          }
          loading={loadings.editProfile}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default EditProfile;
