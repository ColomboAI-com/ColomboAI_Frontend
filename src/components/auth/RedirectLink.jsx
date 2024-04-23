import Link from 'next/link'

export default function RedirectLink({ title, href = '', linkName }) {
  return (
    <div className="my-3 text-center">
      <p className="text-lg text-[#606060] font-sans font-[450]">
        {title}
        <Link href={href} className='text-brandprimary focus:text-brandprimary text-[16px] font-sans'>
          &nbsp;<span className='text-[#1E71F2] text-[16px]'>{linkName}</span>
        </Link>
      </p>
    </div>
  )
}
