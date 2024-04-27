'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const FeedContext = createContext()

export default function FeedContextProvider({ children }) {

  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loadings, setLoadings] = useState({
    getPost: false,
    createPost: false,
    deletePost: false,
    addComment: false,
    deleteComment: false,
    generatePost: false,
    generateComment: false,
    GetUserPost: false
  })

  const getPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings(prev => ({ ...prev, getPost: true }))
      const res = await axios.get(`${ROOT_URL_FEED}/post/feed`,
        {
          params: { type, page, limit },
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      setPosts(prev => ([...prev, ...res.data?.posts || []]))
      if (res.data?.posts?.length) setPage(prev => (prev + 1))
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, getPost: false }))
    }
  }

  const createPost = async ({ fileType, file, content }) => {
    try {
      setLoadings(prev => ({ ...prev, createPost: true }))
      const formData = new FormData()
      formData.append('filetype', fileType)
      formData.append('file', file)
      formData.append('content', content)
      const res = await axios.get(`${ROOT_URL_FEED}/post/create`,
        formData,
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
      setLoadings(prev => ({ ...prev, createPost: false }))
    }
  }

  const deletePost = async (postId = '') => {
    try {
      setLoadings(prev => ({ ...prev, deletePost: true }))
      const res = await axios.delete(`${ROOT_URL_FEED}/post/${postId}`,
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
      setLoadings(prev => ({ ...prev, deletePost: false }))
    }
  }

  const likePost = async (postId = '') => {
    try {
      const res = await axios.put(`${ROOT_URL_FEED}/post/${postId}/like`,
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

  const addComment = async ({ postId = '', content }) => {
    try {
      setLoadings(prev => ({ ...prev, addComment: true }))
      const res = await axios.put(`${ROOT_URL_FEED}/post/${postId}/comment`,
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
      const res = await axios.delete(`${ROOT_URL_FEED}/post/${postId}/comment/${commentId}`,
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
      const res = await axios.patch(`${ROOT_URL_FEED}/post/re-post/${postId}`,
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
      const res = await axios.post(`${ROOT_URL_LLM}/vertex-generate-text_from_promt`,
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

  const generateComment = async (prompt = '', post) => {
    try {
      setLoadings(prev => ({ ...prev, generateComment: true }))
      const formData = new FormData()
      formData.append('prompt', prompt)
      formData.append('text', post.content || post.media)
      const res = await axios.post(`${ROOT_URL_LLM}/vertex-generate-comment`,
        formData,
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
      setLoadings(prev => ({ ...prev, generateComment: false }))
    }
  }

  const getPostsOfUser = async (username = '') => {
    try {
      setLoadings(prev => ({ ...prev, GetUserPost: true }))
      const res = await axios.get(`${ROOT_URL_FEED}/post/user/${username}`,
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
      setLoadings(prev => ({ ...prev, GetUserPost: false }))
    }
  }

  const resetFeedValues = () => {
    setPosts([])
    setPage(1)
  }

  return (

//     <FeedContext.Provider value={{
//       posts, setPosts,
//       loadings, getPosts,
//       createPost, deletePost,
//       likePost, rePost,
//       addComment, deleteComment,
//       generatePost, generateComment,
//       getPostsOfUser, page,
//       resetFeedValues
//     }}>
    <FeedContext.Provider
      value={{
        posts,
        setPosts,
        loadings,
        getPosts,
        createPost,
        deletePost,
        likePost,
        rePost,
        addComment,
        deleteComment,
        generatePost,
        generateComment,
        getPostsOfUser,
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