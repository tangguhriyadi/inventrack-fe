import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import useUpload from "@/hooks/use-upload-media";
import { UploadFileStatus } from "antd/es/upload/interface";
import { useNotificationBar } from "@/providers/notification.provider";
import { AxiosProgressEvent } from "axios";

interface Photo {
  id?: string | null;
  is_delete?: boolean;
  media_id?: string;
  url?: string;
  is_thumbnail?: boolean;
}

interface ImageUploadProps {
  initialPhotos?: Photo[];
  onUploadComplete: (photos: Photo[]) => void;
  editMode?: boolean;
}

const MAX_SIZE_MB = 5; // Maximum file size in megabytes

const CoreUploadMultiImage: React.FC<ImageUploadProps> = ({
  initialPhotos = [],
  onUploadComplete,
  editMode = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const { openNotificationBar } = useNotificationBar();
  const uploadHook = useUpload("IMAGE", "PRODUCT");
  const isInitialized = useRef(false);

  // Populate file list with initial photos on mount or when props change
  useEffect(() => {
    if (!isInitialized.current && initialPhotos.length > 0) {
      const mappedFileList = initialPhotos.map((photo, index) => {
        // Extract the file extension/type from the URL
        const extension = (photo.url ?? "").split(".").pop();
        const mimeType = `image/${extension}`;

        return {
          uid: photo.media_id,
          name: `Image ${index + 1}`,
          status: "done" as UploadFileStatus,
          url: photo.url,
          thumbUrl: photo.url,
          type: mimeType, // ✅ Include the MIME type
          originFileObj: {
            uid: photo.media_id,
            name: `Image ${index + 1}`,
            lastModified: new Date().getTime(),
            lastModifiedDate: new Date(),
            size: 0,
            type: mimeType,
            webkitRelativePath: "",
          } as RcFile,
        };
      }) as UploadFile[];
      setFileList(mappedFileList);
      setPhotos(initialPhotos);
      isInitialized.current = true;
    }
  }, [initialPhotos]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const filteredList = newFileList.filter(
      (file) => (file.size ?? 0) / 1024 / 1024 <= MAX_SIZE_MB,
    );
    setFileList(filteredList);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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
      const newPhoto = {
        id: null,
        media_id: data.id,
        url: data.file,
        is_thumbnail: photos.length === 0, // Set the first uploaded image as the thumbnail
        ...(editMode && { is_delete: false }), // Add is_delete = false if editMode is true
      };

      const updatedPhotos = [...photos, newPhoto];
      setPhotos(updatedPhotos);
      onUploadComplete(updatedPhotos);

      onSuccess(response, file);
    } catch (error) {
      onError?.(error);
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isSizeValid = file.size / 1024 / 1024 <= MAX_SIZE_MB;
    if (!isSizeValid) {
      openNotificationBar({
        title: "Upload Gagal",
        type: "error",
        message: `Maaf Gambar tidak boleh lebih dari ${MAX_SIZE_MB}MB!`,
      });
    }
    return isSizeValid;
  };

  const handleRemove = (file: UploadFile) => {
    const mediaIdToRemove = file.uid;

    // Mark the photo as deleted instead of removing it
    let updatedPhotos = photos.map((photo) =>
      photo.media_id === mediaIdToRemove
        ? { ...photo, is_delete: true }
        : photo,
    );

    const wasThumbnailRemoved = photos.find(
      (photo) => photo.media_id === mediaIdToRemove && photo.is_thumbnail,
    );

    if (wasThumbnailRemoved && !editMode) {
      // Promote the next non-deleted photo to be the new thumbnail
      updatedPhotos = updatedPhotos.map((photo, index) => {
        if (photo.is_delete) return photo;

        // First non-deleted photo becomes the new thumbnail
        return {
          ...photo,
          is_thumbnail: index === updatedPhotos.findIndex((p) => !p.is_delete),
        };
      });
    }

    setPhotos(updatedPhotos);
    onUploadComplete(updatedPhotos); // Notify parent about the updated photo list

    // Update the file list to reflect changes (keeping the item but marking it as deleted)
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.uid !== file.uid),
    );

    openNotificationBar({
      title: "Berhasil",
      type: "success",
      message: "Photo berhasil dihapus.", //(soft delete)
    });
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
      <div style={{ marginTop: 8, color: "#262626" }}>Tambah Foto</div>
      <div style={{ marginTop: 2, color: "#262626", fontSize: 12 }}>
        ({fileList.length}/5)
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
        accept="image/*"
        maxCount={5}
      >
        {fileList.length >= 5 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
          alt=""
        />
      )}
    </>
  );
};

export default CoreUploadMultiImage;
