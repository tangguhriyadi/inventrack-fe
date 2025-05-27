"use client";
import { API_ROUTE } from "../configs/api-route";
import { useMutation } from "@tanstack/react-query";
import { LoginSchema } from "../schema/login.schema";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/configs/route.config";
import { signIn } from "next-auth/react";
import { useNotificationBar } from "../../../providers/notification.provider";

const loginEmailApi = async (body: LoginSchema) => {
  return await signIn("credentials", { ...body, redirect: false });
};

export function useLogin() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const hasCallBackUrl = !!callbackUrl && callbackUrl !== "null";

  const router = useRouter();
  const { openNotificationBar } = useNotificationBar();

  return useMutation({
    mutationKey: [...API_ROUTE.AUTH.LOGIN.KEY],
    mutationFn: (body: LoginSchema) =>
      loginEmailApi(body).then((res) => {
        router.push(hasCallBackUrl ? callbackUrl : ROUTES.DEFAULT);
        return res;
      }),
    onSuccess: (data: any) => {
      if (!data.ok) {
        openNotificationBar({
          message: data.error,
          title: "Login Failed",
          type: "error",
        });
      }
      if (data.data?.data.token) {
        router.push(hasCallBackUrl ? callbackUrl : ROUTES.DEFAULT);
      }
    },
  });
}
