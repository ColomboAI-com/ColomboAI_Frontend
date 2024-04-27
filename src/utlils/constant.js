export const DISPLAY_DESKTOP = typeof window !== 'undefined' && window.innerWidth > 768
export const DISPLAY_MOBILE = typeof window !== 'undefined' && window.innerWidth <= 768

export const INT_NUMBER_REGEX = /^[0-9]+$|^$/
export const FLOAT_NUMBER_REGEX = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$|^$/
export const STRING_REGEX = /^[a-zA-Z]*$/
export const NAME_REGEX = /^[-a-zA-Z0-9\s._]{0,50}$|^$/
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/
export const PHONE_REGEX = /^[0-9]{10}$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{0,30}$|^$/
export const HASHTAG_REGEX = /#(\w+)/g
export const MENTION_REGEX = /@(\w+)/g

export const RESEND_TIME = 60
export const MIN_USERNAME_LENGTH = 5
