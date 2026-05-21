import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle2, Clock, Calendar, ChevronRight, Filter, Flame } from 'lucide-react';
import { Card, Button, cn } from '../components/UI';
import { useAuth } from '../context/AuthContext';
import { format, subDays, startOfYear, endOfYear } from 'date-fns';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface UserSession {
  id: string;
  domain: string;
  title: string;
  completedAt: string;
  time: number;
  score: number | null;
}

export default function ProgressPage() {
  const { user } = useAuth();
  const [history, setHistory] = React.useState<UserSession[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user) return;

    const loadHistory = () => {
      const allSessions = JSON.parse(localStorage.getItem('time_sessions') || '{}');
      const userSessions = allSessions[user.uid] || [];
      // Sort by completedAt desc
      const sortedSessions = [...userSessions].sort((a: UserSession, b: UserSession) =>
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      setHistory(sortedSessions);
      setLoading(false);
    };

    loadHistory();
  }, [user]);

  const chartData = React.useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const d = subDays(new Date(), 6 - i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const count = history.filter(s => format(new Date(s.completedAt), 'yyyy-MM-dd') === dateStr).length;
      return { name: format(d, 'EEE'), count };
    });
  }, [history]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Progress</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Track your journey and consistency.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <h2 className="text-xl font-semibold">Weekly Activity</h2>
          </div>
          <p className="text-xs text-zinc-500">Last 7 days</p>
        </div>
        <div className="h-48 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#71717a' }} dy={10} />
              <Tooltip
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', backgroundColor: 'var(--tw-bg-opacity, white)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                labelStyle={{ color: '#71717a', marginBottom: '4px' }}
                formatter={(value: number) => [`${value} sessions`, 'Activity']}
              />
              <Bar dataKey="count" fill="#10b981" radius={[6, 6, 6, 6]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Recent Sessions</h2>
          {history.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <Clock className="h-12 w-12 text-zinc-300 mb-4" />
              <p className="text-zinc-500">No sessions completed yet.</p>
              <Button variant="ghost" className="mt-4" onClick={() => window.location.href = '/'}>
                Start your first session
              </Button>
            </Card>
          ) : (
            history.map((item) => (
              <Card key={item.id} className="flex items-center justify-between p-4 transition-all hover:border-emerald-600 dark:hover:border-emerald-600">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'rounded-xl p-3',
                    item.domain === 'student' ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/30' :
                      item.domain === 'tech' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30' : 'bg-amber-50 text-amber-600 dark:bg-amber-950/30'
                  )}>
                    {item.domain === 'student' ? <Trophy className="h-5 w-5" /> :
                      item.domain === 'tech' ? <CheckCircle2 className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {new Date(item.completedAt).toLocaleDateString()} • {item.time} min
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {item.score !== null ? (
                    <p className={cn(
                      'text-xl font-bold',
                      item.score >= 80 ? 'text-emerald-600' : item.score >= 50 ? 'text-amber-600' : 'text-red-600'
                    )}>
                      {item.score}%
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Completed</p>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-6">
            <h2 className="text-xl font-semibold">Badges & Achievements</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Early Bird', icon: '🌅', unlocked: true },
                { label: 'Streak King', icon: '🔥', unlocked: true },
                { label: 'Code Master', icon: '💻', unlocked: false },
                { label: 'News Junkie', icon: '📰', unlocked: true },
                { label: 'Night Owl', icon: '🦉', unlocked: false },
                { label: 'Perfect Score', icon: '💯', unlocked: true },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all',
                    badge.unlocked ? 'bg-zinc-50 dark:bg-zinc-900' : 'opacity-30 grayscale'
                  )}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <p className="text-[10px] font-bold uppercase tracking-tight">{badge.label}</p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs">
              View All Achievements
            </Button>
          </Card>

          <Card className="flex flex-col gap-4 bg-emerald-600 text-white">
            <h3 className="text-lg font-bold">Consistency is Key!</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              You've completed {history.length} tasks in total. Keep it up!
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-white/20">
              <div className="h-full w-3/4 rounded-full bg-white" />
            </div>
            <p className="text-xs font-medium opacity-80">75% of your weekly goal reached</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
