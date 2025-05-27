"use client";

import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/features/login/login.page"), {
  ssr: false,
});

export default function Page() {
  return <LoginPage />;
}
