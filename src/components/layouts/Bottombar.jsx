"use client";

import {
  FeedIcon,
  GenAiIcon,
  NewsIcon,
  ShopIcon,
  TaskBotIcon,
} from "../../components/Icons";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Bottombar = () => {
  const pathname = usePathname();

  const feedSections = [
    "/feed",
    "/video",
    "/vibes",
    "/thoughts",
    "/images",
    "/explore",
    "/profile",
  ];

  return (
    <div className=" md:hidden bg-white sticky bottom-0 z-50 border-t-2 border-brandprimary rounded-xl">
      <div className="shadow-[0px_2px_4px_0px_#0000001A]">
        <div className="py-4 flex flex-wrap items-center justify-evenly">
          <Link href="/gen-search">
            <div className="sm:mx-2 md:mx-4">
              <div className="w-[29px] mx-auto">
                <GenAiIcon
                  w="30"
                  h="30"
                  fill={pathname === "/gen-search" ? "#1E71F2" : "#8E8E93"}
                />
              </div>
              <p
                className={`${pathname === "/gen-search"
                    ? "text-brandprimary"
                    : "text-sidebaricon"
                  } text-center text-[14px] mt-3 font-sans`}
              >
                Gen AI
              </p>
            </div>
          </Link>

          <Link href="/task-bot">
            <div className="sm:mx-2 md:mx-4">
              <div className="w-[29px] mx-auto">
                <TaskBotIcon
                  w="30"
                  h="30"
                  fill={pathname === "/task-bot" ? "#1E71F2" : "#8E8E93"}
                />
              </div>
              <p
                className={`${pathname === "/task-bot"
                    ? "text-brandprimary"
                    : "text-sidebaricon"
                  } text-center text-[14px] mt-3 font-sans`}
              >
                Task bot
              </p>
            </div>
          </Link>

          <Link href="/feed">
            <div className="sm:mx-2 md:mx-4 ">
              <div className="w-[29px] mx-auto">
                <FeedIcon
                  w="30"
                  h="30"
                  fill={
                    feedSections.includes(`${pathname}`) ? "#1E71F2" : "#8E8E93"
                  }
                />
              </div>
              <p
                className={`${feedSections.includes(`${pathname}`)
                    ? "text-brandprimary"
                    : "text-sidebaricon"
                  } text-center text-[14px] mt-3 font-sans`}
              >
                Feed
              </p>
            </div>
          </Link>

          <Link href="/shop">
            <div className="sm:mx-2 md:mx-4">
              <div className="w-[29px] mx-auto">
                <ShopIcon
                  w="30"
                  h="30"
                  fill={pathname === "/shop" ? "#1E71F2" : "#8E8E93"}
                />
              </div>
              <p
                className={`${pathname === "/shop"
                    ? "text-brandprimary"
                    : "text-sidebaricon"
                  } text-center text-[14px] mt-3 font-sans`}
              >
                Shop
              </p>
            </div>
          </Link>

          <Link href="/news">
            <div className="sm:mx-2 md:mx-4">
              <div className="w-[29px] mx-auto">
                <NewsIcon
                  w="30"
                  h="30"
                  fill={pathname === "/news" ? "#1E71F2" : "#8E8E93"}
                />
              </div>
              <p
                className={`${pathname === "/news"
                    ? "text-brandprimary"
                    : "text-sidebaricon"
                  } text-center text-[14px] mt-3 font-sans`}
              >
                News
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
