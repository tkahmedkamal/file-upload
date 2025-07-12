import Image from 'next/image';
import { Check, Loader2, RotateCcw, X } from 'lucide-react';

import { cn, fileSizeFormat } from '@/lib/utils';
import Progress from './progress';

interface FileItemProps extends FileActionHandlers {
  file: FileData;
}

const FileItem = ({ file, onFileDelete, onRetryUpload }: FileItemProps) => {
  const renderStatusIcon = () => {
    if (file.hasError) {
      return (
        <button
          onClick={() => onRetryUpload(file.id)}
          className="text-muted-foreground/25 hover:text-foreground flex cursor-pointer items-center gap-2 [&>svg]:transition-colors [&>svg]:duration-300"
        >
          <RotateCcw size={16} className="text-muted-foreground" />
        </button>
      );
    }

    if (file.isUploaded) {
      return (
        <div className="text-background flex size-4 items-center justify-center rounded-full bg-green-500">
          <Check size={12} strokeWidth={3} />
        </div>
      );
    }

    return <Loader2 size={16} className="text-primary animate-spin" />;
  };

  return (
    <div
      className={cn(
        'border-border/50 flex items-center gap-5 rounded-lg border p-3',
        file.hasError && 'bg-destructive/5 border-destructive/25',
      )}
    >
      <div className="flex flex-1 items-center gap-3">
        <Image
          src={file.file.type.startsWith('image') ? '/photo.png' : '/file.png'}
          width={32}
          height={32}
          priority
          alt="Icon"
        />
        <div className="w-full">
          <p className="max-w-56 truncate text-xs leading-3 font-medium">
            {file.file.name}
          </p>
          <span
            className={cn(
              'text-muted-foreground text-xs',
              file.hasError && 'text-destructive',
            )}
          >
            {file.hasError ? 'Upload field' : fileSizeFormat(file.file.size)}
          </span>
          <Progress progress={file.progress} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs">{file.progress}%</span>
        {renderStatusIcon()}
        <button
          onClick={() => onFileDelete(file.id)}
          disabled={!file.isUploaded}
          className="text-muted-foreground/25 [&>svg]:text-muted-foreground/25 hover:[&>svg]:text-foreground disabled:[&>svg]:text-muted-foreground/25 flex cursor-pointer items-center gap-2 disabled:cursor-not-allowed [&>svg]:transition-colors [&>svg]:duration-300"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default FileItem;
