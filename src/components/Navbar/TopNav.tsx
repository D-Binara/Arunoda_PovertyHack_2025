"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Briefcase,
  MessageCircle,
  User,
  Users,
  Menu,
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/learn", icon: BookOpen, label: "Learn" },
  { href: "/jobs", icon: Briefcase, label: "Jobs" },
  { href: "/entrepreneurs", icon: Users, label: "Entrepreneurs" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
];

function NavLinkItem({ href, label, Icon, active, onClick, className }: any) {
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

export function TopNav() {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // close profile on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // subtle shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
      href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
      <header
          className={cn(
              "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow",
              scrolled && "shadow-sm"
          )}
      >
        <nav
            className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8"
            aria-label="Primary"
        >
          <div className="h-16 flex items-center justify-between">
            {/* Left: Brand */}
            <Link
                to="/"
                className="flex items-center gap-2 group shrink-0 select-none"
            >
              <img
                  src="/logo.svg"
                  alt="Arunoda logo"
                  className="h-7 w-7 hidden sm:block"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
              <span className="text-lg font-semibold tracking-tight group-hover:opacity-90">
              Arunoda
            </span>
            </Link>

            {/* Center: Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ href, label, icon: Icon }) => (
                  <NavLinkItem
                      key={href}
                      href={href}
                      label={label}
                      Icon={Icon}
                      active={isActive(href)}
                  />
              ))}
            </div>

            {/* Right: User / Auth */}
            <div className="flex items-center gap-2">
              {loading ? (
                  <div className="text-sm text-muted-foreground">Loading...</div>
              ) : isAuthenticated && user ? (
                  <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => setProfileOpen((v) => !v)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-muted/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="hidden sm:flex flex-col items-start leading-tight text-left">
                    <span className="text-sm font-medium text-foreground">
                      {user.name}
                    </span>
                        <span className="text-[11px] text-muted-foreground capitalize">
                      {user.role?.replace("_", " ")}
                          {user.district ? ` · ${user.district}` : ""}
                    </span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </button>

                    {profileOpen && (
                        <div
                            className="absolute right-0 mt-3 w-56 rounded-xl border border-border bg-popover shadow-lg overflow-hidden"
                            role="menu"
                        >
                          <div className="p-3 border-b border-border bg-muted/30">
                            <p className="text-sm font-medium text-foreground">
                              {user.name}
                            </p>
                            <p className="text-xs text-muted-foreground break-all">
                              {user.email}
                            </p>
                          </div>

                          <Link
                              to="/profile"
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/60"
                              onClick={() => setProfileOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                          {/*<Link*/}
                          {/*    to="/settings"*/}
                          {/*    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/60"*/}
                          {/*    onClick={() => setProfileOpen(false)}*/}
                          {/*>*/}
                          {/*  <Settings className="h-4 w-4" />*/}
                          {/*  Settings*/}
                          {/*</Link>*/}
                          <button
                              onClick={() => {
                                setProfileOpen(false);
                                logout();
                              }}
                              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                    )}
                  </div>
              ) : (
                  <div className="hidden md:flex items-center gap-2">
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-border hover:bg-muted/50 transition-colors"
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                    <Link
                        to="/signup"
                        className="inline-flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90"
                    >
                      <UserPlus className="h-4 w-4" />
                      Sign up
                    </Link>
                  </div>
              )}

              {/* Mobile toggle */}
              <button
                  className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-border hover:bg-muted/60"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
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

                {/* Mobile Auth/User section */}
                {isAuthenticated && user ? (
                    <div className="mt-4 flex flex-col items-start gap-2 border-t border-border pt-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user.role} {user.district && `· ${user.district}`}
                          </p>
                        </div>
                      </div>
                      <button
                          onClick={logout}
                          className="text-sm px-3 py-1.5 rounded-md border border-border hover:bg-muted/60 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                ) : (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                          to="/login"
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md border border-border hover:bg-muted/50 transition-colors"
                      >
                        <LogIn className="h-4 w-4" />
                        Login
                      </Link>
                      <Link
                          to="/signup"
                          className="inline-flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                      >
                        <UserPlus className="h-4 w-4" />
                        Sign up
                      </Link>
                    </div>
                )}
              </div>
          )}
        </nav>
      </header>
  );
}
