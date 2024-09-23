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
      console.log(response.data);
      return response.data;
    } catch (error) {
      handleError(error);
    } finally {
      setLoadings((prev) => ({ ...prev, reactVibe: false }));
    }
  };

  const deleteVibe = async (postId = '') => {
    // Using postId because vibe is a type of post
    try {
      setLoadings(prev => ({ ...prev, deleteVibe: true }))
      const res = await axios.delete(`${ROOT_URL_FEED}/vibes/${postId}/delete`,
        {
          headers: {
            Authorization: getCookie('token')
          }
        }
      )
      if (res.data.success) {
        //Remove the deleted post from the posts array
        setVibes(prevPosts => prevPosts.filter(post => post._id !== postId));
      }   
      return res.data
    } catch (err) {
      handleError(err)
    } finally {
      setLoadings(prev => ({ ...prev, deletePost: false }))
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
        setVibes(prevPosts => prevPosts.filter(post => post._id !== postId));
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
        deleteVibe
      }}
    >
      {children}
    </VibeContext.Provider>
  );
}

export { VibeContextProvider, VibeContext };
