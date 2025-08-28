"use client";
import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SparklesProps {
  id?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleCount?: number;
  particleDensity?: number;
  className?: string;
  particleColor?: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const SparklesCore = (props: SparklesProps) => {
  const {
    background = "transparent",
    minSize = 0.4,
    maxSize = 1,
    particleCount,
    particleDensity = 100,
    className,
    particleColor = "#FFF",
  } = props;
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const _particles = [];
      const count = particleCount || particleDensity;

      for (let i = 0; i < count; i++) {
        _particles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 10,
        });
      }
      setParticles(_particles);
    };

    generateParticles();
  }, [maxSize, minSize, particleCount, particleDensity]);

  return (
    <div
      className={cn("absolute inset-0", className)}
      style={{
        background,
      }}
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          animate={{
            y: particle.y + "%",
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: particle.x + "%",
            fontSize: particle.size + "em",
            color: particleColor,
          }}
          className="inline-block"
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
};

export const Sparkles = ({
  children,
  className,
  id,
  background,
  minSize,
  maxSize,
  particleCount,
  particleDensity,
  particleColor,
}: SparklesProps & { children?: React.ReactNode }) => {
  return (
    <div className={cn("relative", className)}>
      <SparklesCore
        id={id}
        background={background}
        minSize={minSize}
        maxSize={maxSize}
        particleCount={particleCount}
        particleDensity={particleDensity}
        particleColor={particleColor}
        className="absolute inset-0 z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};