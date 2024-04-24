'use client'

import { feed } from "@/context/FeedContext"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const navigation = [
  { name: "Feed", link: "/feed" },
  { name: "Video", link: "/video" },
  { name: "Vibes", link: "/vibes" },
  { name: "Thoughts", link: "/thoughts" },
  { name: "Images", link: "/images" },
  { name: "Explore", link: "/explore" },
  { name: "Profile", link: "/profile" },
]

const FeedFilter = (props) => {

  const { getPosts, posts } = feed()
  const pathname = usePathname()

  useEffect(() => {
    const filter = pathname.split('/')?.at(-1)
    if (filter !== 'explore' || filter !== 'profile')
      getPosts(filter)
  }, [pathname])

  console.log(posts)

  return (
    <div {...props}>
      {navigation.map((nav, index) => (
        <span key={index}>
          <Link
            href={nav.link}
            className={`text-[20px] ${pathname === nav.link ? "text-brandprimary" : "text-sidebaricon"} hover:text-brandprimary font-sans`}
          >
            {nav.name}
          </Link>
        </span>
      ))}
    </div>
  )
}

export default FeedFilter