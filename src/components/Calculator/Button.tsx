
import React from 'react';
import { Button as UIButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  value: string;
  onClick: (value: string) => void;
  buttonType?: 'digit' | 'operator' | 'function' | 'equals' | 'control' | 'memory' | 'toggle' | 'active' | 'constant' | 'parenthesis' | 'normal';
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
      case 'constant':
        return 'outline';
      case 'parenthesis':
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
      case 'digit':
        return 'ghost';
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
        'text-sm sm:text-base font-medium py-2 h-12 w-full transition-all duration-150 hover:scale-105 active:scale-95',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90 font-bold': buttonType === 'equals',
          'bg-blue-500 text-white hover:bg-blue-600': buttonType === 'active',
          'bg-muted text-muted-foreground hover:bg-muted/90': buttonType === 'toggle',
          'bg-secondary/50 hover:bg-secondary/80 text-secondary-foreground': buttonType === 'digit',
          'hover:shadow-md': true,
          'rounded-full': buttonType === 'digit',
          'font-mono': ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(value),
          'shadow-inner': buttonType === 'digit',
          'bg-destructive/90 text-destructive-foreground hover:bg-destructive': buttonType === 'control',
          'border-2 border-primary/20': ['function', 'constant', 'parenthesis'].includes(buttonType),
          'text-blue-500 font-semibold': buttonType === 'constant',
          'text-orange-500 font-semibold': buttonType === 'function',
          'text-green-500 font-semibold': buttonType === 'memory',
        },
        className
      )}
    >
      {value}
    </UIButton>
  );
};

export default CalculatorButton;
