import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, Target, Clock, ChevronRight, TrendingUp, Sparkles } from 'lucide-react';
import { Card, Button, cn } from '../components/UI';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import { Recommendation } from '../services/geminiService';
import { useNavigate } from 'react-router-dom';

const data = [
  { name: 'Mon', minutes: 20 },
  { name: 'Tue', minutes: 45 },
  { name: 'Wed', minutes: 30 },
  { name: 'Thu', minutes: 60 },
  { name: 'Fri', minutes: 15 },
  { name: 'Sat', minutes: 40 },
  { name: 'Sun', minutes: 50 },
];

export default function Dashboard() {
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  
  useEffect(() => {
    const fetchRecs = async () => {
      if (!user) return;
      setLoadingRecs(true);
      try {
        const allSessions = JSON.parse(localStorage.getItem('time_sessions') || '{}');
        const userSessions = allSessions[user.uid] || [];
        const recs = await apiService.getRecommendations(userSessions);
        setRecommendations(recs);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setLoadingRecs(false);
      }
    };

    fetchRecs();
  }, [user]);

  const stats = [
    { label: 'Level', value: `${profile?.level || 1}`, icon: Trophy, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { label: 'Total Time', value: `${profile?.totalMinutes || 0} min`, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { label: 'Daily Streak', value: `${profile?.streak || 0} days`, icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/30' },
    { label: 'Tasks Done', value: `${profile?.tasksCompleted || 0}`, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  ];

  const xpProgress = profile ? ((profile.xp || 0) / ((profile.level || 1) * 100)) * 100 : 0;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {profile?.displayName || 'User'}!</h1>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
              <Trophy className="h-3 w-3" />
              Level {profile?.level || 1}
            </div>
            <div className="flex flex-1 items-center gap-2 min-w-[150px]">
              <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div 
                  className="h-full rounded-full bg-amber-500 transition-all duration-500" 
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                {profile?.xp || 0} / {(profile?.level || 1) * 100} XP
              </span>
            </div>
          </div>
        </div>
        <Button className="gap-2" onClick={() => navigate('/')}>
          New Session
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex items-center gap-4 p-4">
            <div className={cn('rounded-xl p-3', stat.bg)}>
              <stat.icon className={cn('h-6 w-6', stat.color)} />
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              <h2 className="text-xl font-semibold">Weekly Activity</h2>
            </div>
            <select className="rounded-lg border border-zinc-200 bg-transparent px-2 py-1 text-sm dark:border-zinc-800">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorMinutes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Smart Path</h2>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex flex-col gap-4">
            {loadingRecs ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 w-full animate-pulse rounded-xl bg-zinc-100 dark:bg-zinc-800" />
                ))}
              </div>
            ) : recommendations.length > 0 ? (
              recommendations.map((task) => (
                <div
                  key={task.title}
                  onClick={() => navigate(`/quiz?time=${task.time}&domain=${task.type.toLowerCase() === 'academic' ? 'student' : task.type.toLowerCase()}`)}
                  className="group flex cursor-pointer items-center justify-between rounded-xl border border-zinc-100 p-4 transition-all hover:border-emerald-600 hover:bg-emerald-50 dark:border-zinc-800 dark:hover:bg-emerald-950/30"
                >
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-emerald-600">{task.title}</p>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                      {task.type} • {task.time} min
                    </p>
                    <p className="mt-1 text-[10px] italic text-zinc-400 line-clamp-1">{task.reason}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-400 group-hover:text-emerald-600" />
                </div>
              ))
            ) : (
              <p className="text-center text-sm text-zinc-500">No recommendations yet. Start a session!</p>
            )}
          </div>
          <Button variant="outline" className="w-full" onClick={() => navigate('/tasks')}>
            View All Tasks
          </Button>
        </Card>
      </div>
    </div>
  );
}
