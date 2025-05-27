export const USER_API_ROUTE = {
  CREATE: {
    ENDPOINT: "/api/user",
    KEY: ["create-user"],
  },
  UPDATE: {
    ENDPOINT: (id: string) => `/api/user/${id}`,
    KEY: ["update-user"],
  },
  LIST: {
    ENDPOINT: "/api/user",
    KEY: ["list-user"],
  },
  DELETE: {
    ENDPOINT: (id: string) => `/api/user/${id}`,
    KEY: ["delete-user"],
  },
} as const;
