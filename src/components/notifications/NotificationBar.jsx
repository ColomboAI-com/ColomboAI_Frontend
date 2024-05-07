"use client";
import { useState } from 'react';
import ActivitiesList from './ActivitiesList';
import { MentionsList } from './MentionsList';
import { NoticesList } from './NoticesList';
import { IoSettingsOutline } from 'react-icons/io5';

export default function NotificationBar() {
    const [activeTab, setActiveTab] = useState('activities');

    const tabClass = (tabName) => {
        let baseClasses = "flex-1 text-center py-2 cursor-pointer transition duration-300 ease-in-out";
        if (activeTab === tabName) {
            return `${baseClasses} underline text-brandprimary underline`;
        } else {
            return `${baseClasses} text-brandplaceholder no-underline `;
        }
    };

    return (
        <div className="rounded-lg p-4 w-95 fixed z-50 w-[350px] h-[100px] bg-white">
            <div className="flex justify-between items-center mb-4">
                <p className="text-3xl">Notifications</p>
                <IoSettingsOutline className="text-xl cursor-pointer text-sidebaricon" />
            </div>
            <div className="flex justify-between">
                <button
                    className={tabClass('activities')}
                    onClick={() => setActiveTab('activities')}
                >
                    Activities
                </button>
                <button
                    className={tabClass('mentions')}
                    onClick={() => setActiveTab('mentions')}
                >
                    Mentions
                </button>
                <button
                    className={tabClass('notices')}
                    onClick={() => setActiveTab('notices')}
                >
                    Notices
                </button>
            </div>
            <div className="py-4">
                {activeTab === 'activities' && <ActivitiesList/>}
                {activeTab === 'mentions' && <MentionsList/>}
                {activeTab === 'notices' && <NoticesList/>}
            </div>
        </div>
    );
}
