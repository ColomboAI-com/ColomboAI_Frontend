// export const ROOT_URL_AUTH = 'https://userservice-dot-fair-myth-398920.uc.r.appspot.com'
// export const ROOT_URL_FEED = 'https://feedservice-dot-fair-myth-398920.uc.r.appspot.com'

// export const ROOT_URL_AUTH = "http://localhost:8000";
// export const ROOT_URL_FEED = 'http://localhost:8001'

export const ROOT_URL_AUTH = "https://caiuserservice-prod-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_FEED = "https://caifeedservice-prod-dot-fair-myth-398920.uc.r.appspot.com";

export const ROOT_URL_MESSAGES = "https://cai-messaging-prod-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_NOTIFICATION = "https://cai-notifications-prod-dot-fair-myth-398920.uc.r.appspot.com";

export const ROOT_URL_LLM = "https://magicpen.colomboai.com";

export const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 365),
  sameSite: "lax",
  secure: true,
  domain: ".colomboai.com",
};
