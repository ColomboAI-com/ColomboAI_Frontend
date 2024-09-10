'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM, ROOT_URL_AUTH } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useState } from "react"

const FeedContext = createContext()

export default function FeedContextProvider({ children }) {

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [topUsersDetails, setTopUsersDetails] = useState([])
  const [searchUsersDetails, setSearchUsersDetails] = useState([])
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
    topUser: false
  })

  const getPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings(prev => ({ ...prev, getPost: true }))
      const res = await axios.get(${ROOT_URL_FEED}/post/feed,
        {
          params: { type, page, limit },
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      setPosts(prev => ([...prev, ...res.data?.posts || []]))
      if (res.data?.posts?.length) setPage(prev => (prev + 1))
      console.log(res.data);
      
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, getPost: false }))
    }
  }

  const createPost = async ({ type, files=[], content, isHideLikes = false, isHideComments = false }) => {
    try {
      setLoadings(prev => ({ ...prev, createPost: true }))
      const formData = new FormData()
      formData.append('type', type)
      //formData.append('file', file || '')
      // Append all files to the FormData
      for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])}
      formData.append('content', content)
      formData.append('hideLikes', isHideLikes)
      formData.append('isCommentOff', isHideComments)
      const res = await axios.post(${ROOT_URL_FEED}/post/create,
        formData,
        {
          headers: {
            Authorization: getCookie('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      
      setPosts(prev => ([res.data?.post, ...prev]));
      return res.data
      
      
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, createPost: false }))
    }
  }

  const deletePost = async (postId = '') => {
    try {
      setLoadings(prev => ({ ...prev, deletePost: true }))
      const res = await axios.delete(${ROOT_URL_FEED}/post/${postId},
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      
      if (res.data.success) {
        //Remove the deleted post from the posts array
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
        
      }   
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, deletePost: false }))

    }
  }

  const likePost = async (postId = '') => {
    try {
      const res = await axios.put(${ROOT_URL_FEED}/post/${postId}/like,
        null,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return res.data
    } catch (err) {
      handleError(err)
    }
  }

  const getComments = async (postId, page = 1, count = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getComments: true }));
      const res = await axios.get(${ROOT_URL_FEED}/post/${postId}/comments, {
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

  const addComment = async ({ postId = '', content }) => {
    try {
      setLoadings(prev => ({ ...prev, addComment: true }))
      const res = await axios.put(${ROOT_URL_FEED}/post/${postId}/comment,
        { content },
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, addComment: false }))
    }
  }

  const deleteComment = async ({ postId = '', commentId = '' }) => {
    try {
      setLoadings(prev => ({ ...prev, deleteComment: true }))
      const res = await axios.delete(${ROOT_URL_FEED}/post/${postId}/comment/${commentId},
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, deleteComment: false }))
    }
  }

  const rePost = async (postId = '') => {
    try {
      setLoadings(prev => ({ ...prev, rePost: true }))
      const res = await axios.post(${ROOT_URL_FEED}/post/${postId}/repost,
        null,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      if (res.data) {        
        setPosts(prevPosts => [res.data, ...prevPosts])
      }
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, rePost: false }))
    }
  }

  const savePost = async (postId = '') => {
    try {
      const res = await axios.post(${ROOT_URL_FEED}/post/${postId}/save,
        null,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return res.data
    } catch (err) {
      handleError(err)
    }
  }

  const generatePost = async (prompt = '') => {
    try {
      setLoadings(prev => ({ ...prev, generatePost: true }))
      const res = await axios.post(${ROOT_URL_LLM}/vertex-generate-text_from_promt,
        { promt: prompt.trim() },
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, generatePost: false }))
    }
  }

  const generateComment = async ({ prompt = '', post }) => {
    try {
      setLoadings(prev => ({ ...prev, generateComment: true }))
      const formData = new FormData()
      formData.append('prompt', prompt)
      formData.append('text', post)
      const res = await axios.post(${ROOT_URL_LLM}/vertex-generate-comment,
        formData,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      return { responseData: res.data, generatedComment: res.data.text };
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, generateComment: false }))
    }
  }

  const getPostsOfUser = async (username = '') => {
    try {
      setLoadings(prev => ({ ...prev, GetUserPost: true }))
      const res = await axios.get(${ROOT_URL_FEED}/post/user/${username},
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      // Assuming posts are returned in res.data.posts
      setPosts(res.data.posts || []);
      return res.data;
      
      
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, GetUserPost: false }))
    }
  }

  const searchUsers = async (query = '') => {
    try {
      
      setLoadings((prev) => ({ ...prev, searchUser: true }));
      const res = await axios.get(${ROOT_URL_AUTH}/user/search?q=${query},
      {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setSearchUsersDetails(res?.data?.results)
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
      const res = await axios.get(${ROOT_URL_AUTH}/user/top,
      {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setTopUsersDetails(res?.data?.results)
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, topUser: false }));
    }
  };
  const resetFeedValues = () => {
    setPosts([])
    setPage(1)
  }

  return (


    <FeedContext.Provider value={{
      topUsersDetails, setTopUsersDetails,
      searchUsersDetails, setSearchUsersDetails,
      posts, setPosts,
      loadings, getPosts,
      createPost, deletePost,
      likePost, rePost, savePost,
      addComment, deleteComment,
      generatePost, generateComment,
      getPostsOfUser, page,
      resetFeedValues,
      getComments,
      searchUsers,
      topUsers
    }}>

      {children}
    </FeedContext.Provider>
  );
}

// export const feed = () => {
//   return useContext(FeedContext)
// }

export { FeedContextProvider, FeedContext };
