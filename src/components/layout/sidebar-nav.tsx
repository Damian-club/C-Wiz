"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Library, Settings, User, Music2 } from 'lucide-react';
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/contexts/auth-context';
import { useTheme } from '@/contexts/theme-context';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const navItems = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/search', label: 'Buscar', icon: Search },
  { href: '/library', label: 'Biblioteca', icon: Library },
  { href: '/settings', label: 'Configuración', icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();

  const handleThemeChange = (checked: boolean) => {
    setThemeMode(checked ? 'dark' : 'light');
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-16 w-16"/>
          {/*<Music2 className="h-8 w-8 text-primary" />*/}
          <h1 className="font-headline text-2xl font-semibold group-data-[collapsible=icon]:hidden">C-Wiz</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton 
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  aria-label={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 space-y-2">
         <div className="flex items-center justify-between px-2 group-data-[collapsible=icon]:hidden">
            <Label htmlFor="theme-switch" className="text-sm">Modo oscuro</Label>
            <Switch
              id="theme-switch"
              checked={themeMode === 'dark'}
              onCheckedChange={handleThemeChange}
            />
          </div>
        {user ? (
          <SidebarGroup>
             <Link href="/profile" legacyBehavior passHref>
              <SidebarMenuButton tooltip="Profile" aria-label="Profile">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://placehold.co/40x40/151948/fcfcfc.png?text=${user.displayName?.[0] || 'U'}`} alt={user.displayName || "User"} data-ai-hint="user avatar" />
                  <AvatarFallback>{user.displayName?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <span className="truncate">{user.displayName || user.email}</span>
              </SidebarMenuButton>
            </Link>
            <Button variant="ghost" onClick={logout} className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              <User className="mr-2 group-data-[collapsible=icon]:mr-0" />
              <span className="group-data-[collapsible=icon]:hidden">Salir</span>
            </Button>
          </SidebarGroup>
        ) : (
          <SidebarGroup>
            <Link href="/login" legacyBehavior passHref>
                <SidebarMenuButton tooltip="Login" aria-label="Login">
                    <User />
                    <span>Iniciar sesión</span>
                </SidebarMenuButton>
            </Link>
          </SidebarGroup>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
