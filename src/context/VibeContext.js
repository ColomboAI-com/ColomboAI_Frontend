'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useState } from "react"

const VibeContext = createContext();

export default function VibeContextProvider({ children }) {
    const [vibes, setVibes] = useState([])
    const [page, setPage] = useState(1)
    const [loadings, setLoadings] = useState({
        getUserVibe: false,
        createVibe: false
    })
    
    const createVibe = async ({fileType, file, content}) => {
        try {
            setLoadings(prev => ({ ...prev, createStory: true }))
            const formData = new FormData()
            formData.append('type', fileType)
            formData.append('file', file[0])

            // fields to possibly include
            // type: postType,
            // file: file, // This should be the file object if uploading media
            // mediaUrl: mediaUrl,
            // hideLikes: false,
            // isCommentOff: false,

            const response = await axios.post(`${ROOT_URL_FEED}/vibes/create`,
                formData,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status === 201) {
            console.log("Hitting create vibe endpoint successfully");
            console.log("Response:", response.data);
            MessageBox("success", "Vibe created successfully");
            setIsCreateVibeOpen(false); // Close the create vibe modal
          }
        } catch (error) {
            handleError(error)
        //   MessageBox("error", "Failed to create vibe. Please try again.");
        } finally {
            setLoadings(prev => ({ ...prev, createVibe: false }))
        }
      };


    const getVibes = async () => {
        try {
            setLoadings(prev => ({ ...prev, reactVibe: true}))
            const response = await axios.get(`${ROOT_URL_FEED}/vibes/feed`,
                {
                    headers: {
                        Authorization: getCookie('token')
                    }
                }
            )
            return response.data
        } catch (error) {
            handleError(error)
        } finally {
            setLoadings(prev => ({ ...prev, reactVibe: false}))
        }
    }


    return (
        <VibeContext.Provider value={{
            vibes, 
            setVibes,
            loadings, 
            createVibe,
            getVibes
        }}>
            {children}
        </VibeContext.Provider>
    )
}

