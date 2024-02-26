'use client';

import { useTheme } from 'next-themes';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger role="menuitem" className="w-full">
        <p className="text-start text-sm px-[8px] py-[6px] hover:bg-accent focus:bg-accent focus:text-accent-foreground cursor-default rounded-sm">
          Theme
        </p>
      </DialogTrigger>
      <DialogContent className="py-10">
        <Button variant="outline" onClick={() => setTheme('light')}>
          <Sun />
        </Button>
        <Button variant="outline" onClick={() => setTheme('dark')}>
          <Moon />
        </Button>
        <Button variant="outline" onClick={() => setTheme('system')}>
          System
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ThemeToggle;
