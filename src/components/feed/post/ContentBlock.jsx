import Linkify from 'linkify-react'
import Link from 'next/link'
import { HASHTAG_REGEX, MENTION_REGEX } from '@/utlils/constant'

export default function ContentBlock({ content }) {

  const words = content.split(/(\s+)/)

  return (
    <div className="py-[4px] px-[16px]">
      <p className="text-[#515151] text-[16px] font-sans font-[450]">
        <Linkify options={{ target: '_blank', className: '' }}>
          {
            words.map((i, index) => {
              if (HASHTAG_REGEX.test(i)) {
                return (
                  <span className='text-brandprimary' key={index}>{i}</span>
                )
              } else if (MENTION_REGEX.test(i)) {
                const username = i.substring(1).replace(/[^a-zA-Z0-9_]/g, '')
                return (
                  <Link className='text-brandprimary' href={`/profile/${username}`} target="_blank" key={index}>
                    {i}
                  </Link>
                )
              } else {
                return <span key={index}>{i}</span>
              }
            })
          }
        </Linkify>
      </p>
    </div>
  )
}
