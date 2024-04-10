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
  if (typeof image == "string" && (image.startsWith("http") || image.startsWith("https")))
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