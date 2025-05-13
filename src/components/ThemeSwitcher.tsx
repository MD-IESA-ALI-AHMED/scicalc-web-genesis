
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Palette } from 'lucide-react';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === 'light' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('light')}
        title="Light theme"
        className="rounded-full"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      
      <Button
        variant={theme === 'dark' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('dark')}
        title="Dark theme"
        className="rounded-full"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>

      <Button
        variant={theme === 'vibrant' ? 'default' : 'outline'}
        size="icon"
        onClick={() => setTheme('vibrant')}
        title="Vibrant theme"
        className="rounded-full"
      >
        <Palette className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
