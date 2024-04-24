import React from 'react'

export default function Username({ username = 'username', className = 'pl-[17px]' }) {
  return (
    <p className={className}>{username}</p>
  )
}
