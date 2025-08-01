"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState } from "react";

type AnimatedBackgroundProps = {
  nodeDensity?: number;
  minNodes?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  mouseForce?: number;
  className?: string;
};

const AnimatedBackground = ({
  nodeDensity = 100,
  minNodes = 10,
  connectionDistance = 100,
  mouseRadius = 60,
  mouseForce = 0.5,
  className,
}: AnimatedBackgroundProps) => {
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodes = useRef<Node[]>([]);
  const mouse = useRef<{ x: number; y: number } | null>(null);
  const colorRGB = resolvedTheme === "dark" ? "255, 255, 255" : "0, 0, 0";

  class Node {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    age!: number;
    life!: number;

    constructor(width: number, height: number) {
      this.reset(width, height);
    }

    reset(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.life = Math.random() * 5 + 4;
      this.age = 0;
    }

    update(dt: number, width: number, height: number) {
      this.x += this.vx;
      this.y += this.vy;
      this.age += dt;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (this.age > this.life) {
        this.reset(width, height);
      }
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // Responsive node count based on area
    const getResponsiveNodes = () => {
      const area = width * height;
      const density = nodeDensity / (1920 * 1080);
      return Math.max(minNodes, Math.round(area * density));
    };

    let nodeCount = getResponsiveNodes();

    const resize = () => {
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
      nodeCount = getResponsiveNodes();
      nodes.current = Array.from(
        { length: nodeCount },
        () => new Node(width, height)
      );
    };
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    // Mouse event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    const handleMouseLeave = () => {
      mouse.current = null;
    };
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Init nodes
    nodes.current = Array.from(
      { length: nodeCount },
      () => new Node(width, height)
    );

    let lastTime = performance.now();

    const animate = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Disrupt nodes with mouse
      if (mouse.current) {
        nodes.current.forEach((node) => {
          const dx = node.x - mouse.current!.x;
          const dy = node.y - mouse.current!.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            // Push node away from mouse
            const pushX = (dx / dist) * mouseForce;
            const pushY = (dy / dist) * mouseForce;
            node.vx += pushX;
            node.vy += pushY;
          }
        });
      }

      // Draw connections
      for (let i = 0; i < nodes.current.length; i++) {
        for (let j = i + 1; j < nodes.current.length; j++) {
          const dx = nodes.current[i].x - nodes.current[j].x;
          const dy = nodes.current[i].y - nodes.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes.current[i].x, nodes.current[i].y);
            ctx.lineTo(nodes.current[j].x, nodes.current[j].y);
            ctx.strokeStyle = `rgba(${colorRGB}, ${
              1 - dist / connectionDistance
            })`;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.current.forEach((node) => {
        node.update(dt, width, height);
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        // Opacity: 0 at birth/death, 1 at mid-life
        const opacity = Math.min(1, Math.abs(node.life - node.age))
        ctx.fillStyle = `rgba(${colorRGB}, ${opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate(lastTime);

    return () => {
      observer.disconnect();
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [connectionDistance, mouseRadius, mouseForce, className, resolvedTheme]);

  return (
    <div ref={containerRef} className={cn("w-full h-full z-0", className)}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default AnimatedBackground;
