import { RcFile } from "antd/es/upload";
import { useMutation } from "@tanstack/react-query";
import { AxiosProgressEvent } from "axios";
import httpClient from "../utils/http-client";
// import { useNotificationBar } from "../providers/notification.provider";

export const uploadApi = (
  file: RcFile | File,
  type: "IMAGE" | "VIDEO",
  source: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);
  formData.append("source", source);

  return httpClient.post(`/api/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

export default function useUpload(type: "IMAGE" | "VIDEO", source: string) {
  // const { openNotificationBar } = useNotificationBar();

  return useMutation({
    mutationFn: ({ file, onUploadProgress }: { file: RcFile | File, onUploadProgress?: (e: AxiosProgressEvent) => void }) =>
      uploadApi(file, type, source, onUploadProgress),
    mutationKey: ["upload-media", type, source],
    // onError: () => {
    //   openNotificationBar({
    //     type: "error",
    //     title: "Upload Failed!",
    //     message: "Please try again.",
    //   });
    // },
  });
}
