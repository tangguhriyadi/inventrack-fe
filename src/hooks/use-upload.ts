import { RcFile } from "antd/es/upload";
import { useMutation } from "@tanstack/react-query";
import httpClient from "../utils/http-client";
// import { getSession } from "next-auth/react";
// import { useNotificationBar } from "../providers/notification.provider";

export const uploadApi = async (file: RcFile | File) => {
  // const session = await getSession()
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", "IMAGE");
  // formData.append("storeId", session?.user.store_id ?? "")

  return httpClient.post(`/api/v1/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export default function useUpload() {
  //   const { openNotificationBar } = useNotificationBar();

  return useMutation({
    mutationFn: (file: RcFile | File) => uploadApi(file),
    mutationKey: ["upload-file"],
    // onError: () => {
    //   openNotificationBar({
    //     type: "error",
    //     title: "Upload Failed !",
    //     message: "Please try again.",
    //   });
    // },
  });
}
