
import React from 'react';
import { Card } from '@/components/ui/card';

interface CalculatorDisplayProps {
  expression: string;
  result: string;
  error?: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ expression, result, error }) => {
  return (
    <Card className="w-full p-4 mb-4 bg-card">
      <div className="flex flex-col items-end">
        <div className="text-lg w-full text-right truncate text-muted-foreground overflow-x-auto">
          {expression || '0'}
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
