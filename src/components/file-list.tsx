import FileItem from './file-item';

interface FileListProps extends FileActionHandlers {
  files: FileData[];
}

const FileList = ({ files, onFileDelete, onRetryUpload }: FileListProps) => {
  if (!files.length) return;

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onFileDelete={onFileDelete}
          onRetryUpload={onRetryUpload}
        />
      ))}
    </div>
  );
};

export default FileList;
