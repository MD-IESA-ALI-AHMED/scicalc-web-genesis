
import React from 'react';
import Header from '@/components/Header';
import Calculator from '@/components/Calculator/Calculator';
import { ThemeProvider } from '@/context/ThemeContext';

const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-6 text-center">Scientific Calculator</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center max-w-2xl">
              Perform advanced mathematical calculations with our powerful scientific calculator.
              Perfect for engineering students and professionals.
            </p>
            
            <div className="w-full max-w-md mb-8">
              <Calculator />
            </div>
            
            <div className="text-center text-sm text-muted-foreground mt-8">
              <p>© 2025 SciCalc Web. All rights reserved.</p>
              <p>Version 0.1.0</p>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Index;
