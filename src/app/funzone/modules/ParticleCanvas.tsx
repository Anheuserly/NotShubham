"use client";
import React, { useRef, useEffect } from "react";

interface Particle { x: number; y: number; vx: number; vy: number; size: number; color: string; }

const colors = ["#FF3366", "#FF9933", "#33CCFF", "#00FF99", "#9966FF"];

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = 600;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 200; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Mouse attraction
        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          p.vx -= dx / 2000;
          p.vy -= dy / 2000;
        }
      });
      animationId = requestAnimationFrame(draw);
    };

    draw();

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border border-gray-300 dark:border-gray-700 rounded-lg"
    />
  );
}
