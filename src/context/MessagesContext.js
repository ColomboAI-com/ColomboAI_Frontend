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
    conversations: true,
    history: false,
    sendMsg: false,
  });

  const DUMMY_TEXT = "CyYPvSCUj$Qf_dummy_text";
  const MESSAGE_MAX_LENGTH = 1024;

  const socketRef = useRef(null); // this is where the reference to the socket will be stored

  useEffect(() => {
    const token = getCookie("token");
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGViMzYyM2U2ODQ5NDJhN2JjZGZjZiIsImlhdCI6MTczMzI3MzAxMSwiZXhwIjoxNzY0ODA5MDExfQ.XYK893FAtv_dpY2OyB2XVZpMjW_JQOZ1OMED_NZmkX8";

    // socketRef.current = new WebSocket(`${ROOT_URL_MESSAGES}?token=${token}`);
    socketRef.current = new WebSocket(
      `${ROOT_URL_MESSAGES}?token=${encodeURIComponent(token)}`
    );

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
      setLoadings((prev) => ({
        ...prev,
        conversations: true,
      }));
      let allChats = [...conversations];
      let findChat = allChats.find(
        (e) => e.participants?.[0]?._id == disconnectedUser.userId
      );
      if (findChat?.participants?.[0]?.lastActiveTime) {
        const index = allChats.indexOf(findChat);
        findChat.participants[0].lastActiveTime = disconnectedUser.time;
        allChats[index] = findChat;
      }
      setConversations(allChats);
      setLoadings((prev) => ({
        ...prev,
        conversations: false,
      }));
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
        payload: {
          conversationId: currentConversation._id,
          privateKey: currentConversation.privateKey,
        },
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      let userId = getCookie("userid");
      let recipientId = null;
      for (let p of currentConversation.participants) {
        if (p._id != userId) {
          recipientId = p._id;
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
          img: messageFile,
          recipientPublicKey: currentConversation.publicKey,
        },
      };
      socketRef.current.send(JSON.stringify(message));
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
    setLoadings((prev) => ({
      ...prev,
      conversations: false,
    }));
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
    setChatHistory((prev) => [...prev, payload]);
    setMessageInput("");
    setMessageFile(null);
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
        isFileMessageModalOpen,
        setIsFileMessageModalOpen,
        messageFile,
        setMessageFile,

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
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  return useContext(MessagesContext);
};
