import { cn } from '@/lib/utils';

interface ProgressProps {
  progress: number;
}

const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className="bg-muted h-0.5 w-full">
      <div
        className={cn(
          'h-full transition-all duration-300',
          progress < 50 && 'bg-destructive',
          progress >= 50 && progress < 70 && 'bg-orange-500',
          progress >= 70 && 'bg-primary',
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
