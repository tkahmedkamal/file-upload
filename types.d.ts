interface Children {
  children: React.ReactNode;
}

interface FileData {
  id: string;
  file: File;
  progress: number;
  isUploaded: boolean;
  hasError: boolean;
}

interface FileActionHandlers {
  onFileDelete: (id: string) => void;
  onRetryUpload: (id: string) => void;
}
