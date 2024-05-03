'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_AUTH, ROOT_URL_FEED } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const UserProfileContext = createContext()

export default function UserProfileContextProvider({ children }) {

  const [userDetails, setUserDetails] = useState(null)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loadings, setLoadings] = useState({
    userDetails: false,
    getPost: false,
    editProfile: false,
    getFollowers: false,
  })

  const getUserDetails = async () => {
    try {
      setLoadings(prev => ({ ...prev, userDetails: true }))
      const res = await axios.get(`${ROOT_URL_AUTH}/user`,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      setUserDetails(res.data)
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, userDetails: false }))
    }
  }

  const getPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings(prev => ({ ...prev, getPost: true }))
      const res = await axios.get(`${ROOT_URL_FEED}/post/${getCookie('username')}`,
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

  const getSavedPosts = async (type, page = 1, limit = 10) => {
    try {
      setLoadings(prev => ({ ...prev, getPost: true }))
      const res = await axios.get(`${ROOT_URL_FEED}/post/saved`,
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

  const editProfile = async ({ user_name, name, bio, profile_picture }) => {
    try {
      setLoadings(prev => ({ ...prev, editProfile: true }))
      const res = await axios.put(`${ROOT_URL_AUTH}/user`,
        { user_name, name, bio, profile_picture },
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
      setLoadings(prev => ({ ...prev, editProfile: false }))
    }
  }

  const reportPost = async ({ postId = '', categories, description }) => {
    try {
      const res = await axios.post(`${ROOT_URL_FEED}/post/report/${postId}`,
        { categories, description },
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

  const getFollowers = async (type = 'followers') => {
    try {
      setLoadings(prev => ({ ...prev, getFollowers: true }))
      const res = await axios.get(`${ROOT_URL_AUTH}/user/followers/${getCookie('username')}`,
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
      setLoadings(prev => ({ ...prev, getFollowers: false }))
    }
  }

  const followUnfollowUser = async (userId = '') => {
    try {
      const res = await axios.patch(`${ROOT_URL_AUTH}/user/follow/${userId}`,
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

  const blockUser = async (userId = '') => {
    try {
      const res = await axios.patch(`${ROOT_URL_AUTH}/user/block/${userId}`,
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

  const resetFeedValues = () => {
    setPosts([])
    setPage(1)
  }

  return (
    <UserProfileContext.Provider value={{
      userDetails, setUserDetails,
      posts, setPosts,
      loadings, getUserDetails,
      getPosts, getSavedPosts,
      page, editProfile,
      reportPost,
      resetFeedValues,
      getFollowers,
      followUnfollowUser,
      blockUser
    }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export const useUserProfile = () => {
  return useContext(UserProfileContext)
}
