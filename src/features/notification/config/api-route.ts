export const NOTIFICATION_API_ROUTE = {
  LIST: {
    ENDPOINT: "/api/notification",
    KEY: ["notifications"],
  },
  READ: {
    ENDPOINT: "/api/notification/read",
    KEY: ["notifications-read"],
  },
} as const;
