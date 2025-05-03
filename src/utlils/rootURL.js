// LOCAL URLS
// export const ROOT_URL_AUTH = "http://localhost:8000";
// export const ROOT_URL_FEED = "http://localhost:8001";
// export const ROOT_URL_MESSAGES = "http://localhost:8001";
// export const ROOT_URL_NOTIFICATION = "http://localhost:8002";
// export const ROOT_URL_RECOMMENDATION_GRPC = "localhost:50051";

// PUBLIC URLS
export const ROOT_URL_AUTH = "https://caiuserservice-1-dev-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_FEED = "https://caifeedservice-1-dev-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_MESSAGES = "https://cai-messaging-dev-dot-fair-myth-398920.uc.r.appspot.com";
export const ROOT_URL_NOTIFICATION = "https://cai-notifications-dev-dot-fair-myth-398920.uc.r.appspot.com/";
export const ROOT_URL_LLM = "https://magicpen-dev.colomboai.com";
export const ROOT_URL_RECOMMENDATION_GRPC = "35.232.68.95:50051";

export const COOKIE_OPTIONS = {
  path: "/",
  expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 * 365),
  sameSite: "lax",
  secure: true,
  domain: ".colomboai.com",
};
