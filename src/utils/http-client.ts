"use client";

import axios from "axios";
import { getSession } from "next-auth/react";
import ENV from "@/utils/env";
import { ROUTES } from "@/configs/route.config";
import { getGlobalOpenNotification } from "../providers/notification.provider";

const HttpClient = () => {
  const defaultOptions = {
    baseURL: ENV.BASE_API_URL
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session) {
      request.headers.Authorization = `Bearer ${session.token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error(error);
      if (error.response.status === 401) {
        window.location.href = ROUTES.AUTH.LOGIN;
      } else {
        let errorMessage =
          error.response.data?.errors?.reduce(
            (acc: string, curr: any) => `${acc}, ${curr.msg}`,
            "---",
          ) ?? "Something went wrong";
        errorMessage = errorMessage.replace("---, ", "");

        const openNotification = getGlobalOpenNotification();

        if (openNotification) {
          openNotification({
            type: "error",
            message: errorMessage,
            title: error.response.data.message ?? "Something went wrong!",
          });
        }
      }

      throw error;
    },
  );

  return instance;
};

export default HttpClient();
