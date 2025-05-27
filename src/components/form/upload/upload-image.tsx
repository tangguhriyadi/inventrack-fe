import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, Image } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload";
import useUpload from "@/hooks/use-upload-media";
import { useNotificationBar } from "@/providers/notification.provider";

interface ImageUploadProps {
  initialPhoto?: string; // Hanya menerima URL gambar
  onUploadComplete: (photo: { url: string } | null) => void;
  // editMode?: boolean;
}

const MAX_SIZE_MB = 5; // Maximum file size in megabytes

const CoreUploadImage: React.FC<ImageUploadProps> = ({
  initialPhoto,
  onUploadComplete,
  // editMode = false,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { openNotificationBar } = useNotificationBar();

  // const [photo, setPhoto] = useState<{ url: string } | null>(null);

  const uploadHook = useUpload("IMAGE", "PRODUCT");

  // Populate file list with initial photo on mount or when props change
  useEffect(() => {
    if (initialPhoto) {
      const mappedFile = {
        uid: "initial-photo",
        name: "Image",
        status: "done" as const,
        url: initialPhoto,
        thumbUrl: initialPhoto,
      };

      setFileList([mappedFile]);
      // setPhoto({ url: initialPhoto });
    }
  }, [initialPhoto]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const realFile = file as RcFile;

      const response = await uploadHook.mutateAsync({ file: realFile });

      const fileUrl = response?.data?.data?.file;
      if (!fileUrl) {
        throw new Error("File URL not found");
      }

      const newPhoto = { url: fileUrl };
      onUploadComplete(newPhoto);
      onSuccess?.(response, file);
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

  const handleRemove = () => {
    // setPhoto(null);
    onUploadComplete(null); // Notify parent about the removal

    setFileList([]);
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
        maxCount={1} // Limit to a single file
      >
        {fileList.length >= 1 ? null : uploadButton}
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

export default CoreUploadImage;
