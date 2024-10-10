"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { DotsVerticalIcon } from '@heroicons/react/solid';
import { Delete } from "lucide-react";
import { VibeContext } from "@/context/VibeContext";

const ThreeDotMenuViewOthers = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { vibes, getVibes, deleteVibe } = useContext(VibeContext);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSave = () => {
        console.log("Handling save.");
    };

    const handleUnfollow = () => {
        console.log("Handling unfollow.");
    };

    const handleHide = () => {
        console.log("Handling hide.");
    };

    const handleWhyAreYouSeeingThis = () => {
        console.log("Handling why are you seeing this.");
    };

    const handleAboutThisAccount = () => {
        console.log("Handling about this account.");
    };

    const handleReport = () => {
        console.log("Handling report.");
    };

    const handleDelete = () => {
        console.log("Handling delete.");
        // Using the first vibe in the array for testing purposes
        const vibeId = vibes[0]._id;
        deleteVibe(vibeId);
    };

    const menuItems = [
        { icon: "M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z", label: "Save" },
        { icon: "M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6", label: "Unfollow" },
        { icon: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21", label: "Hide" },
        { icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Why are you seeing this" },
        { icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "About this account" },
        { icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9", label: "Report", className: "text-red-500" },
        { icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9", label: "Delete", className: "text-red-500" },
    ];

    const handleFunctions = {
        Save: handleSave,
        Unfollow: handleUnfollow,
        Hide: handleHide,
        "Why are you seeing this": handleWhyAreYouSeeingThis,
        "About this account": handleAboutThisAccount,
        Report: handleReport,
        Delete: handleDelete,
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                aria-label="More options"
            >
                <DotsVerticalIcon className="h-10 w-10 text-gray-600" />
            </button>
            {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${item.className || 'text-gray-700'}`}
                            onClick={() => handleFunctions[item.label]()}
                        >
                            <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                            </svg>
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThreeDotMenuViewOthers;
