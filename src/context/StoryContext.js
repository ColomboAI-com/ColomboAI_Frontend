"use client";
import { getCookie } from "@/utlils/cookies";
import { handleError } from "@/utlils/handleError";
import { ROOT_URL_FEED, ROOT_URL_LLM } from "@/utlils/rootURL";
import axios from "axios";
import { createContext, useContext, useState } from "react";

const StoryContext = createContext();

export default function StoryContextProvider({ children }) {
  const [stories, setStories] = useState([]);
  const [page, setPage] = useState(1);
  const [loadings, setLoadings] = useState({
    getUserStory: false,
    createStory: false,
    reactStory: true,
    incrementImpression: false,
  });

  const createStory = async ({ fileType, file, content, isHideLikes = false, isHideComments = false }) => {
    try {
      setLoadings((prev) => ({ ...prev, createStory: true }));
      const formData = new FormData();
      formData.append("type", fileType);
      formData.append("file", file);
      formData.append("content", content);
      // formData.append('hideLikes', isHideLikes)
      // formData.append('isCommentOff', isHideComments)
      const res = await axios.post(`${ROOT_URL_FEED}/stories/create`, formData, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      //handleError(err)
    } finally {
      setLoadings((prev) => ({ ...prev, createStory: false }));
    }
  };

  const getStoriesOfUser = async (userid) => {
    try {
      setLoadings((prev) => ({ ...prev, getUserStory: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/stories/users/${userid}`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, getUserStory: false }));
    }
  };

  const getRecentStories = async () => {
    try {
      setLoadings((prev) => ({ ...prev, reactStory: true }));
      const res = await axios.get(`${ROOT_URL_FEED}/stories/recent`, {
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadings((prev) => ({ ...prev, reactStory: false }));
    }
  };

  const viewStoryoFUser = async (userid) => {
    try {
      const token = getCookie("token");
      setLoadings((prev) => ({ ...prev, getUserStory: true }));

      const res = await axios.post(
        `${ROOT_URL_FEED}/stories/users/${userid}/view`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      //handleError(err)
    } finally {
      //setLoadings(prev => ({ ...prev, getUserStory: false }))
    }
  };

  const incrementStoryImpressions = async (storyId) => {
    try {
      setLoadings((prev) => ({ ...prev, incrementImpression: true }));
      const res = await axios.post(
        `${ROOT_URL_FEED}/stories/${storyId}/increase-view-count`,
        {},
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
      setLoadings((prev) => ({ ...prev, incrementImpression: false }));
    }
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        setStories,
        loadings,
        createStory,
        getRecentStories,
        getStoriesOfUser,
        viewStoryoFUser,
        incrementStoryImpressions,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
}

export { StoryContextProvider, StoryContext };
