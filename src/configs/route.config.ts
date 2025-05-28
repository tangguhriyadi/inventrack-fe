export const ROUTES = {
  DEFAULT: "/dashboard",
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/register",
  },
  USER: {
    LIST: "/dashboard/user",
    CREATE: "/dashboard/user/create",
    EDIT: (id: string) => `/dashboard/user/edit/${id}`,
  },
  CATEGORY: {
    LIST: "/dashboard/category",
  },
  INVENTORY: {
    LIST: "/dashboard/inventory",
  },
  BOOKING: {
    LIST: "/dashboard/booking"
  }
} as const;
