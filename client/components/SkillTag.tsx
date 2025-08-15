import { cn } from '@/lib/utils';

interface SkillTagProps {
  skill: string;
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
}

export default function SkillTag({
  skill,
  variant = 'default',
  size = 'md',
  className,
  onClick
}: SkillTagProps) {
  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1 text-xs': size === 'md',
        },
        {
          'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100': variant === 'default',
          'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200': variant === 'secondary',
          'border border-gray-300 text-gray-700 hover:bg-gray-50': variant === 'outline',
        },
        'dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {skill}
    </Component>
  );
}
