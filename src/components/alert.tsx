import { cn } from '@/lib/utils';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  if (message.length === 0) return;

  const variants = {
    success: 'bg-green-800/5 text-green-800',
    error: 'bg-destructive/5 text-destructive',
  };

  return (
    <div className={cn('rounded-lg p-3', variants[type])}>
      <p className="text-xs">{message}</p>
    </div>
  );
};

export default Alert;
