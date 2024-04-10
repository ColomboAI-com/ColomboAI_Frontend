import { setCookie as set, getCookie as get, deleteCookie, getCookies, hasCookie } from 'cookies-next';
import { COOKIE_OPTIONS } from './rootURL'

export const setCookie = (key, value) => {
  set(key, (value || ''), COOKIE_OPTIONS);
}

export const getCookie = (key) => {
  return get(key, COOKIE_OPTIONS) || '';
}

export const removeCookie = (key) => {
  deleteCookie(key, COOKIE_OPTIONS);
}

export const clearCookie = () => {
  for (const key in getCookies()) {
    removeCookie(key);
  }
}

export const isCookie = (key) => {
  hasCookie(key, COOKIE_OPTIONS);
}