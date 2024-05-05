export const ROOT_URL_AUTH = 'https://userservice-dot-fair-myth-398920.uc.r.appspot.com'
export const ROOT_URL_FEED = 'https://feedservice-dot-fair-myth-398920.uc.r.appspot.com'
export const ROOT_URL_MESSAGES = 'https://messageservice-dot-fair-myth-398920.uc.r.appspot.com'
export const ROOT_URL_LLM = 'https://llmapi.colomboai.com'

export const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 365),
  sameSite: 'strict',
  secure: true,
  domain: '.colomboai.com'
}