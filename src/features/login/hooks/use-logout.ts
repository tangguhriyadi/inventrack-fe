import { useMutation } from "@tanstack/react-query";
import httpClient from "../../../utils/http-client";
import { API_ROUTE } from "../configs/api-route";

export const logoutApi = () => httpClient.post(API_ROUTE.AUTH.LOGOUT.ENDPOINT);

export default function useLogout(onSuccess?: () => void) {
  return useMutation({
    mutationFn: logoutApi,
    mutationKey: [...API_ROUTE.AUTH.LOGOUT.KEY],
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
    onError: () => {
      if (onSuccess) onSuccess();
    },
  });
}
