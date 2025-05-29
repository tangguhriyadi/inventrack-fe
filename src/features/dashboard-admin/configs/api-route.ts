export const DASHBOARD_ADMIN_API_ROUTE = {
  TOP10: {
    ENDPOINT: "/api/dashboard/booked/top10",
    KEY: ["booking-top10"],
  },
  CATEGORY: {
    ENDPOINT: "/api/dashboard/booked/byCategory",
    KEY: ["booking-byCategory"],
  },
  OVERDUE: {
    ENDPOINT: "/api/dashboard/booked/overdue",
    KEY: ["booking-overdue"],
  },
  STATUS: {
    ENDPOINT: "/api/dashboard/booked/byStatus",
    KEY: ["booking-byStatus"],
  },
} as const;
