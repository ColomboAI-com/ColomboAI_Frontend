"use client";
import { useState } from 'react';
import { PostsIcon, ThoughtIcon, VideoIcon, BookmarkIcon, TagIcon } from "../Icons";
import { Post } from './Post';
import { Thought } from './Thought';
import { Video } from './Video';
import { Bookmark } from './Bookmark';
import { Tag } from './Tag';

const IconButton = ({ icon: IconComponent, label, onClick }) => (
  <div className="mx-4" onClick={onClick} role="button" tabIndex="0" aria-label={label} onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick();
    }
  }}>
    <div className="w-[29px] mx-auto">
      <IconComponent />
    </div>
  </div>
);

const Navigation = () => {
    const [activeTab, setActiveTab] = useState('post');

    const renderComponent = () => {
        switch (activeTab) {
            case 'post':
                return <Post/>;
            case 'thought':
                return <Thought/>;
            case 'video':
                return <Video/>;
            case 'bookmark':
                return <Bookmark/>;
            case 'tags':
                return <Tag/>;
        }
    };

    return (
        <div className="bg-white mt-3">
            <div className="py-4 flex flex-wrap items-center justify-evenly">
                <IconButton icon={PostsIcon} label="Posts" onClick={() => setActiveTab('post')} />
                <IconButton icon={ThoughtIcon} label="Thoughts" onClick={() => setActiveTab('thought')} />
                <IconButton icon={VideoIcon} label="Videos" onClick={() => setActiveTab('video')} />
                <IconButton icon={BookmarkIcon} label="Bookmarks" onClick={() => setActiveTab('bookmark')} />
                <IconButton icon={TagIcon} label="Tags" onClick={() => setActiveTab('tags')} />
            </div>
            {renderComponent()}
        </div>
    );
}

export default Navigation;
