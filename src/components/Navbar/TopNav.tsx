"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Briefcase,
  MessageCircle,
  User,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/learn", icon: BookOpen, label: "Learn" },
  { href: "/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
];

type UserType = {
  name: string;
  avatarUrl?: string;
};

function NavLinkItem({
  href,
  label,
  Icon,
  active,
  onClick,
  className,
}: {
  href: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        className
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="leading-none">{label}</span>
    </Link>
  );
}

export function TopNav({
  appName = "Arunoda",
  logoSrc = "/logo.svg",
  user = null as UserType | null,
  onLogout,
}: {
  appName?: string;
  logoSrc?: string;
  user?: UserType | null;
  onLogout?: () => void;
}) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Close profile menu on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Subtle shadow when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        scrolled && "shadow-sm"
      )}
    >
      <nav className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8" aria-label="Primary">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <img
              src={logoSrc}
              alt={`${appName} logo`}
              className="h-7 w-7 hidden sm:block"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
            <span className="text-lg font-semibold tracking-tight group-hover:opacity-90">
              {appName}
            </span>
          </Link>

          {/* Center: Desktop nav (icons + labels) */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon }) => (
              <NavLinkItem key={href} href={href} label={label} Icon={Icon} active={isActive(href)} />
            ))}
          </div>

          {/* Right: Auth/Profile + Mobile toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Auth */}
            {!user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-border hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-muted/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-haspopup="menu"
                  aria-expanded={profileOpen}
                  aria-label="Open profile menu"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium max-w-[10rem] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>

                {profileOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-popover shadow-md p-1"
                  >
                    <Link
                      to="/profile"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        onLogout?.();
                      }}
                      className="w-full text-left rounded-md px-3 py-2 text-sm hover:bg-muted/60"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu (icons + labels) */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-in fade-in-50">
            <div className="flex flex-col gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                <NavLinkItem
                  key={href}
                  href={href}
                  label={label}
                  Icon={Icon}
                  active={isActive(href)}
                  onClick={() => setMobileOpen(false)}
                  className="justify-start"
                />
              ))}
            </div>

            {/* Mobile auth area */}
            {!user ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md border border-border hover:bg-muted/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <UserPlus className="h-4 w-4" />
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="mt-3 flex items-center justify-between rounded-md border border-border p-2">
                <div className="flex items-center gap-2">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="h-4 w-4 text-muted-foreground" />
                    </div>
                  )}
                  <div className="text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-muted-foreground">Signed in</div>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
