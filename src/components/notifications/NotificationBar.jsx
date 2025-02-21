import { useNotifications } from "@/context/NotificationContext";
import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

const NotificationBar = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Activities");
  const { notifications, markNotificationAsRead, fetchRecentNotifications } = useNotifications();
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const containerStyle = {
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "0",
    backgroundColor: "#ffffff",
  };

  const headerStyle = {
    padding: "16px",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: "0",
    backgroundColor: "#ffffff",
    zIndex: "10",
  };

  const tabButtonStyle = (isActive) => ({
    padding: "8px 16px",
    fontWeight: isActive ? "bold" : "normal",
    cursor: "pointer",
    borderBottom: isActive ? "2px solid #3b82f6" : "none",
    color: isActive ? "#3b82f6" : "#4b5563",
  });

  const notificationListStyle = {
    maxHeight: "300px",
    overflowY: "auto",
    padding: "16px",
  };

  const handleFollowBack = (username) => {
    console.log(`Follow Back ${username}`);
    // Implement follow back functionality here
  };

  const markUnreadNotifications = async (notifications) => {
    for (let notification of notifications) {
      await markNotificationAsRead(notification);
    }
  };

  useEffect(() => {
    fetchRecentNotifications();
  }, []);

  useEffect(() => {
    const unreadNotificationList = notifications?.filter((notification) => !notification.wasRead);
    setUnreadNotifications(unreadNotificationList);
    return () => setUnreadNotifications([]);
  }, [notifications]);

  useEffect(() => {
    setTimeout(() => {
      markUnreadNotifications(unreadNotifications);
    }, 3000);
  }, [unreadNotifications]);

  return (
    <div
      style={containerStyle}
      className="fixed top-[78px] left-[72px] z-[999] h-[calc(100vh-78px)] w-[350px]"
    >
      {/* Sticky Header */}
      <div style={headerStyle} className="header">
        <div className="flex justify-between items-center">
          <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Notifications</h2>
          <button 
            className="text-base text-[#8B8B8B]"
            style={{ fontsize: '24px', marginLeft: '0px' }}
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <button
            style={tabButtonStyle(activeTab === "Activities")}
            onClick={() => setActiveTab("Activities")}
          >
            Activities
          </button>
          <button style={tabButtonStyle(activeTab === "mentions")} onClick={() => setActiveTab("mentions")}>
            Mentions
          </button>
          <button style={tabButtonStyle(activeTab === "notices")} onClick={() => setActiveTab("notices")}>
            Notices
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div style={notificationListStyle}>
        <ul>
          {notifications?.length === 0 && (
            <div className="text-sm flex justify-center items-center text-[#8B8B8B] font-medium pt-8">
              No notifications
            </div>
          )}
          {notifications?.map((notification) => (
            <li key={notification.id} style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="text-sm text-[#8B8B8B] ">
                  <p>{notification.content}</p>
                  <span>{formatDistanceToNow(new Date(notification.createdAt))}</span>
                </div>
                {/* Conditionally render follow back button */}
                {notification.action === "started following you" && (
                  <button
                    onClick={() => handleFollowBack(notification.username)}
                    style={{
                      padding: "4px 8px",
                      cursor: "pointer",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      borderRadius: "4px",
                      border: "none",
                    }}
                  >
                    Follow Back
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default NotificationBar;
