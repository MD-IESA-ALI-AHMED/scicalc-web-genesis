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
    // Replace special function names with their Math equivalents
    let sanitizedExpression = expression
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/asin\(/g, 'Math.asin(')
      .replace(/acos\(/g, 'Math.acos(')
      .replace(/atan\(/g, 'Math.atan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/π/g, 'Math.PI')
      .replace(/e(?![a-zA-Z0-9])/g, 'Math.E')
      .replace(/\^/g, '**')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/√([0-9]+)/g, 'Math.sqrt($1)')
      .replace(/(\d+)!/g, 'factorial($1)');
      
    // Define factorial function
    const factorial = (n: number): number => {
      if (n <= 1) return 1;
      return n * factorial(n - 1);
    };

    // Evaluate the sanitized expression
    // eslint-disable-next-line no-eval
    const result = eval(`
      const factorial = (n) => {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
      };
      ${sanitizedExpression}
    `);
    
    return { result: String(result), error: null };
  } catch (e) {
    console.error("Calculation error:", e);
    return { result: '', error: 'Invalid expression' };
  }
};

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const isMobile = useIsMobile();

  const handleButtonClick = (value: string) => {
    setError(null);
    
    switch (value) {
      case '=':
        try {
          let processedExpression = expression;
          
          // Convert degrees to radians for trigonometric functions if in degree mode
          if (angleMode === 'deg') {
            // Find sin, cos, tan calls and convert their arguments
            processedExpression = processedExpression
              .replace(/sin\(([^)]+)\)/g, (_, arg) => `sin((${arg}) * Math.PI / 180)`)
              .replace(/cos\(([^)]+)\)/g, (_, arg) => `cos((${arg}) * Math.PI / 180)`)
              .replace(/tan\(([^)]+)\)/g, (_, arg) => `tan((${arg}) * Math.PI / 180)`)
              .replace(/asin\(([^)]+)\)/g, (_, arg) => `asin(${arg}) * 180 / Math.PI`)
              .replace(/acos\(([^)]+)\)/g, (_, arg) => `acos(${arg}) * 180 / Math.PI`)
              .replace(/atan\(([^)]+)\)/g, (_, arg) => `atan(${arg}) * 180 / Math.PI`);
          }
          
          const { result: calculatedResult, error: evalError } = safeEval(processedExpression);
          
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
          console.error("Error calculating result:", e);
          setError('Error calculating result');
          toast({
            variant: "destructive",
            title: "Calculation Error",
            description: "Could not calculate the expression",
          });
        }
        break;
      case 'C':
      case 'AC':
        setExpression('');
        setResult('');
        setError(null);
        break;
      case '⌫':
      case 'Back':
        setExpression(expression.slice(0, -1));
        break;
      case 'Ans':
        if (result) {
          setExpression(expression + result);
        }
        break;
      case 'M+':
        // Add current result to memory (would require memory state)
        break;
      case 'M-':
        // Subtract current result from memory (would require memory state)
        break;
      case 'MR':
        // Recall memory (would require memory state)
        break;
      case 'sin':
      case 'cos':
      case 'tan':
      case 'log':
      case 'ln':
        setExpression(expression + value + '(');
        break;
      case 'sin⁻¹':
      case 'sin-1':
        setExpression(expression + 'asin(');
        break;
      case 'cos⁻¹':
      case 'cos-1':
        setExpression(expression + 'acos(');
        break;
      case 'tan⁻¹':
      case 'tan-1':
        setExpression(expression + 'atan(');
        break;
      case 'x²':
      case 'x^2':
        setExpression(expression + '^2');
        break;
      case 'x³':
      case 'x^3':
        setExpression(expression + '^3');
        break;
      case 'xʸ':
      case 'x^y':
        setExpression(expression + '^');
        break;
      case '√x':
        setExpression(expression + '√(');
        break;
      case 'ʸ√x':
      case '3√x':
        setExpression(expression + '^(1/3)');
        break;
      case 'eˣ':
      case 'e^x':
        setExpression(expression + 'e^');
        break;
      case '10ˣ':
      case '10^x':
        setExpression(expression + '10^');
        break;
      case '1/x':
        setExpression(expression + '1/');
        break;
      case '%':
        setExpression(expression + '/100');
        break;
      case 'π':
      case 'pi':
        setExpression(expression + 'π');
        break;
      case 'e':
        setExpression(expression + 'e');
        break;
      case 'DEG':
      case 'RAD':
      case 'Deg':
      case 'Rad':
        setAngleMode(value.toLowerCase() === 'deg' || value.toLowerCase() === 'deg' ? 'deg' : 'rad');
        break;
      case '.':
        // Ensure we don't add multiple decimal points to the same number
        if (!expression || /[^0-9]$/.test(expression) || !expression.split(/[^0-9.]/).pop()?.includes('.')) {
          setExpression(expression + value);
        }
        break;
      case 'n!':
        setExpression(expression + '!');
        break;
      case 'RND':
        setExpression(expression + Math.random().toFixed(4));
        break;
      case '±':
        // Toggle sign of the last number
        if (expression) {
          // Find the last number in the expression
          const match = expression.match(/[0-9.]+$/);
          if (match) {
            const lastNumber = match[0];
            const lastNumberIndex = expression.lastIndexOf(lastNumber);
            const isNegative = expression[lastNumberIndex - 1] === '-';
            const isPartOfOperator = lastNumberIndex > 0 && 
                                    ['+', '*', '/', '('].includes(expression[lastNumberIndex - 2]);
            
            if (isNegative && isPartOfOperator) {
              // Remove the negative sign
              setExpression(expression.substring(0, lastNumberIndex - 1) + expression.substring(lastNumberIndex));
            } else if (lastNumberIndex > 0) {
              // Insert a negative sign
              setExpression(expression.substring(0, lastNumberIndex) + '-' + expression.substring(lastNumberIndex));
            } else {
              // Number is at the start of the expression
              setExpression('-' + expression);
            }
          } else {
            // No number found, toggle the overall expression
            if (expression[0] === '-') {
              setExpression(expression.substring(1));
            } else {
              setExpression('-' + expression);
            }
          }
        }
        break;
      case 'EXP':
        setExpression(expression + 'e+');
        break;
      default:
        setExpression(expression + value);
    }
  };
  
  // Reorganized buttons with better grouping
  // Advanced scientific functions
  const scientificRowOne = ['sin', 'cos', 'tan', angleMode === 'deg' ? 'Rad' : 'Deg'];
  const scientificRowTwo = ['sin-1', 'cos-1', 'tan-1', 'π', 'e'];
  const scientificRowThree = ['x^2', 'x^3', 'x^y', '√x', 'ʸ√x'];
  const scientificRowFour = ['log', 'ln', 'e^x', '10^x', 'n!'];
  const scientificRowFive = ['(', ')', '1/x', '%', 'EXP'];

  return (
    <Card className="w-full max-w-md shadow-2xl bg-gradient-to-br from-card/90 to-background/50 backdrop-blur-sm border border-primary/10 rounded-xl overflow-hidden">
      <CardContent className="p-6">
        <CalculatorDisplay 
          expression={expression} 
          result={result} 
          error={error || undefined} 
          angleMode={angleMode} 
        />
        
        <div className="grid grid-cols-5 gap-2 mt-4">
          {/* Scientific buttons */}
          {!isMobile && (
            <>
              {[scientificRowOne, scientificRowTwo, scientificRowThree, scientificRowFour, scientificRowFive].map((row, rowIndex) => (
                <React.Fragment key={`sci-row-${rowIndex}`}>
                  {row.map((btn) => (
                    <CalculatorButton
                      key={`sci-${btn}`}
                      value={btn}
                      onClick={handleButtonClick}
                      buttonType={
                        ['sin', 'cos', 'tan', 'sin-1', 'cos-1', 'tan-1'].includes(btn) 
                          ? 'function' 
                          : ['Deg', 'Rad'].includes(btn) 
                          ? btn === (angleMode === 'deg' ? 'Deg' : 'Rad') ? 'active' : 'toggle' 
                          : ['π', 'e'].includes(btn)
                          ? 'constant'
                          : ['log', 'ln'].includes(btn)
                          ? 'function'
                          : ['(', ')'].includes(btn)
                          ? 'parenthesis'
                          : ['e^x', '10^x'].includes(btn)
                          ? 'function'
                          : 'operator'
                      }
                    />
                  ))}
                </React.Fragment>
              ))}
            </>
          )}

          {/* Memory row */}
          <CalculatorButton value="AC" onClick={handleButtonClick} buttonType="control" />
          <CalculatorButton value="Back" onClick={handleButtonClick} buttonType="control" />
          <CalculatorButton value="M+" onClick={handleButtonClick} buttonType="memory" />
          <CalculatorButton value="M-" onClick={handleButtonClick} buttonType="memory" />
          <CalculatorButton value="MR" onClick={handleButtonClick} buttonType="memory" />

          {/* Digits and operations - organized with digits on left */}
          <CalculatorButton value="7" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="8" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="9" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="/" onClick={handleButtonClick} buttonType="operator" />
          <CalculatorButton value="RND" onClick={handleButtonClick} buttonType="function" />
          
          <CalculatorButton value="4" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="5" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="6" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="*" onClick={handleButtonClick} buttonType="operator" />
          <CalculatorButton value="Ans" onClick={handleButtonClick} buttonType="memory" />
          
          <CalculatorButton value="1" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="2" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="3" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="-" onClick={handleButtonClick} buttonType="operator" />
          <CalculatorButton value="±" onClick={handleButtonClick} buttonType="operator" />
          
          <CalculatorButton value="0" onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="." onClick={handleButtonClick} buttonType="digit" />
          <CalculatorButton value="%" onClick={handleButtonClick} buttonType="operator" />
          <CalculatorButton value="+" onClick={handleButtonClick} buttonType="operator" />
          <CalculatorButton value="=" onClick={handleButtonClick} buttonType="equals" />
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
