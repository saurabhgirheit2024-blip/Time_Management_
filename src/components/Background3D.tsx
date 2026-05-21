import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  color: {
    light: string;
    dark: string;
  };
}

export function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle3D[] = [];
    const numParticles = Math.min(100, Math.floor((width * height) / 15000)); // Adaptive count based on screen area
    const maxDistance = 120; // Maximum distance to draw connecting lines
    const fov = 400; // 3D Camera Field of View projection constant

    // Initialize 3D particles in a bounding box
    for (let i = 0; i < numParticles; i++) {
      const isEmerald = i % 2 === 0;
      particles.push({
        x: (Math.random() - 0.5) * width * 1.2,
        y: (Math.random() - 0.5) * height * 1.2,
        z: (Math.random() - 0.5) * fov * 2,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.3,
        size: 1.2 + Math.random() * 1.8,
        color: {
          light: isEmerald ? 'rgba(16, 185, 129, 0.25)' : 'rgba(59, 130, 246, 0.25)', // Emerald or Blue
          dark: isEmerald ? 'rgba(16, 185, 129, 0.4)' : 'rgba(59, 130, 246, 0.4)',
        },
      });
    }

    // Mouse interactive coordinates
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.001;
    let targetRotY = 0.001;
    let currentRotX = 0.001;
    let currentRotY = 0.001;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - width / 2;
      mouseY = e.clientY - height / 2;
      targetRotY = mouseX * 0.000004;
      targetRotX = mouseY * 0.000004;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate rotation to avoid jarring movements
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      // Base rotation + mouse rotation
      const rotX = currentRotX + 0.0005;
      const rotY = currentRotY + 0.0005;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Array to store calculated 2D coordinates and depth for connecting lines
      const projected: { x2d: number; y2d: number; depth: number; opacity: number }[] = [];

      // Update and project particles
      particles.forEach((p, idx) => {
        // Move particle in 3D
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Bounding box wraparound in 3D space
        const boxWidth = width * 0.8;
        const boxHeight = height * 0.8;
        const boxDepth = fov;

        if (p.x < -boxWidth) p.x = boxWidth;
        if (p.x > boxWidth) p.x = -boxWidth;
        if (p.y < -boxHeight) p.y = boxHeight;
        if (p.y > boxHeight) p.y = -boxHeight;
        if (p.z < -boxDepth) p.z = boxDepth;
        if (p.z > boxDepth) p.z = -boxDepth;

        // Perform 3D Rotations (Rotation Y, then Rotation X)
        // Y-Axis Rotation
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;

        // X-Axis Rotation
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.y * sinX;

        // Final rotated 3D coordinates
        const rx = x1;
        const ry = y2;
        const rz = z2;

        // Projection mapping from 3D to 2D Screen Space
        // We offset the Z depth to keep particles in front of the camera
        const zOffset = rz + fov;
        const scale = fov / Math.max(1, zOffset);
        
        const x2d = rx * scale + width / 2;
        const y2d = ry * scale + height / 2;

        // Depth-based opacity (farther particles are fainter)
        const depthOpacity = Math.max(0, 1 - zOffset / (fov * 2));
        const colorString = theme === 'dark' ? p.color.dark : p.color.light;

        // Render particle
        ctx.fillStyle = colorString;
        ctx.globalAlpha = depthOpacity;
        ctx.beginPath();
        ctx.arc(x2d, y2d, p.size * scale * 0.7, 0, Math.PI * 2);
        ctx.fill();

        // Cache coordinates for line drawing
        projected[idx] = { x2d, y2d, depth: zOffset, opacity: depthOpacity };
      });

      // Reset global alpha for line rendering
      ctx.globalAlpha = 1.0;

      // Draw faint molecular/constellation connections between nearby nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const pi = projected[i];
          const pj = projected[j];
          
          if (!pi || !pj) continue;

          // Simple distance formula in 2D space
          const dx = pi.x2d - pj.x2d;
          const dy = pi.y2d - pj.y2d;
          const dist2d = Math.sqrt(dx * dx + dy * dy);

          if (dist2d < maxDistance) {
            // Faintness determined by proximity and mutual depth visibility
            const proximityFactor = 1 - dist2d / maxDistance;
            const mutualOpacity = Math.min(pi.opacity, pj.opacity) * proximityFactor * 0.18;

            if (mutualOpacity > 0.01) {
              const strokeColor = theme === 'dark' 
                ? `rgba(110, 231, 183, ${mutualOpacity})` // Muted emerald
                : `rgba(16, 185, 129, ${mutualOpacity * 0.85})`; // Darker emerald for light theme visibility
              
              ctx.strokeStyle = strokeColor;
              ctx.lineWidth = 0.5 * (fov / Math.min(pi.depth, pj.depth)); // Finer lines for deeper connections
              ctx.beginPath();
              ctx.moveTo(pi.x2d, pi.y2d);
              ctx.lineTo(pj.x2d, pj.y2d);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none select-none transition-opacity duration-1000"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}
