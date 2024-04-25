'use client'
import { feed } from "@/context/FeedContext"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navigation = [
  { name: "Feed", link: "/feed" },
  { name: "Videos", link: "/videos" },
  { name: "Vibes", link: "/vibes" },
  { name: "Thoughts", link: "/thoughts" },
  { name: "Images", link: "/images" },
  { name: "Explore", link: "/explore" },
  { name: "Profile", link: "/profile" }
]

const FeedFilter = (props) => {

  const [filter, setFilter] = useState(null)
  const { getPosts } = feed()
  const pathname = usePathname()

  useEffect(() => {
    const name = pathname.split('/')?.at(-1)
    if (name === 'feed') setFilter(undefined)
    if (name === 'images') setFilter('image')
    if (name === 'videos') setFilter('video')
    if (name === 'thoughts') setFilter('thought')
    if (name === 'vibes') setFilter('vibe')
    if (name === 'explore' || name === 'profile') setFilter(null)
  }, [pathname])

  useEffect(() => {
    if (typeof filter !== 'object')
      getPosts(filter)
  }, [filter])

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