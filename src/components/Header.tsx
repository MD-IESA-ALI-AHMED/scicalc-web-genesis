
import React from 'react';
import { Calculator } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { Button } from './ui/button';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <Calculator className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">SciCalc Web</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <Button variant="outline">History</Button>
        <Button>Sign In</Button>
      </div>
    </header>
  );
};

export default Header;
