import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Github, Chrome } from 'lucide-react';
import { Button, Card, Input } from '../components/UI';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    setRotateX(-y / 15);
    setRotateY(x / 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmail(email, password);
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in the Firebase Console. Please enable it in the Authentication > Sign-in method tab.');
      } else {
        setError(error.message || 'Failed to log in');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      if (error.code === 'auth/operation-not-allowed') {
        setError('Google authentication is not enabled in the Firebase Console. Please enable it in the Authentication > Sign-in method tab.');
      } else {
        setError(error.message || 'Failed to log in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden py-12">
      {/* 3D Animated Background Grid & Orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[70vw] w-[70vw] rounded-full bg-emerald-500/20 blur-[120px] dark:bg-emerald-500/10 animate-pulse" />
        <div className="absolute -right-1/4 -bottom-1/4 h-[70vw] w-[70vw] rounded-full bg-blue-500/20 blur-[120px] dark:bg-blue-500/10 animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Futuristic glowing grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="w-full max-w-md px-4"
      >
        <Card 
          style={{ transformStyle: 'preserve-3d' }}
          className="relative flex flex-col gap-8 p-8 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 shadow-2xl rounded-2xl overflow-hidden"
        >
          {/* Subtle glossy card reflection glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          
          <div style={{ transform: 'translateZ(30px)' }} className="text-center transition-all duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 font-medium">Log in to your Time account</p>
          </div>

          {error && (
            <div style={{ transform: 'translateZ(25px)' }} className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400 border border-red-200/50 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ transform: 'translateZ(40px)', transformStyle: 'preserve-3d' }} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-11 border-zinc-200/80 dark:border-zinc-800/80 rounded-xl"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
                <Link to="#" className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-zinc-400" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-11 border-zinc-200/80 dark:border-zinc-800/80 rounded-xl"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button type="submit" className="mt-3 h-11 w-full gap-2 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 dark:from-emerald-500 dark:to-blue-500 shadow-lg shadow-emerald-500/20 rounded-xl font-bold" isLoading={isLoading}>
              <LogIn className="h-4 w-4" />
              Log In
            </Button>
          </form>

          <div style={{ transform: 'translateZ(20px)' }} className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-3 text-zinc-500 dark:text-zinc-400 font-semibold">Or continue with</span>
            </div>
          </div>

          <div style={{ transform: 'translateZ(30px)' }} className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 gap-2 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl" onClick={handleGoogleLogin} isLoading={isLoading}>
              <Chrome className="h-4 w-4 text-red-500" />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">Google</span>
            </Button>
            <Button variant="outline" className="h-11 gap-2 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-xl">
              <Github className="h-4 w-4 text-zinc-800 dark:text-white" />
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">GitHub</span>
            </Button>
          </div>

          <p style={{ transform: 'translateZ(20px)' }} className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">Sign Up</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
