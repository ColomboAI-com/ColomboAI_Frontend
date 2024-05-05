'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const StoryContext = createContext()

export default function StoryContextProvider({ children }) {

    const [stories, setStories] = useState([])
    const [page, setPage] = useState(1)
    const [loadings, setLoadings] = useState({
        getUserStory: false,
        createStory: false,
        reactStory: false,

    })


    const createStory = async ({ fileType, file, content }) => {
        try {
            setLoadings(prev => ({ ...prev, createStory: true }))
            const formData = new FormData()
            formData.append('filetype', fileType)
            formData.append('file', file[0])
            formData.append('content', content)
            const res = await axios.post(`${ROOT_URL_FEED}/stories/create`,
                formData,
                {
                    headers: {
                        Authorization: getCookie('token')
                    }
                }
            )
            return res.data
        } catch (err) {
            //handleError(err)
        } finally {
            setLoadings(prev => ({ ...prev, createStory: false }))
        }
    }

    const getStoriesOfUser = async (userid) => {
        console.log('getStoriesOfUser', userid)
        try {
            setLoadings(prev => ({ ...prev, getUserStory: true }))
            const res = await axios.get(`${ROOT_URL_FEED}/stories/user/${userid?.userid}`,
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
            setLoadings(prev => ({ ...prev, getUserStory: false }))
        }
    }

    const getRecentStories = async () => {
        try {
            setLoadings(prev => ({ ...prev, reactStory: true }))
            const res = await axios.get(`${ROOT_URL_FEED}/stories/recent`,
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
            setLoadings(prev => ({ ...prev, reactStory: false }))
        }
    }

    return (


        <StoryContext.Provider value={{
          stories, setStories,
          loadings, createStory,
          getRecentStories,
          getStoriesOfUser, 
        }}>
    
          {children}
        </StoryContext.Provider>
    )

}

export {
    StoryContextProvider,
    StoryContext
};