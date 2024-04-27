import React from 'react'

export default function ProfilePicture({ image = '/images/home/avtar-img.png', size = 42, className }) {
  return (
    <img
      src={image}
      alt="avatar"
      className={`rounded-full${className ? ` ${className}` : ''}`}
      height={size}
      width={size}
    />
  )
}
