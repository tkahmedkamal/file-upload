interface ProgressProps {
  progress: number;
}

const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className="bg-muted h-0.5 w-full">
      <div className="bg-primary h-full" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default Progress;
