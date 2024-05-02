import React from 'react'

export default function Username({ username = 'username', className = 'pl-[17px]' }) {
  return (
    <p className="text-[18px] font-sans font-[700] text-[#242424] pl-[17px]">{username}</p>
  )
}
