import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Clock, LayoutDashboard, Trophy, User, LogOut, Sun, Moon, Menu, X, Zap, BookOpen } from 'lucide-react';
import { cn } from './UI';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Background3D } from './Background3D';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = user ? [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Tasks', href: '/tasks', icon: Clock },
    { label: 'Focus', href: '/focus', icon: Zap },
    { label: 'Library', href: '/library', icon: BookOpen },
    { label: 'Progress', href: '/progress', icon: Trophy },
    { label: 'Profile', href: '/profile', icon: User },
  ] : [];

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-600">
              <Clock className="h-6 w-6" />
              <span>Time</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-600',
                  location.pathname === item.href ? 'text-emerald-600' : 'text-zinc-600 dark:text-zinc-400'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {!user ? (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-semibold text-zinc-600 hover:text-emerald-600 dark:text-zinc-400">
                  Log In
                </Link>
                <Link to="/signup" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-500/10">
                  Sign Up
                </Link>
              </div>
            ) : (
              <button 
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-red-600 dark:text-zinc-400 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors hover:text-emerald-600',
                  location.pathname === item.href ? 'text-emerald-600' : 'text-zinc-600 dark:text-zinc-400'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            
            {!user ? (
              <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 items-center justify-center rounded-xl border border-zinc-200 text-sm font-semibold text-zinc-700 dark:border-zinc-800 dark:text-zinc-300"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400"
                >
                  {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Theme
                </button>
                <button 
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-zinc-100 relative overflow-x-hidden">
      <Background3D />
      {/* Decorative ambient glowing radial circles */}
      <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <div>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
