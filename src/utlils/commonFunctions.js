import copy from "copy-to-clipboard"
import { setCookie } from "./cookies"
import { MessageBox } from "@/components/MessageBox"

export const setUserCookies = (user) => {
  setCookie('token', user.token)
  setCookie('name', user.name)
  setCookie('profilePic', user.profile_picture)
  setCookie("userid", user._id)
}

export const getShortEmail = (email) => {
  if (!email) return ''
  return email.substr(0, 2) + "****" + email.substr(email.indexOf("@"))
}

export const getShortPhone = (phone, coutryCode) => {
  if (!phone) return ''
  if (coutryCode) return coutryCode + " " + "****" + phone.substr(-4)
  else return "****" + phone.substr(-4)
}

export const getShortUsername = (username) => {
  if (!username) return ''
  if (username.length > 10) return `${username.substring(0, 9)}...`
  return username
}

export const getImageSource = (image) => {
  if (!image) return '/assets/imgs/default_profile.svg'
  if (typeof image === "string" && (image.startsWith("http") || image.startsWith("https")))
    return image
  else if (image instanceof Blob) {
    const blobUrl = URL.createObjectURL(image)
    return blobUrl
  }
}

export const copyValue = (value) => {
  if (value) {
    copy(value)
    MessageBox("success", "Copied to clipboard")
  }
}

export const isContainRestrictedKeywords = (value) => {
  if (!value) return false
  if (
    value.toLowerCase().includes('colombo') ||
    value.toLowerCase().replace(/[_\.\-\d\s]/g, '').includes('colombo') ||
    value.toLowerCase().includes('admin') ||
    value.toLowerCase().replace(/[_\.\-\d\s]/g, '').includes('admin')
  ) return true
  else return false
}

export const formatTimeAgo = (time) => {
  if (!time) return ''

  const currentDate = new Date()
  const inputDate = new Date(time)
  const timeDifference = currentDate.getTime() - inputDate.getTime()

  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24

  if (timeDifference < minute) {
    return "Just now"
  } else if (timeDifference < hour) {
    const minutes = Math.floor(timeDifference / minute)
    return `${minutes} m ago`
  } else if (timeDifference < day) {
    const hours = Math.floor(timeDifference / hour)
    return `${hours} h ago`
  } else {
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getFullYear()}`
    return formattedDate
  }
}

