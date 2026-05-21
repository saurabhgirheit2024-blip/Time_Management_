import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, BookOpen, Code, Newspaper, ChevronRight } from 'lucide-react';
import { Button, Card, cn } from '../components/UI';
import { useNavigate } from 'react-router-dom';

const timeSlots = [
  { label: '5 min', value: 5 },
  { label: '10 min', value: 10 },
  { label: '15 min', value: 15 },
  { label: '20 min', value: 20 },
  { label: '25 min', value: 25 },
  { label: '30 min', value: 30 },
  { label: '40 min', value: 40 },
  { label: '45 min', value: 45 },
  { label: '50 min', value: 50 },
  { label: '55 min', value: 55 },
  { label: '60 min', value: 60 },
];

const domains = [
  { id: 'student', label: 'Academic Student', icon: BookOpen, color: 'bg-blue-500', description: 'Physics, Chemistry, Math, Biology quizzes' },
  { id: 'tech', label: 'Tech Student', icon: Code, color: 'bg-emerald-500', description: 'DSA, MCQs, Aptitude coding problems' },
  { id: 'general', label: 'General Reader', icon: Newspaper, color: 'bg-amber-500', description: 'Short summarized news articles' },
];

const languages = ['JavaScript', 'Python', 'C++', 'Java'];

export default function Home() {
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('JavaScript');
  const navigate = useNavigate();

  const handleStart = () => {
    if (selectedTime && selectedDomain) {
      const langParam = selectedDomain === 'tech' ? `&lang=${selectedLanguage}` : '';
      navigate(`/quiz?time=${selectedTime}&domain=${selectedDomain}&questions=${selectedTime}${langParam}`);
    }
  };

  return (
    <div className="flex flex-col gap-12 py-12">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Make every <span className="text-emerald-600">minute</span> count.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-lg text-zinc-600 dark:text-zinc-400"
        >
          Turn your short free slots into productive learning sessions.
        </motion.p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">How much time do you have?</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => setSelectedTime(slot.value)}
                className={cn(
                  'flex h-12 items-center justify-center rounded-xl border-2 font-medium transition-all cursor-pointer',
                  selectedTime === slot.value
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
                    : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900'
                )}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-600" />
            <h2 className="text-xl font-semibold">What's your focus today?</h2>
          </div>
          <div className="flex flex-col gap-3">
            {domains.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={cn(
                  'flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all',
                  selectedDomain === domain.id
                    ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'border-zinc-100 bg-zinc-50 hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900'
                )}
              >
                <div className={cn('rounded-lg p-2 text-white', domain.color)}>
                  <domain.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{domain.label}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{domain.description}</p>
                </div>
                {selectedDomain === domain.id && <ChevronRight className="h-5 w-5 text-emerald-600" />}
              </button>
            ))}
          </div>

          {selectedDomain === 'tech' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 flex flex-col gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800"
            >
              <p className="text-sm font-medium text-zinc-500">Select Language</p>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={cn(
                      'rounded-lg border px-3 py-2 text-sm font-medium transition-all',
                      selectedLanguage === lang
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30'
                        : 'border-zinc-100 bg-white hover:border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </Card>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <Button
          size="lg"
          className="h-16 w-full max-w-md gap-2 rounded-2xl text-xl shadow-lg shadow-emerald-600/20"
          disabled={!selectedTime || !selectedDomain}
          onClick={handleStart}
        >
          Start Session
          <ChevronRight className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}
