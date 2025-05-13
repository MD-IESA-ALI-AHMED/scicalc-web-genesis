
import React from 'react';
import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  buttonType?: 'normal' | 'operator' | 'function' | 'equals' | 'control' | 'memory' | 'toggle' | 'active';
  className?: string;
  disabled?: boolean;
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  value,
  onClick,
  buttonType = 'normal',
  className,
  disabled = false,
}) => {
  const getVariant = () => {
    switch (buttonType) {
      case 'operator':
        return 'secondary';
      case 'function':
        return 'outline';
      case 'equals':
        return 'default';
      case 'control':
        return 'destructive';
      case 'memory':
        return 'outline';
      case 'toggle':
        return 'ghost';
      case 'active':
        return 'default';
      default:
        return 'ghost';
    }
  };

  return (
    <UIButton
      variant={getVariant()}
      onClick={() => onClick(value)}
      disabled={disabled}
      className={cn(
        'text-sm sm:text-base font-medium h-12 w-full',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': buttonType === 'equals',
          'bg-blue-500 text-white hover:bg-blue-600': buttonType === 'active',
          'bg-muted text-muted-foreground hover:bg-muted/90': buttonType === 'toggle',
        },
        className
      )}
    >
      {value}
    </UIButton>
  );
};

export default CalculatorButton;
