'use client'
import { getCookie } from "@/utlils/cookies"
import { handleError } from "@/utlils/handleError"
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

const VibeContext = createContext();

export default function VibeContextProvider({ children }) {
    const [vibes, setVibes] = useState([])
    const [page, setPage] = useState(1)
    const [loadings, setLoadings] = useState({
        getUserVibe: false,
        createVibe: false
    })
    
    const createVibe = async ({type, file, text, textColor, caption, isHideLikes = false, isHideComments = false }) => {
        // console.log(type, file, text, textColor, caption);
        
        try {
            setLoadings(prev => ({ ...prev, createVibe: true }))
            const formData = new FormData()
            formData.append('type', type)
            formData.append('file', file || '')
            formData.append('text', text || '')
            formData.append('textColor', textColor || '')
            formData.append('caption', caption || '')
            formData.append('hideLikes', isHideLikes)
            formData.append('isCommentOff', isHideComments)
            // fields to possibly include:
            // music 
            // taggedPeople

            console.log(formData)
            const response = await axios.post(`${ROOT_URL_FEED}/vibes/create`,
                formData,
                {
                headers: {
                    Authorization: getCookie('token'),
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
            console.log(response.data)
            return response.data
        } catch (error) {
            handleError(error)
        } finally {
            setLoadings(prev => ({ ...prev, reactVibe: false}))
        }
    }

    // TODO
    const deleteVibe = async () => {

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


export { VibeContextProvider, VibeContext };