export const INVENTORY_API_ROUTE = {
    CREATE: {
      ENDPOINT: "/api/inventory",
      KEY: ["create-inventory"],
    },
    UPDATE: {
      ENDPOINT: (id: string) => `/api/inventory/${id}`,
      KEY: ["update-inventory"],
    },
    LIST: {
      ENDPOINT: "/api/inventory",
      KEY: ["list-inventory"],
    },
    DELETE: {
      ENDPOINT: (id: string) => `/api/inventory/${id}`,
      KEY: ["delete-inventory"],
    },
    DROPDOWN: {
        ENDPOINT: "/api/inventory",
        KEY: ["inventory-dropdown"],
    }
  } as const;
  