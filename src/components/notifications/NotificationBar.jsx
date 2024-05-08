"use client";
import { useState, useEffect } from 'react';
import ActivitiesList from './ActivitiesList';
import { MentionsList } from './MentionsList';
import { NoticesList } from './NoticesList';
import { IoSettingsOutline } from 'react-icons/io5';
import { handleError } from '@/utlils/handleError';
import { getCookie } from '@/utlils/cookies';
import axios from 'axios';
import { ROOT_URL_NOTIFICATION } from '@/utlils/rootURL';
import { getMessaging, onMessage } from 'firebase/messaging';

export default function NotificationBar() {
    const [activeTab, setActiveTab] = useState('activities');
    const [notifications, setNotifications] = useState([]);

    const tabClass = (tabName) => {
        let baseClasses = "flex-1 text-center py-2 cursor-pointer transition duration-300 ease-in-out";
        if (activeTab === tabName) {
            return `${baseClasses} underline text-brandprimary underline`;
        } else {
            return `${baseClasses} text-brandplaceholder no-underline `;
        }
    };

    const TestNotification = async (title, body) => {
        try {
            const res = await axios.post(
                `${ROOT_URL_NOTIFICATION}/test_send_notification`,
                { notification_title: title, notification_body: body },
                {
                    headers: {
                        Authorization: getCookie('token')
                    }
                }
            );
            return res.data;
        } catch (err) {
            handleError(err);
            throw err;
        }
    };

    useEffect(() => {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
            console.log('Message received. ', payload);
            setNotifications((prevNotifications) => [...prevNotifications, payload]);
        });
        TestNotification(); 
    }, []);

    return (
        <div className="rounded-lg p-4 fixed z-50 bg-white w-[350px]">
            <div className="flex justify-between items-center mb-4">
                <p className="text-3xl">Notifications</p>
                <button onClick={() => TestNotification("Test Notification", "This is a test notification")} className='bg-gray-200 p-1 rounded-md cursor-pointer'>Test</button>
                <IoSettingsOutline className="text-xl cursor-pointer text-sidebaricon" />
            </div>
            <div className="flex justify-between">
                <button className={tabClass('activities')} onClick={() => setActiveTab('activities')}>Activities</button>
                {/* <button className={tabClass('mentions')} onClick={() => setActiveTab('mentions')}>Mentions</button>
                <button className={tabClass('notices')} onClick={() => setActiveTab('notices')}>Notices</button> */}
            </div>
            <div>
                {activeTab === 'activities' && <ActivitiesList notifications={notifications} />}
                {/* {activeTab === 'mentions' && <MentionsList notifications={notifications} />}
                {activeTab === 'notices' && <NoticesList notifications={notifications} />} */}
            </div>
        </div>
    );
}
