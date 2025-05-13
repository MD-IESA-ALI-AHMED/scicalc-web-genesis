
import React from 'react';
import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  buttonType?: 'normal' | 'operator' | 'function' | 'equals';
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
        'text-lg font-medium h-14 w-full',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': buttonType === 'equals',
        },
        className
      )}
    >
      {value}
    </UIButton>
  );
};

export default CalculatorButton;
