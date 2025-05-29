import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
    role: string;
    user_id: string
  }
  interface Session {
    token: string;
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      user_id: string
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    name: string;
    token: string;
    role: string;
    user_id: string
  }
}
