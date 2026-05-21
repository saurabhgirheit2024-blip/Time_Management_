import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Shield, Bell, Moon, Sun, ChevronRight, Save } from 'lucide-react';
import { Card, Button, Input, cn } from '../components/UI';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const { profile, updateProfile } = useAuth();
  const [name, setName] = useState(profile?.displayName || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [role, setRole] = useState(profile?.role || 'student');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({ displayName: name, role });
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Manage your profile and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1 flex flex-col gap-4">
          <Card className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-950/30">
                <User className="h-12 w-12 text-emerald-600" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.displayName}</h2>
              <p className="text-sm text-zinc-500">{profile.role === 'tech' ? 'Tech Student' : 'Academic Student'}</p>
            </div>
            <Button variant="outline" size="sm" className="w-full">Edit Avatar</Button>
          </Card>

          <Card className="flex flex-col gap-2 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Stats</p>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Member since</span>
              <span className="text-sm font-medium">{new Date(profile.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Sessions done</span>
              <span className="text-sm font-medium">{profile.tasksCompleted}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Total minutes</span>
              <span className="text-sm font-medium">{profile.totalMinutes}</span>
            </div>
          </Card>
        </div>

        <div className="md:col-span-2 flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input value={email} disabled className="opacity-50 cursor-not-allowed" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Your Role</label>
              <div className="flex gap-4">
                {['student', 'tech'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex-1 rounded-xl border-2 p-4 text-center font-medium transition-all',
                      role === r
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
                        : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900'
                    )}
                  >
                    {r === 'tech' ? 'Tech Student' : 'Academic Student'}
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-fit gap-2" onClick={handleSave} isLoading={isSaving}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </Card>

          <Card className="flex flex-col gap-6">
            <h3 className="text-lg font-bold">Preferences</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                    <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <p className="font-medium">Notifications</p>
                    <p className="text-xs text-zinc-500">Receive reminders for daily sessions</p>
                  </div>
                </div>
                <button className="h-6 w-11 rounded-full bg-emerald-600 p-1">
                  <div className="h-4 w-4 translate-x-5 rounded-full bg-white transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                    {theme === 'light' ? <Sun className="h-5 w-5 text-zinc-600" /> : <Moon className="h-5 w-5 text-zinc-400" />}
                  </div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-xs text-zinc-500">Toggle between light and dark themes</p>
                  </div>
                </div>
                <button
                  onClick={toggleTheme}
                  className={cn(
                    'h-6 w-11 rounded-full p-1 transition-colors',
                    theme === 'dark' ? 'bg-emerald-600' : 'bg-zinc-200 dark:bg-zinc-700'
                  )}
                >
                  <div className={cn(
                    'h-4 w-4 rounded-full bg-white transition-transform',
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
                  )} />
                </button>
              </div>
            </div>
          </Card>

          <Card className="border-red-100 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
                <p className="text-sm text-red-600/70">Permanently delete your account and all data.</p>
              </div>
              <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
