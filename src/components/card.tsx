import { cn } from '@/lib/utils';

interface CardProps extends Children {
  title: string;
  description: string;
  className?: string;
}

const Card = ({ children, title, description, className }: CardProps) => {
  return (
    <div
      className={cn(
        'bg-card flex flex-col gap-y-6 rounded-lg p-4 drop-shadow-xl',
        className,
      )}
    >
      <div className="text-center">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-muted-foreground text-xs">{description}</p>
      </div>
      <div className="flex flex-col gap-y-3">{children}</div>
    </div>
  );
};

export default Card;
