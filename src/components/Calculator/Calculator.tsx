
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CalculatorButton from './Button';
import CalculatorDisplay from './Display';
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from '@/hooks/use-mobile';

// Helper function to evaluate expressions safely
const safeEval = (expression: string): { result: string; error: string | null } => {
  if (!expression) return { result: '', error: null };
  try {
    // For now, we'll use a simple eval. In a production app, you'd use Math.js here
    // This is just for demonstration purposes
    // eslint-disable-next-line no-eval
    const result = eval(expression.replace(/sin|cos|tan|log|ln/g, 'Math.$&')
      .replace(/π/g, 'Math.PI')
      .replace(/e(?![a-zA-Z])/g, 'Math.E'));
    return { result: String(result), error: null };
  } catch (e) {
    return { result: '', error: 'Invalid expression' };
  }
};

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleButtonClick = (value: string) => {
    setError(null);
    
    switch (value) {
      case '=':
        try {
          const { result: calculatedResult, error: evalError } = safeEval(expression);
          if (evalError) {
            setError(evalError);
            toast({
              variant: "destructive",
              title: "Calculation Error",
              description: evalError,
            });
          } else {
            setResult(calculatedResult);
            // In a real app, you would save to history here
          }
        } catch (e) {
          setError('Error calculating result');
          toast({
            variant: "destructive",
            title: "Calculation Error",
            description: "Could not calculate the expression",
          });
        }
        break;
      case 'C':
        setExpression('');
        setResult('');
        setError(null);
        break;
      case '⌫':
        setExpression(expression.slice(0, -1));
        break;
      default:
        setExpression(expression + value);
    }
  };
  
  const basicButtons = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+']
  ];
  
  const scientificButtons = [
    ['sin', 'cos', 'tan'],
    ['log', 'ln', 'e'],
    ['(', ')', 'π'],
    ['C', '⌫', '^']
  ];

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardContent className="p-4">
        <CalculatorDisplay expression={expression} result={result} error={error || undefined} />
        
        <div className="grid grid-cols-4 gap-2">
          {/* Scientific functions - only shown on larger screens or toggled view */}
          {!isMobile && (
            <>
              {scientificButtons.map((row, rowIndex) => (
                <React.Fragment key={`sci-row-${rowIndex}`}>
                  {row.map((btn) => (
                    <CalculatorButton
                      key={`sci-${btn}`}
                      value={btn}
                      onClick={handleButtonClick}
                      buttonType={['sin', 'cos', 'tan', 'log', 'ln'].includes(btn) ? 'function' : 'operator'}
                    />
                  ))}
                </React.Fragment>
              ))}
            </>
          )}
          
          {/* Basic calculator buttons */}
          {basicButtons.map((row, rowIndex) => (
            <React.Fragment key={`basic-row-${rowIndex}`}>
              {row.map((btn) => (
                <CalculatorButton
                  key={`basic-${btn}`}
                  value={btn}
                  onClick={handleButtonClick}
                  buttonType={
                    btn === '=' ? 'equals' : 
                    ['+', '-', '*', '/', '^'].includes(btn) ? 'operator' : 'normal'
                  }
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
