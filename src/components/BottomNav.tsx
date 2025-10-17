"use client";

import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Briefcase, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/learn', icon: BookOpen, label: 'Learn' },
  { href: '/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/messages', icon: MessageCircle, label: 'Messages' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 max-w-screen-lg mx-auto">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'touch-target flex flex-col items-center justify-center gap-1 transition-colors',
                isActive
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
