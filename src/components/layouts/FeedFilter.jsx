'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

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

  const pathname = usePathname()

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