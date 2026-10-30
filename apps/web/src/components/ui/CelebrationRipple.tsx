import React, { useEffect, useState } from 'react';

export interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
}

export interface CelebrationRippleProps {
  active: boolean;
  onComplete?: () => void;
  count?: number;
}

export const CelebrationRipple: React.FC<CelebrationRippleProps> = ({
  active,
  onComplete,
  count = 18,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colors = ['#10B981', '#34D399', '#FBBF24', '#F59E0B', '#065F46', '#A7F3D0'];
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
      newParticles.push({
        id: i,
        x: 0,
        y: 0,
        size: Math.random() * 6 + 4,
        color: colors[i % colors.length] || '#10B981',
        angle,
        speed: Math.random() * 40 + 35,
      });
    }

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [active, count, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    >
      {particles.map((p) => {
        const destX = Math.cos(p.angle) * p.speed;
        const destY = Math.sin(p.angle) * p.speed;

        return (
          <span
            key={p.id}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              transform: `translate(${destX}px, ${destY}px)`,
              opacity: 0,
              transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s ease-out',
              animation: 'amal-particle-float 0.85s forwards ease-out',
            }}
          />
        );
      })}
    </div>
  );
};
