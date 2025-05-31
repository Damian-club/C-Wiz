"use client";

import React, { useEffect } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { HeaderNav } from './header-nav'; // Mobile header, or main header if sidebar is always there
import { MusicPlayerBar } from '@/components/music/music-player-bar';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { FullScreenPlayerModal } from '@/components/music/fullscreen-player-modal';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading C-Wiz...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the redirect, but as a fallback:
    return null; 
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <SidebarNav />
        <div className="flex flex-1 flex-col">
          <HeaderNav />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
          </main>
          <MusicPlayerBar />
          <FullScreenPlayerModal />
        </div>
      </div>
    </SidebarProvider>
  );
}
