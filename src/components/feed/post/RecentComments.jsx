import Link from "next/link"

export default function RecentComments({ comments }) {
  if (!comments?.length) return null
  return (
    <div className="mt-[16px]">
      {
        comments?.map((i, index) =>
          <div className="flex column gap-2 mt-2" key={index}>
            <Link
              className="text-[#333333] tex-[16px] font-sans font-[700]"
              href={`/profile/${i?.creator?.user_name || ''}`}
              target="_blank"
            >
              {i?.creator?.user_name}
            </Link>
            <p className="text-[#515151] tex-[16px] font-sans font-[450]">
              {i.content}
            </p>
          </div>
        )
      }
    </div>
  )
}
