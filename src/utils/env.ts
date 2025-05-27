const ENV = {
  BASE_API_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
} as const;

export default ENV;
