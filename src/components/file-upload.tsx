'use client';

import Alert from './alert';
import Card from './card';
import FileList from './file-list';
import UploadBox from './upload-box';
import useUploadFile from '@/hooks/use-upload-file';

const FileUpload = () => {
  const {
    files,
    error,
    handleError,
    handleFileChange,
    handleFileDelete,
    handleRetryUpload,
  } = useUploadFile();

  return (
    <Card
      className="w-96"
      title="Upload your files"
      description="To attach to a project"
    >
      <UploadBox
        description="10 MB max file size - 5 files max"
        onFileChange={handleFileChange}
        onError={handleError}
      />
      <FileList
        files={files}
        onFileDelete={handleFileDelete}
        onRetryUpload={handleRetryUpload}
      />
      <Alert type="error" message={error} />
    </Card>
  );
};

export default FileUpload;
