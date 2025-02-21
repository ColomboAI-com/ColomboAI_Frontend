"use client";
import React, { useState, useRef, useEffect, useContext } from "react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Delete } from "lucide-react";
import { VibeContext } from "@/context/VibeContext";
import { UserProfileContext } from "@/context/UserProfileContext";
import { getCookie } from "@/utlils/cookies";
import UserProfile from "../profile/Profile.jsx";
import horizontal_dots from "../../../public/images/icons/horizontal_dots.svg";
import Image from "next/image.js";

const ThreeDotMenuViewOthersHorizontal = ({ vibe }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { vibes, deleteVibe, saveVibe } = useContext(VibeContext);
  const { userDetails } = useContext(UserProfileContext);
  const [name, Setname] = useState();
  const [isUserCreator, setIsUserCreator] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { icon: "M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z", label: "Save" },
    {
      icon: "M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6",
      label: "Unfollow",
    },
    {
      icon: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21",
      label: "Hide",
    },
    {
      icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      label: "Why are you seeing this",
    },
    {
      icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      label: "About this account",
    },
    {
      icon: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
      label: "Report",
      className: "text-red-500",
    },
  ]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    console.log(getCookie("username") === vibe.creator.user_name);
    setIsUserCreator(getCookie("username") === vibe.creator.user_name);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async () => {
    try {
      let response = await saveVibe(vibe._id);
      if (response.success) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
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

  const handleRepost = () => {};
  const handleDelete = () => {
    console.log("Handling delete.");
    // Using the first vibe in the array for testing purposes

    deleteVibe(vibe._id);
  };

  useEffect(() => {
    if (isUserCreator) {
      setMenuItems((prev) =>
        prev.some((item) => item.label === "Delete")
          ? prev
          : [
              ...prev,
              {
                icon: "M18.7985 3.33825H14.7802V2.50369C14.7802 1.83967 14.5262 1.20285 14.0741 0.733313C13.6219 0.263781 13.0087 0 12.3692 0H7.54733C6.9079 0 6.29467 0.263781 5.84252 0.733313C5.39038 1.20285 5.13637 1.83967 5.13637 2.50369V3.33825H1.11811C0.904964 3.33825 0.700552 3.42618 0.549838 3.58269C0.399124 3.7392 0.314453 3.95147 0.314453 4.17281C0.314453 4.39415 0.399124 4.60643 0.549838 4.76294C0.700552 4.91945 0.904964 5.00738 1.11811 5.00738H1.92176V20.0295C1.92176 20.4722 2.0911 20.8967 2.39253 21.2098C2.69396 21.5228 3.10278 21.6986 3.52907 21.6986H16.3875C16.8138 21.6986 17.2226 21.5228 17.524 21.2098C17.8255 20.8967 17.9948 20.4722 17.9948 20.0295V5.00738H18.7985C19.0116 5.00738 19.216 4.91945 19.3667 4.76294C19.5175 4.60643 19.6021 4.39415 19.6021 4.17281C19.6021 3.95147 19.5175 3.7392 19.3667 3.58269C19.216 3.42618 19.0116 3.33825 18.7985 3.33825ZM6.74368 2.50369C6.74368 2.28235 6.82835 2.07007 6.97906 1.91356C7.12978 1.75705 7.33419 1.66913 7.54733 1.66913H12.3692C12.5824 1.66913 12.7868 1.75705 12.9375 1.91356C13.0882 2.07007 13.1729 2.28235 13.1729 2.50369V3.33825H6.74368V2.50369ZM16.3875 20.0295H3.52907V5.00738H16.3875V20.0295ZM8.35098 9.18019V15.8567C8.35098 16.078 8.26631 16.2903 8.1156 16.4468C7.96488 16.6033 7.76047 16.6913 7.54733 16.6913C7.33419 16.6913 7.12978 16.6033 6.97906 16.4468C6.82835 16.2903 6.74368 16.078 6.74368 15.8567V9.18019C6.74368 8.95885 6.82835 8.74658 6.97906 8.59006C7.12978 8.43355 7.33419 8.34563 7.54733 8.34563C7.76047 8.34563 7.96488 8.43355 8.1156 8.59006C8.26631 8.74658 8.35098 8.95885 8.35098 9.18019ZM13.1729 9.18019V15.8567C13.1729 16.078 13.0882 16.2903 12.9375 16.4468C12.7868 16.6033 12.5824 16.6913 12.3692 16.6913C12.1561 16.6913 11.9517 16.6033 11.801 16.4468C11.6503 16.2903 11.5656 16.078 11.5656 15.8567V9.18019C11.5656 8.95885 11.6503 8.74658 11.801 8.59006C11.9517 8.43355 12.1561 8.34563 12.3692 8.34563C12.5824 8.34563 12.7868 8.43355 12.9375 8.59006C13.0882 8.74658 13.1729 8.95885 13.1729 9.18019Z",
                label: "Delete",
                className: "text-red-500",
              },
            ]
      );
    }
  }, [isUserCreator]);

  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);

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
    <div className="relative flex justify-center items-center" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="pb-2 rounded-full  focus:outline-none"
        aria-label="More options"
      >
        <Image src={horizontal_dots} alt="colombo" />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-10">
          {menuItems.map((item, index) => (
            <React.Fragment>
              <button
                key={index}
                className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                  item.className || "text-gray-700"
                }`}
                onClick={() => handleFunctions[item.label]()}
              >
                <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenuViewOthersHorizontal;
