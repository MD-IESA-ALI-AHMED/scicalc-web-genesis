
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
    <Card className="w-full p-4 mb-4 bg-card">
      <div className="flex flex-col items-end">
        <div className="flex justify-between w-full">
          <span className="text-sm text-muted-foreground">{angleMode.toUpperCase()}</span>
          <span className="text-lg text-right truncate text-muted-foreground overflow-x-auto">
            {expression || '0'}
          </span>
        </div>
        <div className="text-2xl font-bold w-full text-right truncate overflow-x-auto">
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
