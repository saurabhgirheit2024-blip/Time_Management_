import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Coffee, Wind, Music, Volume2, VolumeX, Moon, Target } from 'lucide-react';
import { Card, Button, cn } from '../components/UI';

const PRESETS = [
  { name: 'Focus', time: 25, icon: Target },
  { name: 'Short Break', time: 5, icon: Coffee },
  { name: 'Long Break', time: 15, icon: Moon },
];

const SOUNDS = [
  { name: 'Rain', icon: Wind, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }, // Placeholder
  { name: 'Cafe', icon: Coffee, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' }, // Placeholder
  { name: 'Lofi', icon: Music, url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }, // Placeholder
];

// Interactive 3D Pomodoro Focus Sphere
export function FocusSphere3D({ isActive, progress }: { isActive: boolean; progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 280;
    let height = canvas.height = 280;

    interface Particle {
      x3d: number;
      y3d: number;
      z3d: number;
      x2d: number;
      y2d: number;
      size: number;
      color: string;
    }

    const numParticles = 110;
    const particles: Particle[] = [];
    const sphereRadius = 80;

    // Distribute particles evenly on sphere surface using spherical coordinates
    for (let i = 0; i < numParticles; i++) {
      const theta = Math.acos(Math.random() * 2 - 1);
      const phi = Math.random() * Math.PI * 2;

      particles.push({
        x3d: sphereRadius * Math.sin(theta) * Math.cos(phi),
        y3d: sphereRadius * Math.sin(theta) * Math.sin(phi),
        z3d: sphereRadius * Math.cos(theta),
        x2d: 0,
        y2d: 0,
        size: 1.2 + Math.random() * 1.5,
        color: i % 2 === 0 ? '#10b981' : '#3b82f6' // Emerald or Blue
      });
    }

    const angleX = 0.006;
    const angleY = 0.006;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Speed up spin during active study states
      const speedMultiplier = isActive ? 2.8 : 1.0;
      const rotX = angleX * speedMultiplier + (mouseY * 0.00015);
      const rotY = angleY * speedMultiplier + (mouseX * 0.00015);

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Draw beautiful ambient background glowing aura
      const breathingPulse = 1.0 + Math.sin(Date.now() * 0.0025) * 0.05;
      const auraGradient = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, sphereRadius * breathingPulse * 1.3);
      auraGradient.addColorStop(0, 'rgba(16, 185, 129, 0.03)');
      auraGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = auraGradient;
      ctx.beginPath();
      ctx.arc(width/2, height/2, sphereRadius * breathingPulse * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Render connected lines (molecular node-mesh network)
      ctx.lineWidth = 0.5;

      particles.forEach((p) => {
        // Rotate Y
        let x1 = p.x3d * cosY - p.z3d * sinY;
        let z1 = p.z3d * cosY + p.x3d * sinY;

        // Rotate X
        let y2 = p.y3d * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y3d * sinX;

        p.x3d = x1;
        p.y3d = y2;
        p.z3d = z2;

        // Magnetic distortion formula
        const dist = Math.sqrt(mouseX*mouseX + mouseY*mouseY);
        let zoom = 1.0;
        if (dist < 130) {
          zoom = 1.06 - (dist / 2400);
        }

        // Perspective projection formula
        const fov = 180;
        const perspective = fov / (fov + z2);
        p.x2d = (x1 * perspective * zoom) + width / 2;
        p.y2d = (y2 * perspective * zoom) + height / 2;

        // Alpha sorting based on coordinate depth (z2)
        const opacity = Math.max(0.12, ((fov - z2) / (fov * 2)));

        ctx.fillStyle = p.color;
        ctx.shadowBlur = isActive ? 10 : 2;
        ctx.shadowColor = p.color;
        
        ctx.beginPath();
        // Dynamic breathing particle scale
        ctx.arc(p.x2d, p.y2d, p.size * perspective * (isActive ? 1.5 : 1.0), 0, Math.PI * 2);
        ctx.globalAlpha = opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        ctx.shadowBlur = 0;
      });

      // Draw glass-mesh lines between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x2d - particles[j].x2d;
          const dy = particles[i].y2d - particles[j].y2d;
          const distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < 28) {
            const opacityLine = (1 - distance/28) * 0.12 * (isActive ? 1.6 : 1.0);
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacityLine})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x2d, particles[i].y2d);
            ctx.lineTo(particles[j].x2d, particles[j].y2d);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive]);

  return (
    <div className="relative flex items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="w-[280px] h-[280px] cursor-grab active:cursor-grabbing drop-shadow-[0_0_12px_rgba(16,185,129,0.15)]"
      />
    </div>
  );
}

export default function FocusPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('Focus');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    const preset = PRESETS.find(p => p.name === mode);
    setTimeLeft((preset?.time || 25) * 60);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / ((PRESETS.find(p => p.name === mode)?.time || 25) * 60)) * 100;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto items-center">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">
          Focus Mode
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium">Deep work made simple.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 w-full">
        <Card className="flex flex-col items-center justify-center p-12 gap-8 relative overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 shadow-xl rounded-2xl">
          <div className="absolute inset-0 bg-emerald-500/5 dark:bg-emerald-500/10 pointer-events-none" />
          
          <div className="relative flex flex-col items-center gap-6 z-10 w-full">
            <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => {
                    setMode(p.name);
                    setTimeLeft(p.time * 60);
                    setIsActive(false);
                  }}
                  className={cn(
                    'px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer',
                    mode === p.name 
                      ? 'bg-white dark:bg-zinc-700 shadow-sm text-emerald-600 dark:text-emerald-400' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  )}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Interactive 3D Pomodoro Sphere Container */}
            <div className="relative flex items-center justify-center h-[280px] w-[280px]">
              <FocusSphere3D isActive={isActive} progress={progress} />
              
              <div className="absolute flex flex-col items-center pointer-events-none text-center">
                <span className="text-5xl font-black tracking-tight text-zinc-900 dark:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mt-1">
                  {mode}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="h-12 w-12 rounded-full p-0 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                onClick={resetTimer}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
              <Button 
                className="h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-emerald-500/20 p-0"
                onClick={toggleTimer}
              >
                {isActive ? <Pause className="h-8 w-8 text-white" /> : <Play className="h-8 w-8 ml-1 text-white" />}
              </Button>
              <Button 
                variant="outline" 
                className="h-12 w-12 rounded-full p-0 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="flex flex-col gap-4 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400">Ambient Soundscape</h3>
            <div className="grid grid-cols-1 gap-3">
              {SOUNDS.map((sound) => (
                <button
                  key={sound.name}
                  className="flex items-center justify-between p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/50 transition-colors">
                      <sound.icon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                    </div>
                    <span className="font-semibold text-sm text-zinc-700 dark:text-zinc-300">{sound.name}</span>
                  </div>
                  <div className="h-2 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl border border-zinc-800/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
            <h3 className="font-bold mb-2 text-sm uppercase tracking-wider text-emerald-400">Pro Tip</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              Studies show that 25 minutes of deep focus followed by a 5-minute break maximizes cognitive performance. Focus on one task at a time.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
