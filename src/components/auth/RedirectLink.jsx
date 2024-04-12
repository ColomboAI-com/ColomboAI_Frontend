import Link from 'next/link'

export default function RedirectLink({ title, href = '', linkName }) {
  return (
    <div className="my-3 text-center">
      <p className="text-lg">
        {title}
        <Link href={href} className='text-brandprimary focus:text-brandprimary'>
          &nbsp;{linkName}
        </Link>
      </p>
    </div>
  )
}
