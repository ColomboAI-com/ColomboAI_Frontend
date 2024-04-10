import { isContainRestrictedKeywords } from "./commonFunctions"
import { EMAIL_REGEX, MIN_USERNAME_LENGTH, NAME_REGEX, PHONE_REGEX, USERNAME_REGEX } from "./constant"

export const isValidUserName = (username) => {
    if (!username) return false
    if (username.length < MIN_USERNAME_LENGTH) return false
    if (!USERNAME_REGEX.test(username)) return false
    if (isContainRestrictedKeywords(username)) return false
    return true
}

export const isValidName = (name) => {
    if (!name) return false
    if (!NAME_REGEX.test(name)) return false
    if (isContainRestrictedKeywords(name)) return false
    return true
}

export const isValidPhone = (phone) => {
    if (!phone) return false
    if (!PHONE_REGEX.test(phone)) return false
    return true
}

export const isValidEmail = (email) => {
    if (!email) return false
    if (!EMAIL_REGEX.test(email)) return false
    return true
}