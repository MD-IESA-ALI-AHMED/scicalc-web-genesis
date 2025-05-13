
import React from 'react';
import { Card } from '@/components/ui/card';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error?: string;
  angleMode?: 'deg' | 'rad';
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ 
  expression, 
  result, 
  error,
  angleMode = 'deg'
}) => {
  return (
    <Card className="w-full p-4 mb-6 bg-gradient-to-r from-card/80 to-card shadow-inner border border-primary/20 rounded-lg">
      <div className="flex flex-col items-end space-y-2">
        <div className="flex justify-between w-full items-center">
          <span className="text-xs font-mono px-2 py-1 bg-primary/10 rounded-full text-primary">
            {angleMode.toUpperCase()}
          </span>
          <span className="text-lg text-right truncate text-muted-foreground font-mono overflow-x-auto max-w-[90%]">
            {expression || '0'}
          </span>
        </div>
        <div className="text-3xl font-bold w-full text-right truncate overflow-x-auto font-mono">
          {error ? (
            <span className="text-destructive">{error}</span>
          ) : (
            result || '0'
          )}
        </div>
      </div>
    </Card>
  );
};

export default CalculatorDisplay;
