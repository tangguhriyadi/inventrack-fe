export const CATEGORY_API_ROUTE = {
    CREATE: {
      ENDPOINT: "/api/category",
      KEY: ["create-category"],
    },
    UPDATE: {
      ENDPOINT: (id: string) => `/api/category/${id}`,
      KEY: ["update-category"],
    },
    LIST: {
      ENDPOINT: "/api/category",
      KEY: ["list-category"],
    },
    DELETE: {
      ENDPOINT: (id: string) => `/api/category/${id}`,
      KEY: ["delete-category"],
    },
    DROPDOWN: {
        ENDPOINT: "/api/category",
        KEY: ["category-dropdown"],
    }
  } as const;
  