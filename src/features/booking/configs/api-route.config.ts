export const BOOKING_API_ROUTE = {
  BOOK: {
    ENDPOINT: "/api/booking",
    KEY: ["create-booking"],
  },
  LIST: {
    ENDPOINT: "/api/booking",
    KEY: ["list-booking"],
  },
  RETURN: {
    ENDPOINT: (id: string) => `/api/booking/${id}/return`,
    KEY: ["return-booking"],
  },
  APPROVE: {
    ENDPOINT: (id: string) => `/api/booking/${id}/approve`,
    KEY: ["approve-booking"],
  },
  REJECT: {
    ENDPOINT: (id: string) => `/api/booking/${id}/reject`,
    KEY: ["reject-booking"],
  },
} as const;
