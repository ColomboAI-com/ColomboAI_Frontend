'use client'

import React, { useEffect, useState, useContext, useRef } from 'react';
import { FeedContext } from '../../context/FeedContext';
import Link from 'next/link';

const SearchProfile = () => {
    const { searchUsers, topUsers, topUsersDetails, searchUsersDetails } = useContext(FeedContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchListOpen, setSearchListOpen] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [baseURL, setBaseURL] = useState('')
    const searchRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setBaseURL(new URL(window.location.href).origin)
        }
    }, [])

    const handleSearch = async () => {
        try {
            await searchUsers(searchQuery);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (searchQuery.trim() !== '') {
                handleSearch();
                setShowSearchResults(true);
            } else {
                setShowSearchResults(false);
            }
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [searchQuery]);

    useEffect(() => {
        topUsers();
    }, []);

    const handleFocus = () => {
        setSearchListOpen(true);
    };

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSearchListOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const displayData = showSearchResults ? searchUsersDetails : topUsersDetails;
    return (
        <div ref={searchRef} className="relative py-7">
            <div className="relative flex items-center w-full">
                <svg className="absolute ml-4 fill-brandprimary" width="24" height="24" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M21.2878 3.6665C11.5559 3.6665 3.66669 11.3815 3.66669 20.8985C3.66669 30.4154 11.5559 38.1305 21.2878 38.1305C25.4501 38.1305 29.2754 36.7192 32.2905 34.3593L38.0179 39.9457L38.1703 40.074C38.7021 40.4588 39.456 40.415 39.9371 39.9432C40.4664 39.4243 40.4653 38.584 39.9346 38.0665L34.2745 32.5457C37.1524 29.4787 38.909 25.3892 38.909 20.8985C38.909 11.3815 31.0197 3.6665 21.2878 3.6665ZM21.2878 6.32069C29.5208 6.32069 36.1949 12.8474 36.1949 20.8985C36.1949 28.9496 29.5208 35.4763 21.2878 35.4763C13.0549 35.4763 6.38081 28.9496 6.38081 20.8985C6.38081 12.8474 13.0549 6.32069 21.2878 6.32069Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search Profile"
                    aria-label="Search Profile"
                    className="pl-12 pr-4 py-2 w-full border-[1px] border-brandprimary rounded-[50px] text-[#ACACAC] text-[20px] tracking-[4px] font-sans focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={handleFocus}
                />
            </div>
            {searchListOpen && (
                <div className="max-h-[11rem] no-scrollbar overflow-y-scroll border-[1px] ml-8 mr-8 bg-white right-0 shadow left-0 rounded-t-[0px] rounded-b-[20px]">
                    {displayData.length > 0 ? (
                        displayData.map((val) => (
                            <React.Fragment key={val.user_name}>
                                <hr />
                                <Link href={`${baseURL}/profile/${val.user_name}`} target="_blank">
                                    <div className="flex items-center justify-between px-[16px] py-[3px]">
                                        <div className="flex items-center">
                                            <img
                                                src={val.profile_picture}
                                                alt="suggested_image"
                                                className="rounded-full w-[30px] h-[30px] mr-3"
                                            />
                                            <div>
                                                <a className='text-[14px] font-sans font-[600]'>@{val.user_name}</a>
                                                <p className="font-sans text-sidebarlabel text-[12px] text-[#8B8B8B]">{val.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </React.Fragment>
                        ))
                    ) : (
                        <p className="px-[16px] py-[15px] text-center text-[#8B8B8B]">No Data Found</p>
                    )}
                </div>
            )}

        </div>
    );
}

export default SearchProfile;
