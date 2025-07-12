import { useState } from 'react';
import axios from 'axios';

const useUploadFile = () => {
  const [files, setFiles] = useState<FileData[]>([]);
  const [error, setError] = useState('');

  const updateFileState = (id: string, updates: Partial<FileData>) => {
    setFiles((prev) =>
      prev.map((file) => (file.id === id ? { ...file, ...updates } : file)),
    );
  };

  const handleUploadFile = async (file: FileData) => {
    const formData = new FormData();
    formData.append('file', file.file);

    try {
      await axios.post(process.env.NEXT_PUBLIC_API_URL!, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: ({ loaded, total }) => {
          const progress = Math.round((loaded / (total ?? 1)) * 100);

          updateFileState(file.id, {
            progress: progress === 100 ? 99 : progress,
          });
        },
      });

      updateFileState(file.id, { isUploaded: true, progress: 100 });
    } catch (error) {
      // FIXME: Can be better handled with a toast
      console.error(error);
      updateFileState(file.id, { hasError: true });
    }
  };

  const handleFileChange = async (fileList: FileData[]) => {
    setFiles((prev) => [...prev, ...fileList]);

    await Promise.all(
      fileList.map(async (file, index) => {
        handleUploadFile(file);
      }),
    );
  };

  const handleRetryUpload = async (id: string) => {
    const fileData = files.find((file) => file.id === id);

    if (!fileData?.file) return;

    updateFileState(fileData.id, { hasError: false });

    const formData = new FormData();
    formData.append('file', fileData?.file);

    await handleUploadFile(fileData);
  };

  const handleFileDelete = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleError = (error: string) => {
    setError(error);
  };

  return {
    files,
    error,
    handleError,
    handleFileChange,
    handleFileDelete,
    handleRetryUpload,
  };
};

export default useUploadFile;
