"use client";
import { getCookie } from "@/utlils/cookies";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_FEED, ROOT_URL_LLM, ROOT_URL_AUTH } from "@/utlils/rootURL";
import axios from "axios";
import { createContext, useState } from "react";

const FeedContext = createContext();

export default function FeedContextProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [topUsersDetails, setTopUsersDetails] = useState([]);
  const [searchUsersDetails, setSearchUsersDetails] = useState([]);
  const [loadings, setLoadings] = useState({
    getPost: true,
    createPost: false,
    deletePost: false,
    addComment: false,
    deleteComment: false,
    rePost: false,
    generatePost: false,
    generateComment: false,
    GetUserPost: false,
    getComments: false,
    searchUser: false,
    topUser: false,
    getImpressions: false,
    incrementImpression: false,
    getWallet: false,
    calcWallet: false,
  });

  const getPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getPost: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/feed`, {
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

  const editComment = async ({ postId = "", commentId = "", content = "" }) => {
    try {
      setLoadings((prev) => ({ ...prev, addComment: true })); // Use addComment loading or create a new one
      const res = await axios.put(
        `${ROOT_URL_FEED}/post/${postId}/comment/${commentId}`, // Assuming this endpoint for edit
        { content },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      // After successful API call, update the specific comment in the specific post
      if (res.data && res.data.success && res.data.comment) {
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p._id === postId) {
              const updatedComments = p.comments?.map(c =>
                c._id === commentId ? { ...c, ...res.data.comment } : c
              ) || []; // Ensure p.comments exists
              // This assumes comments are part of the post object in FeedContext.posts
              // If CommentSection fetches its own comments, it needs to update its local state
              // or re-fetch for that specific comment.
              // For now, let's assume we need to update a nested comment structure if it exists.
              // This part is tricky if comments are not directly nested in FeedContext.posts[X].comments
              // A more robust solution might involve CommentSection managing its own list and just re-fetching that single comment or updating it.
              // For now, this is a placeholder for how context *could* update it if structure allows.
              // The primary update will happen in CommentSection's local state after this call.
              return {
                ...p,
                comments: updatedComments, // This is speculative based on data structure
              };
            }
            return p;
          })
        );
      }
      return res.data; // Should include { success: true, comment: updatedCommentObject }
    } catch (err) {
      handleError(err);
      throw err;
    } finally {
      setLoadings((prev) => ({ ...prev, addComment: false }));
    }
  };

  const createPost = async ({
    type,
    files,
    mediaUrl,
    content,
    isHideLikes = false,
    isHideComments = false,
  }) => {
    try {
      setLoadings((prev) => ({ ...prev, createPost: true }));
      const formData = new FormData();
      formData.append("type", type);

      for (const file of files) {
        formData.append("files", file);
      }

      formData.append("content", content);
      formData.append("mediaUrl", mediaUrl);
      formData.append("hideLikes", isHideLikes);
      formData.append("isCommentOff", isHideComments);
      const res = await axios.post(`${ROOT_URL_FEED}/post/create`, formData, {
        headers: {
          Authorization: getCookie("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, createPost: false }));
    }
  };

  const deletePost = async (postId = "") => {
    try {
      setLoadings((prev) => ({ ...prev, deletePost: true }));
      const res = await axios.delete(`${ROOT_URL_FEED}/post/${postId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      if (res.data.success) {
        //Remove the deleted post from the posts array
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      }
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, deletePost: false }));
    }
  };

  const likePost = async (postId = "") => {
    try {
      const res = await axios.put(`${ROOT_URL_FEED}/post/${postId}/like`, null, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      // After successful API call, update the specific post in the posts state
      if (res.data && res.data.success) { // Assuming backend returns success and new like status/counts
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p._id === postId) {
              // Backend should ideally return the new like count and liked status
              // For now, let's assume it returns the updated post object or necessary fields
              // If not, we might have to infer based on current state before API call, which is less robust.
              // Let's assume res.data.post contains the updated post or relevant like fields
              return {
                ...p,
                counts: { ...p.counts, likes: res.data.likeCount !== undefined ? res.data.likeCount : p.counts.likes },
                interactions: { ...p.interactions, isLiked: res.data.isLiked !== undefined ? res.data.isLiked : p.interactions.isLiked }
                // Fallback to current values if backend doesn't return them, but this means UI relies on local optimistic updates for display
              };
            }
            return p;
          })
        );
      }
      return res.data;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw error so UI can catch it for reverting optimistic updates
    }
  };

  const getComments = async (postId, page = 1, count = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getComments: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/${postId}/comments`, {
        params: { page, count },
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getComments: false }));
    }
  };

  const addComment = async ({ postId = "", content }) => {
    try {
      setLoadings((prev) => ({ ...prev, addComment: true }));
      const res = await axios.put(
        `${ROOT_URL_FEED}/post/${postId}/comment`,
        { content },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      // After successful API call, update the specific post in the posts state
      // Assuming backend returns { success: true, comment: newCommentObject }
      if (res.data && res.data.success && res.data.comment) {
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p._id === postId) {
              // Increment comment count and potentially add comment to a preview list if stored on post
              const newCounts = { ...p.counts, comments: (p.counts.comments || 0) + 1 };
              // If posts have a 'comments' array for previews (like RecentComments):
              // const newRecentComments = [res.data.comment, ...(p.comments || [])].slice(0, 3); // Example
              return {
                ...p,
                counts: newCounts,
                // comments: newRecentComments, // If applicable
              };
            }
            return p;
          })
        );
      }
      return res.data; // Should include { success: true, comment: newCommentObject }
    } catch (err) {
      handleError(err);
      throw err; // Re-throw for UI to handle
    } finally {
      setLoadings((prev) => ({ ...prev, addComment: false }));
    }
  };

  const deleteComment = async ({ postId = "", commentId = "" }) => {
    try {
      setLoadings((prev) => ({ ...prev, deleteComment: true }));
      const res = await axios.delete(`${ROOT_URL_FEED}/post/${postId}/comment/${commentId}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });

      // After successful API call, update the specific post in the posts state
      if (res.data && res.data.success) {
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p._id === postId) {
              const newCounts = { ...p.counts, comments: Math.max(0, (p.counts.comments || 0) - 1) };
              // If posts have a 'comments' array for previews (like RecentComments):
              const newRecentComments = p.comments?.filter(c => c._id !== commentId) || [];
              return {
                ...p,
                counts: newCounts,
                comments: newRecentComments, // Update preview comments if structure exists
              };
            }
            return p;
          })
        );
      }
      return res.data;
    } catch (err) {
      handleError(err);
      throw err; // Re-throw error for UI to handle
    } finally {
      setLoadings((prev) => ({ ...prev, deleteComment: false }));
    }
  };

  const rePost = async (postId = "", caption = "") => {
    try {
      setLoadings((prev) => ({ ...prev, rePost: true }));

      const requestBody = {};
      if (caption && caption.trim() !== "") {
        requestBody.content = caption.trim();
      }

      const res = await axios.post(`${ROOT_URL_FEED}/post/${postId}/repost`, requestBody, { // Send requestBody
        headers: {
          Authorization: getCookie("token"),
          // 'Content-Type': 'application/json' // Axios usually sets this for objects
        },
      });

      // Assuming backend returns the new repost object in res.data.data
      // and a success flag like res.data.success
      if (res.data && res.data.success) {
        if (res.data.data) { // The new repost object itself
          setPosts((prevPosts) => [res.data.data, ...prevPosts]); // Prepend new repost to the feed
        }
        // Additionally, update the original post's repost count if backend provides it
        if (res.data.updatedOriginalPost) {
          setPosts((prevPosts) =>
            prevPosts.map((p) =>
              p._id === res.data.updatedOriginalPost._id
                ? { ...p, counts: { ...p.counts, reposts: res.data.updatedOriginalPost.counts.reposts } }
                : p
            )
          );
        }
      }
      return res.data; // Return the full response for handling in the component
    } catch (err) {
      handleError(err);
      throw err; // Re-throw error for component to handle if needed (e.g., for UI feedback)
    } finally {
      setLoadings((prev) => ({ ...prev, rePost: false }));
    }
  };

  const savePost = async (postId = "") => {
    try {
      const res = await axios.post(`${ROOT_URL_FEED}/post/${postId}/save`, null, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    }
  };

  const generatePost = async (prompt = "") => {
    try {
      setLoadings((prev) => ({ ...prev, generatePost: true }));
      const res = await axios.post(
        `${ROOT_URL_LLM}/generate-content`,
        { promt: prompt.trim() },
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, generatePost: false }));
    }
  };

  const generateComment = async ({ prompt = "", post }) => {
    try {
      setLoadings((prev) => ({ ...prev, generateComment: true }));
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("text", post);
      const res = await axios.post(`${ROOT_URL_LLM}/generate-comment`, formData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return { responseData: res.data, generatedComment: res.data.text };
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, generateComment: false }));
    }
  };

  const getPostsOfUser = async (username = "") => {
    try {
      setLoadings((prev) => ({ ...prev, GetUserPost: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/user/${username}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      // Assuming posts are returned in res.data.posts
      setPosts(res.data.posts || []);
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, GetUserPost: false }));
    }
  };

  const searchUsers = async (query = "") => {
    try {
      setLoadings((prev) => ({ ...prev, searchUser: true }));
      const res = await axios.get(`${ROOT_URL_AUTH}/user/search?q=${query}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setSearchUsersDetails(res?.data?.results);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, searchUser: false }));
    }
  };

  const topUsers = async () => {
    try {
      setLoadings((prev) => ({ ...prev, topUser: true }));
      const res = await axios.get(`${ROOT_URL_AUTH}/user/top`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setTopUsersDetails(res?.data?.results);
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, topUser: false }));
    }
  };

  const getPostImpressions = async (postId) => {
    try {
      setLoadings((prev) => ({ ...prev, getImpressions: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/post/${postId}/get-impressions`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getImpressions: false }));
    }
  };

  const incrementPostImpressions = async (postId) => {
    try {
      setLoadings((prev) => ({ ...prev, incrementImpression: true }));
      const res = await axios.post(
        `${ROOT_URL_FEED}/post/${postId}/increase-view-count`,
        {},
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );

      // After successful API call, update the specific post in the posts state
      // Assuming backend returns { success: true, newImpressionCount: number }
      if (res.data && res.data.success && res.data.newImpressionCount !== undefined) {
        setPosts(prevPosts =>
          prevPosts.map(p => {
            if (p._id === postId) {
              return {
                ...p,
                counts: { ...p.counts, impressions: res.data.newImpressionCount }
              };
            }
            return p;
          })
        );
      }
      return res.data;
    } catch (err) {
      handleError(err);
      // Optionally re-throw or return error status
    } finally {
      setLoadings((prev) => ({ ...prev, incrementImpression: false }));
    }
  };

  const getPostWallet = async (postId) => {
    try {
      setLoadings((prev) => ({ ...prev, getWallet: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/wallet/${postId}/`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getWallet: false }));
    }
  };

  const getPostById = async (postId) => {
    // setLoading state will be handled by the calling function e.g. fetchAllPostsByIds or getRecommendedPosts
    try {
      const res = await axios.get(`${ROOT_URL_FEED}/post/${postId}/`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
      // It's important to re-throw or return a specific error indicator if needed by the caller
      throw err;
    }
  };

  // const generateWallet = async (postIds, adRevenue) => {
  //   try {
  //     setLoadings((prev) => ({ ...prev, calcWallet: true }));
  //     const res = await axios.post(
  //       `${ROOT_URL_FEED}/wallet/calculate/`,
  //       { postIds, adRevenue },
  //       {
  //         headers: {
  //           Authorization: getCookie("token"),
  //         },
  //       }
  //     );

  //     console.log(res);
  //   } catch (error) {
  //     handleError(err);
  //   } finally {
  //     setLoadings((prev) => ({ ...prev, calcWallet: true }));
  //   }
  // };

  // Helper to fetch posts from array of IDs
  const fetchAllPostsByIds = async (recommendations) => {
    try {
      setLoadings((prev) => ({ ...prev, getPost: true }));

      const postPromises = recommendations.map((rec) => getPostById(rec.content_id));

      const posts_data = await Promise.all(postPromises);
      return posts_data; // array of post data in the same order as recommendations
    } catch (err) {
      handleError(err);
      return [];
    } finally {
      setLoadings((prev) => ({ ...prev, getPost: false }));
    }
  };

  const getRecommendedPosts = async () => {
    try {
      setLoadings((prev) => ({ ...prev, getPost: true }));
      const response = await fetch(`/api/grpc?user_id=${getCookie("userid")}&type=posts`);
      const data = await response.json();

      if (response.ok && data.recommendations && data.recommendations.length > 0) {
        // Fetch only the first 10 posts for the initial load.
        // More posts will be loaded via infinite scrolling.
        const initialRecommendations = data.recommendations.slice(0, 10);
        const posts_data = await fetchAllPostsByIds(initialRecommendations);
        setPosts(posts_data || []); // Set posts once with the initial batch
      } else {
        if (!response.ok) {
          console.error("Failed to fetch recommendations:", data.error);
        }
        // Set posts to empty array if no recommendations or if there was an error
        setPosts([]);
      }
    } catch (error) {
      handleError(error);
      setPosts([]); // Ensure posts is empty on error
    } finally {
      setLoadings((prev) => ({ ...prev, getPost: false }));
    }
  };

  const resetFeedValues = () => {
    setPosts([]);
    setPage(1);
  };

  return (
    <FeedContext.Provider
      value={{
        topUsersDetails,
        setTopUsersDetails,
        searchUsersDetails,
        setSearchUsersDetails,
        posts,
        setPosts,
        loadings,
        getPosts,
        createPost,
        deletePost,
        likePost,
        rePost,
        savePost,
        addComment,
        editComment, // Expose editComment
        deleteComment,
        generatePost,
        generateComment,
        getPostsOfUser,
        page,
        resetFeedValues,
        getComments,
        searchUsers,
        topUsers,
        getPostImpressions,
        incrementPostImpressions,
        getPostWallet,
        getPostById,
        getRecommendedPosts,
        // generateWallet,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
}

// export const feed = () => {
//   return useContext(FeedContext)
// }

export { FeedContextProvider, FeedContext };
