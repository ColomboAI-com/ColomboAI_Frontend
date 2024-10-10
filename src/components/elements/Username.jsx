import React from 'react'

export default function Username({ username = 'username', className = 'pl-[17px]', color ="text-[#242424]"}) {
  return (
    <p className={ `text-[14px] font-sans font-[700] ${color} pl-[12px]`}>{username}</p>
  )
}
