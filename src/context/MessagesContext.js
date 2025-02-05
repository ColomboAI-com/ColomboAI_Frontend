import { handleError } from "@/utlils/handleError";
import { ROOT_URL_MESSAGES } from "@/utlils/rootURL";
import axios from "axios";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const MessagesContext = createContext();

export const MessagesContextProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [disconnectedUser, setDisconnectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [isShowChatMenu, setIsShowChatMenu] = useState(false);
  const [isFileMessageModalOpen, setIsFileMessageModalOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messageFile, setMessageFile] = useState(null);
  const [loadings, setLoadings] = useState({
    conversations: false,
    history: false,
    sendMsg: false,
  });

  // HELPER METHODS GO HERE --------------------------------------------------------

  // --------------------------------------------------------------------------------

  const DUMMY_TEXT = "CyYPvSCUj$Qf_dummy_text";
  const MESSAGE_MAX_LENGTH = 1024;

  const socketRef = useRef(null); // this is where the reference to the socket will be stored

  useEffect(() => {
    const token = getCookie("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGViMzYyM2U2ODQ5NDJhN2JjZGZjZiIsImlhdCI6MTczMzI3MzAxMSwiZXhwIjoxNzY0ODA5MDExfQ.XYK893FAtv_dpY2OyB2XVZpMjW_JQOZ1OMED_NZmkX8";

    // socketRef.current = new WebSocket(`${ROOT_URL_MESSAGES}?token=${token}`);
    socketRef.current = new WebSocket(`${ROOT_URL_MESSAGES}?token=${encodeURIComponent(token)}`);

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      authenticateConnection(token);
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "confirmAuthentication":
          confirmAuthentication(data.payload);
          break;
        case "loadConversations":
          loadConversations(data.payload);
          break;
        case "conversationCreated":
          conversationCreated(data.payload);
          break;
        case "loadMessages":
          loadMessages(data.payload);
          break;
        case "message":
          messageSent(data.payload);
          break;
        case "getOnlineUsers":
          setOnlineUsers(data.users);
          break;
        case "userDisconnected":
          setDisconnectedUser(data.user);
          break;
        case "newMessage":
          setNewMessage(data.message);
          break;
        case "editedMessage":
          afterMessageEdited(data.payload);
          break;
        case "deletedMessage":
          afterMessageDeleted(data.payload);
        default:
          console.log("Unknown message type:", data.type);
          console.log(data);
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (disconnectedUser) {
      let allChats = [...conversations];
      let findChat = allChats.find((e) => e.participants?.[0]?._id == disconnectedUser.userId);
      if (findChat?.participants?.[0]?.lastActiveTime) {
        const index = allChats.indexOf(findChat);
        findChat.participants[0].lastActiveTime = disconnectedUser.time;
        allChats[index] = findChat;
      }
      setConversations(allChats);
    }
  }, [disconnectedUser]);

  // SENDING FROM CLIENT TO SERVER

  const authenticateConnection = (token) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: token,
        type: "authenticateConnection",
        payload: {},
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const fetchConversations = (token) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: token,
        type: "fetchConversations",
        payload: {},
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const createConversation = (data) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: getCookie("token"),
        type: "createConversation",
        payload: data,
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const fetchMessages = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: getCookie("token"),
        type: "fetchMessages",
        payload: { conversationId: currentConversation._id, privateKey: currentConversation.privateKey },
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const sendMessage = async () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      let mediaUploadResp = null;
      if (messageFile) {
        const formData = new FormData();
        formData.append("file", messageFile);
        mediaUploadResp = await axios.post(ROOT_URL_MESSAGES + "/upload-media", formData, {
          headers: {
            Authorization: getCookie("token"),
          },
        });
      }
      let userId = getCookie("userid");
      let recipientId = null;
      for (let p of currentConversation.participants) {
        if (p._id != userId) {
          recipientId = p._id;
        }
      }

      let messageType = "TEXT";
      if (messageFile) {
        if (messageFile.type.includes("image")) messageType = "IMAGE";
        if (messageFile.type.includes("video")) messageType = "VIDEO";
      }

      let fileUrl = null;
      if (mediaUploadResp !== null) {
        if (mediaUploadResp.data.status === 200) {
          fileUrl = mediaUploadResp.data.fileUrl;
        }
      }

      const message = {
        token: getCookie("token"),
        type: "sendMessage",
        payload: {
          conversationId: currentConversation._id,
          sender: userId,
          recipient: recipientId,
          content: messageInput,
          recipientPublicKey: currentConversation.publicKey,
          messageType,
          media: fileUrl,
        },
      };
      socketRef.current.send(JSON.stringify(message));
      setMessageInput("");
      setMessageFile(null);
      setIsFileMessageModalOpen(false);
    }
  };

  const editMessage = async (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const data = {
        token: getCookie("token"),
        type: "editMessage",
        payload: {
          messageId: message._id,
          updatedContent: message.content,
          publicKey: currentConversation.publicKey,
        },
      };
      socketRef.current.send(JSON.stringify(data));
    }
  };

  const deleteMessage = async (message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const data = {
        token: getCookie("token"),
        type: "deleteMessage",
        payload: {
          messageId: message._id,
          publicKey: currentConversation.publicKey,
        },
      };
      socketRef.current.send(JSON.stringify(data));
    }
  };

  // RECEIVEING FROM SERVER TO CLIENT

  const confirmAuthentication = (payload) => {
    console.log(payload.message);
    const token = getCookie("token");
    fetchConversations(token);
  };

  const loadConversations = (payload) => {
    setConversations(payload);
  };

  const conversationCreated = (payload) => {
    setConversations((prev) => [payload, ...prev]);
    for (let user of payload.participants) {
      if (user._id !== getCookie("userid")) {
        setSelectedChat(user);
        setCurrentConversation(payload);
        break;
      }
    }
  };

  const loadMessages = (payload) => {
    setChatHistory(payload);
  };

  const messageSent = (payload) => {
    console.log(payload.conversation);
    setConversations((prevConversations) => {
      let updatedConvs = prevConversations.map((conv) => {
        if (conv._id === payload.conversation._id) {
          return { ...conv, lastMessage: payload.conversation.lastMessage };
        }
        return conv;
      });
      return updatedConvs;
    });

    setChatHistory((prev) => [...prev, payload.message]);
  };

  const afterMessageEdited = (message) => {
    console.log(message);

    if (currentConversation._id === message.conversationId) {
      setChatHistory((prev) => {
        let updatedMessages = prev.map((mess) => {
          if (mess._id === message._id) {
            return {
              ...mess,
              content: message.content,
            };
          }
          return mess;
        });

        return updatedMessages;
      });
    }
  };

  const afterMessageDeleted = (message) => {
    console.log(message);

    if (currentConversation._id === message.conversationId) {
      setChatHistory((prev) => {
        let updatedMessages = prev.map((mess) => {
          if (mess._id === message._id) {
            return {
              ...mess,
              content: message.content,
              isDeleted: message.isDeleted,
            };
          }
          return mess;
        });

        return updatedMessages;
      });
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        onlineUsers,
        setOnlineUsers,
        newMessage,
        setNewMessage,
        setDisconnectedUser,
        // getConversations,
        loadings,
        isShowChatMenu,
        setIsShowChatMenu,

        // -------------------------------- ABOVE THIS ARE USELESS FUNCTIONS ---------------------
        fetchConversations,
        conversations,
        setConversations,
        createConversation,
        selectedChat,
        setSelectedChat,
        DUMMY_TEXT,
        currentConversation,
        setCurrentConversation,
        fetchMessages,
        chatHistory,
        setChatHistory,
        MESSAGE_MAX_LENGTH,
        messageInput,
        setMessageInput,
        sendMessage,
        isFileMessageModalOpen,
        setIsFileMessageModalOpen,
        messageFile,
        setMessageFile,
        editMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
