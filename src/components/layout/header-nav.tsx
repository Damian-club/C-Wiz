"use client";

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { User } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';

export function HeaderNav() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          {/* Optional: App Logo/Name if not in sidebar or for branding consistency */}
        </div>
        
        {/* Mobile sidebar trigger */}
        <div className="md:hidden">
           <SidebarTrigger />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Future: Global search bar can go here */}
          <nav className="flex items-center">
            {user ? (
              <Link href="/profile">
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
