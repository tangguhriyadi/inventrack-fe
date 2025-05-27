const API_PREFIX = "/api";

export const API_ROUTE = {
  AUTH: {
    LOGIN: {
      ENDPOINT: API_PREFIX + "/auth/login",
      KEY: ["login"],
    },
    LOGOUT: {
      ENDPOINT: API_PREFIX + "/auth/logout",
      KEY: ["logout"],
    },
  },
} as const;
