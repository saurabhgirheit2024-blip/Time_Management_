import React from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Code, Newspaper, ChevronRight, Star, Zap } from 'lucide-react';
import { Card, Button, cn } from '../components/UI';
import { useNavigate } from 'react-router-dom';

const recommendations = [
  { id: 1, title: 'Physics: Thermodynamics', domain: 'student', time: 15, difficulty: 'Medium', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 2, title: 'DSA: Binary Search', domain: 'tech', time: 30, difficulty: 'Hard', icon: Code, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  { id: 3, title: 'Latest AI Breakthroughs', domain: 'general', time: 10, difficulty: 'Easy', icon: Newspaper, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  { id: 4, title: 'Chemistry: Chemical Bonding', domain: 'student', time: 20, difficulty: 'Medium', icon: BookOpen, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  { id: 5, title: 'Aptitude: Probability', domain: 'tech', time: 15, difficulty: 'Easy', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
];

export default function TasksPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recommended Tasks</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Smart suggestions based on your past performance.</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Star className="h-4 w-4" />
          Personalize
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((task) => (
          <Card key={task.id} className="group flex flex-col gap-6 transition-all hover:border-emerald-600 dark:hover:border-emerald-600">
            <div className="flex items-start justify-between">
              <div className={cn('rounded-xl p-3', task.bg)}>
                <task.icon className={cn('h-6 w-6', task.color)} />
              </div>
              <span className={cn(
                'rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider',
                task.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' :
                task.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              )}>
                {task.difficulty}
              </span>
            </div>
            
            <div>
              <h3 className="text-xl font-bold group-hover:text-emerald-600 transition-colors">{task.title}</h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {task.domain === 'student' ? 'Academic' : task.domain === 'tech' ? 'Tech' : 'General'} • {task.time} min
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                className="w-full gap-2"
                onClick={() => navigate(`/quiz?time=${task.time}&domain=${task.domain}`)}
              >
                Start Now
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="bg-zinc-900 text-white p-8 overflow-hidden relative">
        <div className="relative z-10 flex flex-col gap-4 max-w-lg">
          <h2 className="text-2xl font-bold">Want something specific?</h2>
          <p className="text-zinc-400">Customize your session by choosing your own time and topic on the home page.</p>
          <Button variant="primary" className="w-fit" onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
        <Clock className="absolute -right-12 -bottom-12 h-64 w-64 text-white/5 rotate-12" />
      </Card>
    </div>
  );
}
