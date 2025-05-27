"use client";

import { Button, Upload } from "antd";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useNotificationBar } from "@/providers/notification.provider";
import { UploadChangeParam, UploadFile, UploadProps } from "antd/es/upload";
import useUpload from "@/hooks/use-upload";

interface Props
  extends Omit<UploadProps, "customRequest" | "onChange" | "maxCount"> {
  handleChange: (fileUrl?: string) => void;
  uploadButton?: React.ReactNode;
  buttonText?: string;
}

const CoreUploadFile: React.FC<Props> = (props) => {
  const {
    beforeUpload: customBeforeUpload,
    handleChange,
    uploadButton: customUploadButton,
    buttonText = "Click to Upload",
    ...rest
  } = props;
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const { openNotificationBar } = useNotificationBar();
  const uploadHook = useUpload();

  const handleUploadChange = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === "uploading") {
      setIsUploading(true);
      return;
    } else if (info.file.status === "done") {
      handleChange(info.file.response);
      setIsUploading(false);
    } else if (info.file.status === "error") {
      handleChange(undefined);
      setIsUploading(false);

      openNotificationBar({
        type: "error",
        title: "Upload Failed !",
        message: "Please try again.",
      });
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const response = await uploadHook.mutateAsync(file);

      const url = response.data.results.url as string;
      onSuccess(url, file);
    } catch (error) {
      onError?.(error);
    }
  };

  const uploadButton = customUploadButton ?? (
    <Button size="small" loading={isUploading} icon={<UploadOutlined />}>
      {buttonText}
    </Button>
  );
  return (
    <Upload
      customRequest={customRequest}
      beforeUpload={customBeforeUpload}
      onChange={handleUploadChange}
      className="flex items-center gap-x-4"
      maxCount={1}
      {...rest}
    >
      {uploadButton}
    </Upload>
  );
};

export default CoreUploadFile;
