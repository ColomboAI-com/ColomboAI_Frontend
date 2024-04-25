import React from 'react'

export default function ProfilePicture({ image = '/images/home/avtar-img.png', size = 42, className }) {
  return (
    <img
      src={image}
      alt="avatar"
      className={`w-[${size}px] rounded-full${className ? ` ${className}` : ''}`}
    />
  )
}
