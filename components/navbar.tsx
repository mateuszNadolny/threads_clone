'use client';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { AtSign, Home, Search, SquarePen, Heart, User, Menu } from 'lucide-react';

const Navbar = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();

  if (isLoaded) {
    return (
      <nav className="fixed top-0 left-0">
        <div className="fixed xl:top-0 bottom-0 h-[60px] lg:h-[75px] w-full flex justify-around lg:justify-center items-center lg:gap-[5rem] backdrop-blur-md">
          <Link
            href="/feed"
            className="w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95]">
            <Home
              className={cn(
                'h-[30px] w-[30px] stroke-border',
                pathname === '/feed' && 'stroke-primary'
              )}
            />
          </Link>
          <Link
            href="/search"
            className="w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95]">
            <Search
              className={cn(
                'h-[30px] w-[30px] stroke-border',
                pathname === '/search' && 'stroke-primary'
              )}
            />
          </Link>

          {isSignedIn && (
            <div className="w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95]">
              <SquarePen className="h-[30px] w-[30px] stroke-border" />
            </div>
          )}
          {isSignedIn && (
            <Link
              href="/activity"
              className="w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95]">
              <Heart
                className={cn(
                  'h-[30px] w-[30px] stroke-border',
                  pathname === '/activity' && 'stroke-primary'
                )}
              />
            </Link>
          )}
          {isSignedIn && (
            <Link
              href={`/${user?.username}`}
              className="w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95]">
              <User
                className={cn(
                  'h-[30px] w-[30px] stroke-border',
                  pathname === '/profile' && 'stroke-primary'
                )}
              />
            </Link>
          )}
        </div>
        <div className="lg:hidden fixed top-0 h-[60px] backdrop-blur-md w-screen flex items-center justify-between lg:px-[21rem] lg:backdrop-blur-none  lg:bg-transparent pointer-event-none" />
        <Link
          href="/feed"
          className="fixed left-[50%] translate-x-[-50%]  w-[60px] h-[60px] hover:bg-gray-800/50 flex items-center justify-center rounded-xl active:scale-[.95] xl:top-[10px] xl:left-[21rem]">
          <AtSign className="h-[38px] w-[38px]" />
        </Link>

        <div
          className={cn(
            'fixed right-[.5rem]  w-[60px] h-[60px] flex items-center justify-center rounded-xl active:scale-[.95] xl:top-[10px] xl:right-[21rem]',
            isSignedIn && 'hover:bg-gray-800/50'
          )}>
          {isSignedIn ? (
            <Menu className="h-[30px] w-[30px] stroke-border" />
          ) : (
            <Link href="/sign-in" className="mr-3">
              <Button className="h-[30px]">Sign in</Button>
            </Link>
          )}
        </div>
      </nav>
    );
  }
};

export default Navbar;
