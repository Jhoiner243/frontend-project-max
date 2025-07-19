declare global {
  interface Window {
    __APP_CONFIG__?: {
      VAPID_KEY?: string;
      CLERK_PUBLISHABLE_KEY?: string;
      API_URL?: string;
    };
  }
}

export const VITE_VAPID_KEY =
  window.__APP_CONFIG__?.VAPID_KEY ||
  "BEnPHW_WvNXu0i8dxYAIVjrINaCMafIwNXofeDPWXi2QUzRUSY63W6DOhqH84Im9mmM-BQHriKeFfpmfKcxwS5c";
export const VITE_CLERK_PUBLISHABLE_KEY =
  window.__APP_CONFIG__?.CLERK_PUBLISHABLE_KEY ||
  "pk_test_cmFwaWQtbW9yYXktODcuY2xlcmsuYWNjb3VudHMuZGV2JA";
export const VITE_API_URL =
  window.__APP_CONFIG__?.API_URL || "http://13.220.255.36:3000";
