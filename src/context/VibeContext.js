"use client";
import { getCookie } from "@/utlils/cookies";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

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

  const createVibe = async ({
    type,
    file,
    text,
    textColor,
    content,
    trackId,
    isHideLikes = false,
    isHideComments = false,
  }) => {
    console.log(type, file, text, textColor, content);

    try {
      setLoadings((prev) => ({ ...prev, createVibe: true }));
      const formData = new FormData();
      formData.append("type", type);
      formData.append("file", file || "");
      formData.append("text", text || "");
      formData.append("textColor", textColor || "");
      formData.append("content", content || "");
      formData.append("trackId", trackId || "");
      formData.append("hideLikes", isHideLikes);
      formData.append("isCommentOff", isHideComments);
      // fields to include:
      // music
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
      // console.log(response.data)

      if (response.status === 201) {
        console.log("Hitting create vibe endpoint successfully");
        console.log("Response:", response.data);
        MessageBox("success", "Vibe created successfully");
        setIsCreateVibeOpen(false); // Close the create vibe modal
      }
    } catch (error) {
      handleError(error);
      //   MessageBox("error", "Failed to create vibe. Please try again.");
    } finally {
      setLoadings((prev) => ({ ...prev, createVibe: false }));
    }
  };

  const getVibes = async () => {
    try {
      setLoadings((prev) => ({ ...prev, reactVibe: true }));
      const response = await axios.get(`${ROOT_URL_FEED}/vibes/feed`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      // console.log(response.data);
      setVibes(prev => ([...prev, ...response.data?.posts || []]))
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

  // const deleteVibe = (vibeId) => {
  //   console.log(vibeId);
  // }

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
        archiveVibe
      }}
    >
      {children}
    </VibeContext.Provider>
  );
}

export { VibeContextProvider, VibeContext };
