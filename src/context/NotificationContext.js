"use client";
import { ROOT_URL_NOTIFICATION } from "@/utlils/rootURL";
import { getCookie } from "cookies-next";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const NotificationsContext = createContext();

export default function NotificationsContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const socketRef = useRef(null); // this is where the reference to the socket will be stored

  useEffect(() => {
    socketRef.current = new WebSocket(
      `${ROOT_URL_NOTIFICATION}?token=${encodeURIComponent(getCookie("token"))}`
    );

    socketRef.current.onopen = () => {
      console.log("WebSocket connection established");
      authenticateConnection();
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "confirmAuthentication":
          confirmAuthentication(data.payload);
          break;
        case "recentNotifications":
          loadRecentNotifications(data.payload);
          break;
        case "markedNotificationAsRead":
          markedNotificationAsReadConfirmation(data.payload);
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

  // SENDING FROM CLIENT TO SERVER
  const authenticateConnection = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: getCookie("token"),
        type: "authenticateConnection",
        payload: {},
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const fetchRecentNotifications = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: getCookie("token"),
        type: "fetchRecentNotifications",
        payload: {},
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  const markNotificationAsRead = (notification) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message = {
        token: getCookie("token"),
        type: "markNotificationAsRead",
        payload: { notificationId: notification._id },
      };
      socketRef.current.send(JSON.stringify(message));
    }
  };

  // RECEIVING FROM SERVER TO CLIENT
  const confirmAuthentication = (payload) => {
    console.log(payload.message);
    fetchRecentNotifications();
  };

  const loadRecentNotifications = (payloadNotifications) => {
    console.log(payloadNotifications);
    setNotifications(payloadNotifications);
  };

  const markedNotificationAsReadConfirmation = (payloadNotification) => {
    console.log(payloadNotification);

    if (!payloadNotification) return;

    setNotifications((prevNotifications) => {
      const updatedNotifications = prevNotifications.map((notification) => {
        return notification._id === payloadNotification._id
          ? { ...notification, wasRead: payloadNotification.wasRead }
          : notification;
      });
      return updatedNotifications;
    });
  };

  console.log("notification", notifications);
  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export const useNotifications = () => {
  return useContext(NotificationsContext);
};
