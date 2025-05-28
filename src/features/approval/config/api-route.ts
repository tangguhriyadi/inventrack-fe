export const APPROVAL_API_ROUTE = {
  LIST: {
    ENDPOINT: "/api/booking",
    KEY: ["list-booking-approval"],
  },
  APPROVE: {
    ENDPOINT: (id: string) => `/api/booking/${id}/approve`,
    KEY: ["return-booking"],
  },
  REJECT: {
    ENDPOINT: (id: string) => `/api/booking/${id}/reject`,
    KEY: ["return-booking"],
  },
} as const;
