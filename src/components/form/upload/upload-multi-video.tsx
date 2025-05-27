import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import useUpload from "@/hooks/use-upload-media";
import { UploadFileStatus } from "antd/es/upload/interface";
import { useNotificationBar } from "@/providers/notification.provider";
import { AxiosProgressEvent } from "axios";

interface Video {
  id?: string | null;
  is_delete?: boolean;
  media_id?: string;
  url?: string;
  is_thumbnail?: boolean;
}

interface VideoUploadProps {
  initialVideos?: Video[];
  onUploadComplete: (videos: Video[]) => void;
  editMode?: boolean;
}

const MAX_SIZE_MB = 30; // Maximum file size for videos

const CoreUploadMultiVideo: React.FC<VideoUploadProps> = ({
  initialVideos = [],
  onUploadComplete,
  editMode = false,
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const { openNotificationBar } = useNotificationBar();
  const uploadHook = useUpload("VIDEO", "PRODUCT");
  const isInitialized = useRef(false);

  // preview modal state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<React.ReactNode>(null);
  const [previewTitle, setPreviewTitle] = useState("");

  useEffect(() => {
    if (!isInitialized.current && initialVideos.length > 0) {
      const mappedFileList = initialVideos.map((video, index) => {
        const extension = (video.url ?? "").split(".").pop();
        const mimeType = `video/${extension}`;

        return {
          uid: video.media_id,
          name: `Video ${index + 1}`,
          status: "done" as UploadFileStatus,
          url: video.url,
          thumbUrl: video.url,
          type: mimeType,
          originFileObj: {
            uid: video.media_id,
            name: `Video ${index + 1}`,
            lastModified: new Date().getTime(),
            lastModifiedDate: new Date(),
            size: 0,
            type: mimeType,
            webkitRelativePath: "",
          } as RcFile,
        };
      }) as UploadFile[];
      setFileList(mappedFileList);
      setVideos(initialVideos);
      isInitialized.current = true;
    }
  }, [initialVideos]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedList = newFileList
      .filter((file) => (file.size ?? 0) / 1024 / 1024 <= MAX_SIZE_MB)
      .map((file) => {
        if (!file.url && !file.thumbUrl && file.originFileObj) {
          const previewUrl = URL.createObjectURL(file.originFileObj as RcFile);
          return {
            ...file,
            url: previewUrl,
            // thumbUrl: previewUrl,
          };
        }
        return file;
      });

    setFileList(updatedList);
  };

  const customRequest = async ({
    file,
    onSuccess,
    onError,
    onProgress,
  }: any) => {
    try {
      const response = await uploadHook.mutateAsync({
        file,
        onUploadProgress: (event: AxiosProgressEvent) => {
          const percent = Math.round((event.loaded / (event.total ?? 1)) * 100);
          onProgress({ percent });
        },
      });
      const { data } = response.data;
      const newVideo = {
        id: null,
        media_id: data.id,
        url: data.file,
        is_thumbnail: videos.every((video) => !video.is_thumbnail),
        ...(editMode && { is_delete: false }),
      };

      setVideos((prev) => [...prev, newVideo]);
      onUploadComplete([...videos, newVideo]);

      onSuccess(response, file);
    } catch (error: any) {
      openNotificationBar({
        title: "Upload Gagal",
        type: "error",
        message: error?.message || "Gagal mengunggah video!",
      });
      onError?.(error);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isVideo = file.type.startsWith("video/");
    if (!isVideo) {
      openNotificationBar({
        title: "Upload Gagal",
        type: "error",
        message: "Hanya format video yang diperbolehkan!",
      });
      return Upload.LIST_IGNORE; // Prevent upload
    }

    const isSizeValid = file.size / 1024 / 1024 <= MAX_SIZE_MB;
    if (!isSizeValid) {
      openNotificationBar({
        title: "Upload Gagal",
        type: "error",
        message: `Maaf video tidak boleh lebih dari ${MAX_SIZE_MB}MB!`,
      });
      return Upload.LIST_IGNORE; // Prevent upload
    }

    return true;
  };

  const handleRemove = (file: UploadFile) => {
    const updatedVideos = videos.map((video) =>
      video.media_id === file.uid
        ? { ...video, is_delete: true, is_thumbnail: false }
        : video,
    );
    setVideos(updatedVideos);
    onUploadComplete(updatedVideos);
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid),
    );
    openNotificationBar({
      title: "Berhasil",
      type: "success",
      message: "Video berhasil dihapus.", //(soft delete)
    });
  };

  const handlePreview = async (file: UploadFile) => {
    setPreviewTitle(file.name || "");
    if (file.type?.startsWith("video/")) {
      setPreviewContent(
        <video
          src={file.url || file.thumbUrl}
          style={{ width: "100%", maxHeight: 400 }}
          controls
        />,
      );
    } else {
      setPreviewContent(
        <img
          src={file.url || file.thumbUrl}
          alt={file.name}
          style={{ width: "100%" }}
        />,
      );
    }
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
      type="button"
    >
      <div className="w-full h-full grow">
        <PlusOutlined width={"40px"} height={"40px"} />
      </div>
      <div style={{ marginTop: 8, color: "#262626" }}>Tambah Video</div>
      <div style={{ marginTop: 2, color: "#262626", fontSize: 12 }}>
        ({fileList.length}/1)
      </div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
        beforeUpload={beforeUpload}
        onRemove={handleRemove}
        accept="video/*"
        maxCount={1}
        iconRender={(file) => {
          if (file.status === "uploading") {
            return (
              <span className="animate-pulse font-semibold text-gray-600">
                Uploading...
              </span>
            );
          }
          return (
            <VideoCameraOutlined style={{ fontSize: 24, color: "#1890ff" }} />
          );
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        width={800}
      >
        {previewContent}
      </Modal>
    </>
  );
};

export default CoreUploadMultiVideo;
