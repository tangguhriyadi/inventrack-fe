import { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import Axios from "axios";
import ENV from "@/utils/env";
import { ROUTES } from "./route.config";
import { API_ROUTE } from "@/features/login/configs/api-route";

const authConfig: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
      async authorize(credentials) {
        const baseUrl = ENV.BASE_API_URL || "";
        try {
          const data = await Axios.post(
            baseUrl + API_ROUTE.AUTH.LOGIN.ENDPOINT,
            { email: credentials?.email, password: credentials?.password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          return {
            id: data.data.results.token,
            token: data.data.results.token ?? "",
            email: data.data.results.user.email,
            name: data.data.results.user.name,
            role: data.data.results.user.role,
            user_id: data.data.results.user.id
          };
        } catch (e: any) {
          throw new Error(e.response.data.message ?? "Something went wrong");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, token, trigger, session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }

      if (user) {
        token.email = user.email;
        token.token = user.token;
        token.name = user.name;
        token.id = user.id;
        token.role = user.role;
        token.user_id = user.user_id
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token.token;
        session.user = {
          ...session.user,
          email: token.email,
          name: token.name,
          id: token.id,
          role: token.role,
          user_id: token.user_id
        };
      }
      return session;
    },
  },
  pages: {
    signIn: ROUTES.AUTH.LOGIN,
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24,
  },
  secret: ENV.NEXTAUTH_SECRET,
};

export default authConfig;
