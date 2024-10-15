"use client";
import { getCookie } from "@/utlils/cookies";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { fetchSignInMethodsForEmail } from "firebase/auth";
const https = require("https");

const VibeContext = createContext();

export default function VibeContextProvider({ children }) {
  const [vibes, setVibes] = useState([]);
  const [page, setPage] = useState(1);
  const [loadings, setLoadings] = useState({
    getVibe: true,
    getUserVibe: false,
    createVibe: false,
    deleteVibe: false,
  });
  const { setIsCreateVibeOpen } = useContext(GlobalContext);
  const router = useRouter();

  const createVibe = async ({
    type,
    file,
    text,
    textColor,
    content,
    songId,
    isHideLikes = false,
    isHideComments = false,
  }) => {
    // console.log(type, file, text, textColor, content, songId);

    try {
      setLoadings((prev) => ({ ...prev, createVibe: true }));
      const formData = new FormData();
      formData.append("type", type);
      formData.append("file", file || "");
      formData.append("text", text || "");
      formData.append("textColor", textColor || "");
      formData.append("content", content || "");
      formData.append("hideLikes", isHideLikes);
      formData.append("isCommentOff", isHideComments);
      formData.append("song_id", songId || "");

      // fields to include:
      // taggedPeople
      // tag: “DRAFT” if saving a post as draft

      const response = await axios.post(
        `${ROOT_URL_FEED}/vibes/create`,
        formData,
        {
          headers: {
            Authorization: getCookie("token"),
          },
        }
      );
      
      if(response.data.success === true) {
        router.push('/vibes')
        setIsCreateVibeOpen(false)
      }
      
      if (response.status === 201) {
        console.log("Hitting create vibe endpoint successfully");
        console.log("Response:", response.data);
        MessageBox("success", "Vibe created successfully");
      }


    } catch (error) {
      handleError(error);
      //   MessageBox("error", "Failed to create vibe. Please try again.");
    } finally {
      setLoadings((prev) => ({ ...prev, createVibe: false }));
    }
  };

  const getVibes = async (type, page = 1, limit = 10) => {
    try {
      setLoadings((prev) => ({ ...prev, getVibe: true }));
      const response = await axios.get(`${ROOT_URL_FEED}/vibes/feed`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      setVibes(prev => ([...prev, ...response.data?.vibes || []]))
    } catch (error) {
      handleError(error);
    } finally {
      setLoadings((prev) => ({ ...prev, getVibe: false }));
    }
  };

  const deleteVibe = async (vibeId) => {
    try {
      setLoadings(prev => ({ ...prev, deleteVibe: true }))
      const res = await axios.delete(`${ROOT_URL_FEED}/vibes/${vibeId}`,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      if (res.data.success) {
        //Remove the deleted post from the posts array
        setVibes(prevPosts => prevPosts.filter(vibe => vibe._id !== vibeId));
      }   
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, deletePost: false }))
    }
  }

  const archiveVibe = async (id = '66f34a4536049e10646e09f9') => {
    try {
      const res = await axios.put(`${ROOT_URL_FEED}/posts/${id}/archive`,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      if (res.data.success) {
        console.log("Success")
      }   
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      //
    }
  }

  const discardVibe = async (postId = '') => {
    try {
      setLoadings(prev => ({ ...prev, deleteVibe: true }))
      const res = await axios.delete(`${ROOT_URL_FEED}/vibes/${postId}/discard`,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      if (res.data.success) {
        setVibes(prevPosts => prevPosts.filter(vibe => vibe._id !== vibeId));
      }   
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, deletePost: false }))
    }
  }

  const fetchSongById = (songId) => {
    const CLIENT_ID = 'de0269ba'; 

    return new Promise((resolve, reject) => {
      const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&id=${songId}&format=json`;

      https.get(url, (response) => {
        let data = "";
        response.on("data", (chunk) => {
          data += chunk;
        });
        response.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData.results);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  };

  const resetFeedValues = () => {
    setVibes([]);
    setPage(1);
  };


  return (
    <VibeContext.Provider
      value={{
        vibes,
        setVibes,
        loadings,
        createVibe,
        getVibes,
        discardVibe, 
        deleteVibe,
        archiveVibe, 
        fetchSongById,
        resetFeedValues
      }}
    >
      {children}
    </VibeContext.Provider>
  );
}

export { VibeContextProvider, VibeContext };
