// export const ROOT_URL_AUTH = 'https://userservice-dot-fair-myth-398920.uc.r.appspot.com'
// export const ROOT_URL_FEED = 'https://feedservice-dot-fair-myth-398920.uc.r.appspot.com'

// export const ROOT_URL_AUTH = "http://localhost:8000";
// export const ROOT_URL_FEED = "http://localhost:8001";

// export const ROOT_URL_MESSAGES = "ws://localhost:8001";
// export const ROOT_URL_MESSAGES = "http://localhost:8001";

export const ROOT_URL_AUTH = "https://caiuserservice-1-dev-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_FEED = "https://caifeedservice-1-dev-dot-fair-myth-398920.uc.r.appspot.com";

// export const ROOT_URL_MESSAGES = "wss://messagingservice-dev-dot-fair-myth-398920.uc.r.appspot.com"; // THIS ONE DOESN'T WORK
// export const ROOT_URL_MESSAGES = "ws://cai-messaging-dev-dot-fair-myth-398920.uc.r.appspot.com/"; //THIS ONE IS OLD AS WELL NOT SURE IF IT WORKS

export const ROOT_URL_MESSAGES = "https://cai-messaging-dev-dot-fair-myth-398920.uc.r.appspot.com/";

export const ROOT_URL_NOTIFICATION = "https://notificationservice-dev-dot-fair-myth-398920.uc.r.appspot.com";

export const ROOT_URL_LLM = "https://magicpen.colomboai.com";

export const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 365),
  sameSite: "lax",
  secure: true,
  domain: ".colomboai.com",
};
