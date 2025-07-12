'use client';

import Image from 'next/image';
import { FileRejection, useDropzone } from 'react-dropzone';

import { cn, fileSizeFormat } from '@/lib/utils';
import { MAX_FILE_SIZE, MAX_UPLOAD_FILES } from '@/lib/constants';

interface UploadBoxProps {
  maxSize?: number;
  maxFiles?: number;
  description?: string;
  onFileChange: (files: FileData[]) => void;
  onError: (error: string) => void;
}

const UploadBox = ({
  maxSize = MAX_FILE_SIZE,
  maxFiles = MAX_UPLOAD_FILES,
  description,
  onFileChange,
  onError,
}: UploadBoxProps) => {
  const onDrop = (files: File[]) => {
    if (!files.length) return;

    const newFiles: FileData[] = [];

    files.map((file) => {
      const fileData: FileData = {
        id: `${file.name}-${Date.now()}`,
        file,
        progress: 0,
        isUploaded: false,
        hasError: false,
      };

      newFiles.push(fileData);
    });

    onFileChange(newFiles);
  };

  const formatRejectionErrors = (
    fileRejections: FileRejection[],
    maxSize: number,
    maxFiles: number,
  ) => {
    const messages = new Set<string>();

    fileRejections.forEach(({ file, errors }) => {
      errors.forEach((error) => {
        const message =
          error.code === 'file-too-large'
            ? `${file.name} - File is larger than ${fileSizeFormat(maxSize)}`
            : error.code === 'too-many-files'
              ? `You can only upload a maximum of ${maxFiles} files`
              : `${file.name} - ${error.message}`;

        messages.add(message);
      });
    });

    return Array.from(messages).join('\n');
  };

  const onDropRejected = (fileRejections: FileRejection[]) => {
    const errorMessage = formatRejectionErrors(
      fileRejections,
      maxSize,
      maxFiles,
    );
    onError(errorMessage);
  };

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      maxSize,
      multiple: true,
      maxFiles,
      onDrop,
      onDropRejected,
    });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'bg-primary/5 flex-center cursor-pointer flex-col gap-y-4 rounded-lg border border-dashed p-4 transition-colors duration-300',
        isDragActive && 'border-primary bg-primary/10',
      )}
    >
      <input {...getInputProps()} />
      <div className="bg-primary/10 flex-center size-16 rounded-full">
        <Image
          src="/upload.png"
          width={40}
          height={40}
          priority
          alt="Folder icon"
        />
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-medium">
          Drag & drop file here or click to upload
        </p>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
    </div>
  );
};

export default UploadBox;
