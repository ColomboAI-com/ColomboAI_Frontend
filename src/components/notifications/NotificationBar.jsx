// "use client";
// import { useState, useEffect } from 'react';
// import ActivitiesList from './ActivitiesList';
// import { MentionsList } from './MentionsList';
// import { NoticesList } from './NoticesList';
// import { IoSettingsOutline } from 'react-icons/io5';
// import { handleError } from '@/utlils/handleError';
// import { getCookie } from '@/utlils/cookies';
// import axios from 'axios';
// import { ROOT_URL_NOTIFICATION } from '@/utlils/rootURL';
// import { getMessaging, onMessage } from 'firebase/messaging';

// export default function NotificationBar() {
//     const [activeTab, setActiveTab] = useState('activities');
//     const [notifications, setNotifications] = useState([]);

//     const tabClass = (tabName) => {
//         let baseClasses = "flex-1 text-center py-2 cursor-pointer transition duration-300 ease-in-out";
//         if (activeTab === tabName) {
//             return `${baseClasses} underline text-brandprimary underline`;
//         } else {
//             return `${baseClasses} text-brandplaceholder no-underline `;
//         }
//     };

//     const createNotification = (userId, title, additionalBody) => {
//         return {
//             userId: userId,
//             title: title,
//             token: "",
//             body: {
//                 profile_picture: "https://gerpstorage.s3.us-west-2.amazonaws.com/41896c48538c8c1a3cc7f903d73cf791",
//                 user_name: "Pravin01",
//                 media: "https://gerpstorage.s3.us-west-2.amazonaws.com/840427e1b3f66e526c861386a3f97981.jpeg",
//                 ...additionalBody
//             },
//             message: "",
//             response: "",
//             ondate: new Date().toISOString()
//         };
//     }

//     const TestNotification = async (title, body) => {
//         try {
//             const res = await axios.post(
//                 `${ROOT_URL_NOTIFICATION}/test_send_notification`,
//                 { notification_title: title, notification_body: body },
//                 {
//                     headers: {
//                         Authorization: getCookie('token')
//                     }
//                 }
//             );
//             return res.data;
//         } catch (err) {
//             handleError(err);
//             throw err;
//         }
//     };

//     useEffect(() => {
//         const messaging = getMessaging();
//         onMessage(messaging, (payload) => {
//             console.log('Message received. ', payload);
//             setNotifications((prevNotifications) => [...prevNotifications, payload]);
//         });
//         TestNotification(); 
//     }, []);

//     return (
//         <div className="rounded-lg p-4 fixed z-50 bg-white w-[350px]">
//             <div className="flex justify-between items-center mb-4">
//                 <p className="text-3xl">Notifications</p>
//                 <button onClick={() => TestNotification("Test Notification", "This is a test notification")} className='bg-gray-200 p-1 rounded-md cursor-pointer'>Test</button>
//                 <IoSettingsOutline className="text-xl cursor-pointer text-sidebaricon" />
//             </div>
//             <div className="flex justify-between">
//                 <button className={tabClass('activities')} onClick={() => setActiveTab('activities')}>Activities</button>
//                 {/* <button className={tabClass('mentions')} onClick={() => setActiveTab('mentions')}>Mentions</button>
//                 <button className={tabClass('notices')} onClick={() => setActiveTab('notices')}>Notices</button> */}
//             </div>
//             <div>
//                 {activeTab === 'activities' && <ActivitiesList notifications={notifications} />}
//                 {/* {activeTab === 'mentions' && <MentionsList notifications={notifications} />}
//                 {activeTab === 'notices' && <NoticesList notifications={notifications} />} */}
//             </div>
//         </div>
//     );
// }









import React, { useState } from 'react';
// import './NotificationComponent.css'; // Assuming you have this file for additional styling

const NotificationBar = () => {
  const [activeTab, setActiveTab] = useState('mentions');

  // Generate unique IDs for each notification item
  const generateUniqueId = () => `id-${Math.random().toString(36).substr(2, 9)}`;

  const [notifications, setNotifications] = useState({
    Activities: [
        { id: generateUniqueId(), username: 'johnDoe', action: 'liked your post', time: '1h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'commented on your post', time: '2h' },
        { id: generateUniqueId(), username: 'johnDoe', action: 'liked your post', time: '1h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'commented on your post', time: '2h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'started following you', time: '2h' },
        { id: generateUniqueId(), username: 'johnDoe', action: 'started following you', time: '1h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'started following you', time: '2h' },
        { id: generateUniqueId(), username: 'johnDoe', action: 'liked your post', time: '1h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'commented on your post', time: '2h' },
        { id: generateUniqueId(), username: 'janeDoe', action: 'commented on your post', time: '2h' },
    ],
    mentions: [
     
      { id: generateUniqueId(), username: 'johnDoe', action: 'mentioned you in a post', time: '1h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'mentioned you in a comment', time: '2h' },
      { id: generateUniqueId(), username: 'johnDoe', action: 'mentioned you in a post', time: '1h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'mentioned you in a comment', time: '2h' },
      { id: generateUniqueId(), username: 'johnDoe', action: 'mentioned you in a post', time: '1h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'mentioned you in a comment', time: '2h' },
      { id: generateUniqueId(), username: 'johnDoe', action: 'mentioned you in a post', time: '1h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'replied on your comment', time: '2h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'tagged in post', time: '2h' },
      { id: generateUniqueId(), username: 'johnDoe', action: 'mentioned you in a post', time: '1h' },
      { id: generateUniqueId(), username: 'janeDoe', action: 'mentioned you in a comment', time: '2h' },

    ],
    notices: [
        { id: generateUniqueId(), username: 'System', action: 'Exciting news! New chat features rolling out soon. Stay tuned for more updates!', time: '1h' },
        { id: generateUniqueId(), username: 'System', action: 'Reminder: App maintenance scheduled for tomorrow at 10 AM GMT. Please plan accordingly. Thank you!', time: '2h' },
        { id: generateUniqueId(), username: 'System', action: 'Have you tried our latest filters? Spice up your post with fun effects now!', time: '3h' },
        { id: generateUniqueId(), username: 'System', action: 'Exciting news! New chat features rolling out soon. Stay tuned for more updates!', time: '4h' },
        { id: generateUniqueId(), username: 'System', action: 'Reminder: App maintenance scheduled for tomorrow at 10 AM GMT. Please plan accordingly. Thank you!', time: '5h' },
        { id: generateUniqueId(), username: 'System', action: 'Have you tried our latest filters? Spice up your post with fun effects now!', time: '6h' },
        { id: generateUniqueId(), username: 'System', action: 'Exciting news! New chat features rolling out soon. Stay tuned for more updates!', time: '7h' },
        { id: generateUniqueId(), username: 'System', action: 'Reminder: App maintenance scheduled for tomorrow at 10 AM GMT. Please plan accordingly. Thank you!', time: '8h' },
      ],
  });

  const containerStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '0',
    backgroundColor: '#ffffff',
  };

  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: '0',
    backgroundColor: '#ffffff',
    zIndex: '10',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '8px 16px',
    fontWeight: isActive ? 'bold' : 'normal',
    cursor: 'pointer',
    borderBottom: isActive ? '2px solid #3b82f6' : 'none',
    color: isActive ? '#3b82f6' : '#4b5563',
  });

  const notificationListStyle = {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '16px',
  };

  const handleFollowBack = (username) => {
    console.log(`Follow Back ${username}`);
    // Implement follow back functionality here
  };

  return (
    <div style={containerStyle}>
      {/* Sticky Header */}
      <div style={headerStyle} className="header">
        <div className="flex justify-between items-center mb-4">
          <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Notifications</h2>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <button
            style={tabButtonStyle(activeTab === 'Activities')}
            onClick={() => setActiveTab('Activities')}
          >
            Activities
          </button>
          <button
            style={tabButtonStyle(activeTab === 'mentions')}
            onClick={() => setActiveTab('mentions')}
          >
            Mentions
          </button>
          <button
            style={tabButtonStyle(activeTab === 'notices')}
            onClick={() => setActiveTab('notices')}
          >
            Notices
          </button>
        </div>
      </div>

      {/* Notification List */}
      <div style={notificationListStyle}>
        <ul>
          {notifications[activeTab].map((notification) => (
            <li key={notification.id} style={{ padding: '12px 0', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`https://via.placeholder.com/40?text=${notification.username}`}
                  alt={notification.username}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px' }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '4px' }}>
                    {notification.username}
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                    {notification.action}
                  </p>
                  <p style={{ fontSize: '10px', color: '#9ca3af' }}>{notification.time}</p>
                </div>
                {/* Conditionally render follow back button */}
                {notification.action === 'started following you' && (
                  <button
                    onClick={() => handleFollowBack(notification.username)}
                    style={{ padding: '4px 8px', cursor: 'pointer', backgroundColor: '#3b82f6', color: '#ffffff', borderRadius: '4px', border: 'none' }}
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
