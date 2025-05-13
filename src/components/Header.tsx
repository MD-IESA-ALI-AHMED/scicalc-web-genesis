
import React from 'react';
import { Calculator } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b bg-gradient-to-r from-background to-background/90 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">SciCalc Web</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
