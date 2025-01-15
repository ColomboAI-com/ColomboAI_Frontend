"use client";
import { MessageBox } from "@/components/MessageBox";
import { getCookie } from "@/utlils/cookies";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_AUTH, ROOT_URL_FEED } from "@/utlils/rootURL";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const UserProfileContext = createContext();

export default function UserProfileContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loadings, setLoadings] = useState({
    userDetails: false,
    getPost: false,
    editProfile: false,
    getFollowers: false,
  });

  const [postsCount, setPostsCount] = useState(0);

  const [followersData, setFollowersData] = useState(null);
  const [followingsData, setFollowingsData] = useState(null);

  let [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  let [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  let [isShareProfileModalOpen, setIsShareProfileModalOpen] = useState(false);
  let [isUnFollowModalOpen, setIsUnFollowModalOpen] = useState(false);
  let [unFollowModalData, setUnFollowModalData] = useState();

  const getUserDetails = async (userName) => {
    try {
      setLoadings((prev) => ({ ...prev, userDetails: true }));
      const res = await axios.get(`${ROOT_URL_AUTH}/user/${userName}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      await setUserDetails(res.data);
      await localStorage.setItem("userVerified", res.data.verified);
    } catch (err) {
      console.log(err);
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, userDetails: false }));
    }
  };

  const getPosts = async (username, type, page = 1, limit = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getPost: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/user/${username}`, {
        params: { type, page, limit },
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setPosts((prev) => [...prev, ...(res.data?.posts || [])]);
      setPostsCount(res.data?.pagination?.totalCount || 0);
      if (res.data?.posts?.length) setPage((prev) => prev + 1);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getPost: false }));
    }
  };

  const getSavedPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getPost: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/saved`, {
        params: { type, page, limit },
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setPosts((prev) => [...prev, ...(res.data?.posts || [])]);
      if (res.data?.posts?.length) setPage((prev) => prev + 1);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getPost: false }));
    }
  };

  const editProfile = async ({ user_name, name, bio, profile_picture }) => {
    try {
      setLoadings((prev) => ({ ...prev, editProfile: true }));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("user_name", user_name);
      formData.append("bio", bio);
      formData.append("file", profile_picture);
      const res = await axios.put(`${ROOT_URL_AUTH}/user`, formData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, editProfile: false }));
    }
  };

  const reportPost = async ({ postId = "", categories, description }) => {
    try {
      const res = await axios.post(
        `${ROOT_URL_FEED}/post/report/${postId}`,
        { categories, description },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      return res.data;
    } catch (err) {
      handleError(err);
    }
  };

  const getFollowers = async (type = "followers") => {
    try {
      setLoadings((prev) => ({ ...prev, getFollowers: true }));
      const res = await axios.post(
        `${ROOT_URL_AUTH}/user/followers/${getCookie("username")}`,
        { type },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      if (type === "followers") {
        setFollowersData(res.data.results);
      } else if (type === "followings") {
        setFollowingsData(res.data.results);
      }
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getFollowers: false }));
    }
  };

  const followUnfollowUser = async (userId = "", isUnfollow = false) => {
    try {
      const res = await axios.patch(`${ROOT_URL_AUTH}/user/follow/${userId}`, null, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      if (isUnfollow) {
        getUserDetails(getCookie("username"));
      }
      return res.data;
    } catch (err) {
      handleError(err);
    }
  };

  const blockUser = async (userId = "") => {
    try {
      const res = await axios.patch(`${ROOT_URL_AUTH}/user/block/${userId}`, null, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      if (res.data.success) {
        MessageBox("success", res.data.message);
      }

      return res.data;
    } catch (err) {
      handleError(err);
    }
  };

  const resetFeedValues = () => {
    setPosts([]);
    setPage(1);
    setPostsCount(0);
  };

  const handleFollower = (user) => {
    const data = [...followersData];
    const find = data.find((e) => e._id === user._id);
    const index = data.indexOf(find);
    data[index] = { ...find, is_following: !find.is_following };
    setFollowersData(data);
    followUnfollowUser(user._id);
  };

  return (
    <UserProfileContext.Provider
      value={{
        userDetails,
        setUserDetails,
        posts,
        setPosts,
        loadings,
        getUserDetails,
        getPosts,
        getSavedPosts,
        page,
        editProfile,
        postsCount,
        setPostsCount,
        reportPost,
        resetFeedValues,
        getFollowers,
        followUnfollowUser,
        blockUser,
        isFollowerModalOpen,
        setIsFollowerModalOpen,
        isFollowingModalOpen,
        setIsFollowingModalOpen,
        isShareProfileModalOpen,
        setIsShareProfileModalOpen,
        isUnFollowModalOpen,
        setIsUnFollowModalOpen,
        unFollowModalData,
        setUnFollowModalData,
        followersData,
        setFollowersData,
        followingsData,
        setFollowingsData,
        handleFollower,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

// export const useUserProfile = () => {
//   return useContext(UserProfileContext)
// }

export { UserProfileContextProvider, UserProfileContext };
